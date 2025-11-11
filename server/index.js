const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Game state
const gameState = {
    players: new Map(),
    rooms: new Map(),
    projectiles: [],
    staticItems: []
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/leaderboard', (req, res) => {
    // Return top 10 players
    res.json({
        leaderboard: Array.from(gameState.players.values())
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 10)
    });
});

// WebSocket events
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('player_join', (data) => {
        const player = {
            id: socket.id,
            username: data.username,
            userId: data.userId,
            x: Math.random() * 800,
            y: Math.random() * 600,
            angle: 0,
            hp: 100,
            maxHp: 100,
            score: 0,
            level: 1,
            tank_type: 'standard',
            color: '#00d4ff'
        };

        gameState.players.set(socket.id, player);
        socket.emit('player_joined', { player });
        socket.broadcast.emit('player_spawned', { player });

        console.log(`${data.username} joined the game`);
    });

    socket.on('player_move', (data) => {
        const player = gameState.players.get(socket.id);
        if (player) {
            player.x = data.x;
            player.y = data.y;
            player.angle = data.angle;

            socket.broadcast.emit('player_moved', {
                id: socket.id,
                x: player.x,
                y: player.y,
                angle: player.angle
            });
        }
    });

    socket.on('player_shoot', (data) => {
        const player = gameState.players.get(socket.id);
        if (player) {
            const projectile = {
                id: Math.random().toString(36),
                playerId: socket.id,
                x: data.startX || player.x,
                y: data.startY || player.y,
                angle: data.angle || player.angle,
                targetX: data.targetX,
                targetY: data.targetY,
                speed: 6,
                radius: 5,
                color: player.color,
                createdAt: Date.now()
            };

            gameState.projectiles.push(projectile);
            io.emit('projectile_fired', projectile);
        }
    });

    socket.on('player_hit', (data) => {
        const attackerPlayer = gameState.players.get(data.attackerId);
        const targetPlayer = gameState.players.get(data.targetId);

        if (attackerPlayer && targetPlayer) {
            targetPlayer.hp = Math.max(0, targetPlayer.hp - (data.damage || 10));
            
            if (targetPlayer.hp <= 0) {
                attackerPlayer.score += 100;
                attackerPlayer.level = Math.floor(attackerPlayer.score / 1000) + 1;
                targetPlayer.hp = 100;
                targetPlayer.x = Math.random() * 800;
                targetPlayer.y = Math.random() * 600;

                io.emit('player_killed', {
                    victimId: data.targetId,
                    killerId: data.attackerId,
                    victimUsername: targetPlayer.username,
                    killerUsername: attackerPlayer.username
                });
            }

            io.emit('player_damaged', {
                playerId: data.targetId,
                hp: targetPlayer.hp,
                maxHp: targetPlayer.maxHp
            });
        }
    });

    socket.on('player_stats', (data) => {
        const player = gameState.players.get(socket.id);
        if (player) {
            player.score = data.score || player.score;
            player.level = data.level || player.level;
            player.hp = data.hp || player.hp;
        }
    });

    socket.on('disconnect', () => {
        const player = gameState.players.get(socket.id);
        if (player) {
            gameState.players.delete(socket.id);
            socket.broadcast.emit('player_disconnected', { id: socket.id });
            console.log(`${player.username} disconnected`);
        }
    });
});

// Game update loop (broadcast player positions every 30ms)
setInterval(() => {
    const players = Array.from(gameState.players.values());
    io.emit('game_state', {
        players,
        projectiles: gameState.projectiles
    });

    // Clean up old projectiles
    gameState.projectiles = gameState.projectiles.filter(p => Date.now() - p.createdAt < 5000);
}, 30);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Tank.io Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
