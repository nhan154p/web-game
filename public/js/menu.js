// Menu page logic
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadPlayerData();
    setupModeButtons();
});

function loadPlayerData() {
    const user = StorageManager.getUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('playerName').textContent = user.username;
    document.getElementById('playerAvatar').textContent = user.avatar || '🚀';
    document.getElementById('playerScore').textContent = user.score || 0;
    document.getElementById('playerLevel').textContent = user.level || 1;
}

function startGame() {
    // read selected mode from storage (default offline)
    const mode = localStorage.getItem('game_mode') || 'offline';
    window.location.href = `game.html?mode=${mode}`;
}

function setupModeButtons() {
    const offlineBtn = document.getElementById('mode-offline');
    const onlineBtn = document.getElementById('mode-online');
    // initialize from storage
    const saved = localStorage.getItem('game_mode') || 'offline';
    if (saved === 'online') {
        onlineBtn.classList.add('active');
        offlineBtn.classList.remove('active');
    } else {
        offlineBtn.classList.add('active');
        onlineBtn.classList.remove('active');
    }

    offlineBtn.addEventListener('click', () => {
        localStorage.setItem('game_mode', 'offline');
        offlineBtn.classList.add('active');
        onlineBtn.classList.remove('active');
    });

    onlineBtn.addEventListener('click', () => {
        localStorage.setItem('game_mode', 'online');
        onlineBtn.classList.add('active');
        offlineBtn.classList.remove('active');
    });
}

function goToShop() {
    window.location.href = 'shop.html';
}

function goToLeaderboard() {
    window.location.href = 'leaderboard.html';
}

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        StorageManager.clearAuth();
        window.location.href = 'index.html';
    }
}
