// Main game logic using Canvas API
let gameState = {
    canvas: null,
    ctx: null,
    player: null,
    enemies: [],
    bullets: [],
    particles: [],
    keys: {},
    mouseX: 0,
    mouseY: 0,
    running: true,
    score: 0,
    level: 1,
    hp: 100,
    maxHp: 100,
    energy: 100,
    maxEnergy: 100,
    lastShotTime: 0,
    shootCooldown: 500 // ms between shots
};

class Tank {
    constructor(x, y, username, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.username = username;
        this.isPlayer = isPlayer;
        this.radius = 25;
        this.angle = 0;
        this.speed = 3;
        this.color = isPlayer ? '#00d4ff' : '#ff006e';
        this.hp = 100;
        this.maxHp = 100;
        this.tankType = 'standard'; // standard, sniper, machine gun, destroyer
        this.level = 1;
    }

    draw(ctx) {
        // Draw tank body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw tank barrel
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 8;
        ctx.beginPath();
        const barrelLength = 35;
        ctx.moveTo(this.x, this.y);
        const endX = this.x + Math.cos(this.angle) * barrelLength;
        const endY = this.y + Math.sin(this.angle) * barrelLength;
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw HP bar
        if (!this.isPlayer) {
            const barWidth = 50;
            const barHeight = 8;
            const barX = this.x - barWidth / 2;
            const barY = this.y - this.radius - 15;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(barX, barY, barWidth, barHeight);

            ctx.fillStyle = '#00ff41';
            const hpPercent = this.hp / this.maxHp;
            ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
        }

        // Draw username
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.username, this.x, this.y + this.radius + 20);
    }

    update() {
        const keys = gameState.keys;
        
        if (keys['w'] || keys['W']) this.y -= this.speed;
        if (keys['s'] || keys['S']) this.y += this.speed;
        if (keys['a'] || keys['A']) this.x -= this.speed;
        if (keys['d'] || keys['D']) this.x += this.speed;
    // Support arrow keys as well
    if (keys['ArrowUp']) this.y -= this.speed;
    if (keys['ArrowDown']) this.y += this.speed;
    if (keys['ArrowLeft']) this.x -= this.speed;
    if (keys['ArrowRight']) this.x += this.speed;

        // Keep in bounds
        this.x = Math.max(this.radius, Math.min(gameState.canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(gameState.canvas.height - this.radius, this.y));

        // Update angle towards mouse
        if (this.isPlayer) {
            const dx = gameState.mouseX - this.x;
            const dy = gameState.mouseY - this.y;
            this.angle = Math.atan2(dy, dx);
            // If playing online, emit movement to server
            try {
                if (gameState.mode === 'online' && typeof emitPlayerMove === 'function') {
                    emitPlayerMove(this.x, this.y, this.angle);
                }
            } catch (e) {
                // ignore if socket unavailable
            }
        }
    }
}

class Bullet {
    constructor(x, y, angle, tankColor) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 6;
        this.radius = 5;
        this.color = tankColor;
        this.lifetime = 5000; // ms
        this.createdAt = Date.now();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    isAlive() {
        return Date.now() - this.createdAt < this.lifetime &&
               this.x > -50 && this.x < gameState.canvas.width + 50 &&
               this.y > -50 && this.y < gameState.canvas.height + 50;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    initGame();
});

