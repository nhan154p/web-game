// Shop page logic
const SHOP_DATA = {
    skins: [
        { id: 'skin_red', name: 'Máy Bay Chiến Đấu', emoji: '🔴', price: 500, desc: 'Xe tăng màu đỏ' },
        { id: 'skin_blue', name: 'Biển Xanh', emoji: '🔵', price: 500, desc: 'Xe tăng màu xanh' },
        { id: 'skin_yellow', name: 'Ánh Nắng', emoji: '🟡', price: 500, desc: 'Xe tăng màu vàng' },
        { id: 'skin_green', name: 'Rừng Xanh', emoji: '🟢', price: 500, desc: 'Xe tăng màu xanh lá' },
        { id: 'skin_purple', name: 'Bí Ẩn', emoji: '🟣', price: 800, desc: 'Xe tăng màu tím' },
        { id: 'skin_gold', name: 'Vàng Oanh Thoại', emoji: '⭐', price: 1000, desc: 'Xe tăng vàng kim' },
    ],
    upgrades: [
        { id: 'dmg_upgrade', name: 'Tăng Sát Thương +25%', emoji: '💥', price: 300, desc: 'Nâng cấp vĩnh viễn' },
        { id: 'armor_upgrade', name: 'Tăng Giáp +20%', emoji: '🛡️', price: 300, desc: 'Nâng cấp vĩnh viễn' },
        { id: 'speed_upgrade', name: 'Tăng Tốc Độ +15%', emoji: '⚡', price: 250, desc: 'Nâng cấp vĩnh viễn' },
        { id: 'firerate_upgrade', name: 'Tăng Tốc Bắn +30%', emoji: '🔄', price: 350, desc: 'Nâng cấp vĩnh viễn' },
    ],
    cosmetics: [
        { id: 'effect_rainbow', name: 'Đạn Cầu Vồng', emoji: '🌈', price: 200, desc: 'Hiệu ứng đạn' },
        { id: 'effect_fire', name: 'Đạn Lửa', emoji: '🔥', price: 200, desc: 'Hiệu ứng đạn' },
        { id: 'badge_elite', name: 'Huy Hiệu Thượng Tướng', emoji: '👑', price: 150, desc: 'Biểu tượng riêng' },
        { id: 'badge_legend', name: 'Huy Hiệu Huyền Thoại', emoji: '🌟', price: 300, desc: 'Biểu tượng riêng' },
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadShopData();
});

function loadShopData() {
    const user = StorageManager.getUser();
    document.getElementById('playerPoints').textContent = user.score || 0;

    // Load skins
    const skinsGrid = document.getElementById('skinsGrid');
    SHOP_DATA.skins.forEach(skin => {
        skinsGrid.appendChild(createShopItem(skin, user.score || 0));
    });

    // Load upgrades
    const upgradesGrid = document.getElementById('upgradesGrid');
    SHOP_DATA.upgrades.forEach(upgrade => {
        upgradesGrid.appendChild(createShopItem(upgrade, user.score || 0));
    });

    // Load cosmetics
    const cosmeticsGrid = document.getElementById('cosmeticsGrid');
    SHOP_DATA.cosmetics.forEach(cosmetic => {
        cosmeticsGrid.appendChild(createShopItem(cosmetic, user.score || 0));
    });
}

function createShopItem(item, playerScore) {
    const div = document.createElement('div');
    div.className = 'shop-item';

    const canBuy = playerScore >= item.price;
    const bought = localStorage.getItem(`tankio_owned_${item.id}`) === 'true';

    let buttonHTML;
    if (bought) {
        buttonHTML = '<button class="btn-buy" disabled>✓ Đã Sở Hữu</button>';
    } else if (canBuy) {
        buttonHTML = `<button class="btn-buy" onclick="buyItem('${item.id}', ${item.price})">Mua - ${item.price} 💰</button>`;
    } else {
        buttonHTML = `<button class="btn-buy" disabled>Mua - ${item.price} 💰</button>`;
    }

    div.innerHTML = `
        <div class="item-icon">${item.emoji}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.price} 💰</div>
        <div class="item-desc">${item.desc}</div>
        ${buttonHTML}
    `;

    return div;
}

function buyItem(itemId, price) {
    const user = StorageManager.getUser();

    if (user.score < price) {
        alert('Bạn không đủ điểm!');
        return;
    }

    // Deduct score
    user.score -= price;
    StorageManager.setUser(user);

    // Mark as owned
    localStorage.setItem(`tankio_owned_${itemId}`, 'true');

    // Reload shop
    location.reload();
}
