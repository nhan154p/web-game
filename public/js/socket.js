// Socket.IO connection for real-time multiplayer
let socket;

function initSocket() {
    // Connect to server
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    
    // Try to connect to backend
    try {
        socket = io(window.location.origin, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            console.log('Connected to server');
            const user = StorageManager.getUser();
            socket.emit('player_join', {
                username: user.username,
                userId: user.id
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

    } catch (error) {
        console.warn('Could not connect to server:', error);
    }
}

function emitPlayerMove(x, y, angle) {
    if (socket && socket.connected) {
        socket.emit('player_move', { x, y, angle });
    }
}

function emitPlayerShoot(targetX, targetY) {
    if (socket && socket.connected) {
        socket.emit('player_shoot', { targetX, targetY });
    }
}

function emitPlayerStats(stats) {
    if (socket && socket.connected) {
        socket.emit('player_stats', stats);
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize socket when playing in online mode
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode');
    const savedMode = localStorage.getItem('game_mode');
    const mode = modeParam || savedMode || 'offline';
    if (mode === 'online') {
        initSocket();
    } else {
        console.log('Socket not initialized - playing in offline mode');
    }
});