function initGame() {
    gameState.canvas = document.getElementById('gameCanvas');
    gameState.ctx = gameState.canvas.getContext('2d');

    // Set canvas size
    gameState.canvas.width = window.innerWidth;
    gameState.canvas.height = window.innerHeight;

    const user = StorageManager.getUser();
    gameState.player = new Tank(gameState.canvas.width / 2, gameState.canvas.height / 2, user.username, true);
    gameState.score = user.score || 0;
    gameState.level = user.level || 1;

    // Determine play mode (offline/online)
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode');
    const savedMode = localStorage.getItem('game_mode');
    const mode = modeParam || savedMode || 'offline';
    gameState.mode = mode;

    // In offline mode spawn some bots; in online mode we rely on server-updated players
    if (mode === 'offline') {
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * gameState.canvas.width;
            const y = Math.random() * gameState.canvas.height;
            gameState.enemies.push(new Tank(x, y, `Bot_${i}`, false));
        }
    }

    // Event listeners
    // Make canvas focusable so it can capture keyboard input
    gameState.canvas.tabIndex = 0;
    gameState.canvas.style.outline = 'none';
    // Focus canvas so key events are delivered when game starts
    setTimeout(() => { try { gameState.canvas.focus(); } catch (e) {} }, 50);

    window.addEventListener('keydown', (e) => {
        // prevent page scrolling for movement keys
        const blockKeys = ['w','a','s','d','W','A','S','D','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '];
        if (blockKeys.includes(e.key)) e.preventDefault();
        gameState.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        gameState.keys[e.key] = false;
        if (e.key === 'Escape') goBackToMenu();
    });

    window.addEventListener('mousemove', (e) => {
        gameState.mouseX = e.clientX;
        gameState.mouseY = e.clientY;
    });

    gameState.canvas.addEventListener('click', () => {
        shootBullet();
    });

    window.addEventListener('resize', () => {
        gameState.canvas.width = window.innerWidth;
        gameState.canvas.height = window.innerHeight;
    });

    // Start game loop
    gameLoop();
}

function shootBullet() {
    const now = Date.now();
    if (now - gameState.lastShotTime < gameState.shootCooldown) return;

    gameState.lastShotTime = now;
    gameState.energy = Math.max(0, gameState.energy - 10);

    const barrelLength = 35;
    const startX = gameState.player.x + Math.cos(gameState.player.angle) * barrelLength;
    const startY = gameState.player.y + Math.sin(gameState.player.angle) * barrelLength;

    const bullet = new Bullet(startX, startY, gameState.player.angle, gameState.player.color);
    gameState.bullets.push(bullet);
}

function gameLoop() {
    const ctx = gameState.ctx;
    const canvas = gameState.canvas;

    // Clear canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw
    gameState.player.update();
    gameState.player.draw(ctx);

    // Update bullets
    gameState.bullets = gameState.bullets.filter(b => {
        b.update();
        b.draw(ctx);
        return b.isAlive();
    });

    // Update enemies
    gameState.enemies.forEach(enemy => {
        enemy.update();
        enemy.draw(ctx);

        // Check collision with player bullets
        gameState.bullets.forEach((bullet, bIndex) => {
            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < bullet.radius + enemy.radius) {
                enemy.hp -= 10;
                gameState.bullets.splice(bIndex, 1);
                gameState.score += 10;

                if (enemy.hp <= 0) {
                    gameState.score += 100;
                    gameState.enemies.splice(gameState.enemies.indexOf(enemy), 1);
                    // Spawn new enemy
                    const newEnemy = new Tank(
                        Math.random() * canvas.width,
                        Math.random() * canvas.height,
                        `Bot_${Math.random()}`,
                        false
                    );
                    gameState.enemies.push(newEnemy);
                }
            }
        });
    });

    // Regenerate energy
    gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + 0.5);

    // Update UI
    updateGameUI();

    if (gameState.running) {
        requestAnimationFrame(gameLoop);
    }
}

function updateGameUI() {
    document.getElementById('playerName').textContent = gameState.player.username;
    document.getElementById('hpValue').textContent = `${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('hpBar').style.width = `${(gameState.player.hp / gameState.player.maxHp) * 100}%`;

    document.getElementById('energyValue').textContent = `${Math.floor(gameState.energy)}/${gameState.maxEnergy}`;
    document.getElementById('energyBar').style.width = `${(gameState.energy / gameState.maxEnergy) * 100}%`;

    document.getElementById('scoreValue').textContent = gameState.score;
    document.getElementById('levelValue').textContent = gameState.level;
}

function goBackToMenu() {
    // Save player stats
    const user = StorageManager.getUser();
    user.score = gameState.score;
    StorageManager.setUser(user);

    gameState.running = false;
    window.location.href = 'menu.html';
}
