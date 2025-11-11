// Leaderboard page logic
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadLeaderboard();
});

function loadLeaderboard() {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('tankio_users') || '[]');

    // Sort by score (descending)
    users.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Get top 10
    const topUsers = users.slice(0, 10);

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    if (topUsers.length === 0) {
        leaderboardList.innerHTML = '<li style="padding: 2rem; text-align: center; color: #aaa;">Chưa có người chơi nào</li>';
        return;
    }

    topUsers.forEach((user, index) => {
        const rank = index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'gold';
        else if (rank === 2) rankClass = 'silver';
        else if (rank === 3) rankClass = 'bronze';

        const item = document.createElement('li');
        item.className = 'leaderboard-item';

        item.innerHTML = `
            <div class="rank ${rankClass}">${rank}</div>
            <div class="player-data">
                <div class="name">${user.username}</div>
                <div class="level">Cấp độ: ${user.level || 1}</div>
            </div>
            <div class="score">${user.score || 0}</div>
        `;

        leaderboardList.appendChild(item);
    });
}
