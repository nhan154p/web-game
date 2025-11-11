// Authentication logic
document.addEventListener('DOMContentLoaded', () => {
    initAuthPage();
});

function initAuthPage() {
    // Get URL params to determine if login or signup
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || 'login';

    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const authLink = document.getElementById('authLink');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');

    if (mode === 'signup') {
        authTitle.textContent = 'Đăng Ký Tài Khoản';
        authSubtitle.textContent = 'Tham gia trận chiến ngay hôm nay!';
        submitBtn.textContent = 'Đăng Ký';
        confirmPasswordGroup.style.display = 'block';
        authLink.innerHTML = '<p>Đã có tài khoản? <a href="auth.html?mode=login">Đăng nhập tại đây</a></p>';
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Clear messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // Validation
    if (!username || username.length < 3) {
        showError('Tên người dùng phải có ít nhất 3 ký tự', errorMessage);
        return;
    }

    if (!password || password.length < 6) {
        showError('Mật khẩu phải có ít nhất 6 ký tự', errorMessage);
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || 'login';

    if (mode === 'signup') {
        if (password !== confirmPassword) {
            showError('Mật khẩu không khớp', errorMessage);
            return;
        }
        handleSignup(username, password, errorMessage, successMessage);
    } else {
        handleLogin(username, password, errorMessage, successMessage);
    }
}

function handleLogin(username, password, errorMessage, successMessage) {
    // Simulate login - in real app, this would call backend API
    const users = JSON.parse(localStorage.getItem('tankio_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showError('Tên người dùng hoặc mật khẩu không đúng', errorMessage);
        return;
    }

    // Simulate token generation
    const token = 'token_' + Math.random().toString(36).substr(2, 9);

    StorageManager.setUser({
        id: user.id,
        username: user.username,
        score: user.score || 0,
        level: user.level || 1,
        avatar: user.avatar || '🚀'
    });
    StorageManager.setToken(token);

    showSuccess('Đăng nhập thành công! Chuyển hướng...', successMessage);

    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1500);
}

function initializeSampleUsers() {
    const existingUsers = localStorage.getItem('tankio_users');
    if (!existingUsers) {
        // Initialize with sample users for testing
        const sampleUsers = [
            { id: 1, username: 'demo', password: 'demo123', score: 5000, level: 6, avatar: '🚀', createdAt: new Date().toISOString() },
            { id: 2, username: 'player', password: 'player123', score: 2500, level: 3, avatar: '🎮', createdAt: new Date().toISOString() }
        ];
        localStorage.setItem('tankio_users', JSON.stringify(sampleUsers));
        console.log('✅ Đã khởi tạo tài khoản mẫu:', sampleUsers.map(u => u.username));
    }
}

// Khởi tạo dữ liệu mẫu khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleUsers();
});

function handleSignup(username, password, errorMessage, successMessage) {
    const users = JSON.parse(localStorage.getItem('tankio_users') || '[]');

    // Check if user already exists
    if (users.some(u => u.username === username)) {
        showError('Tên người dùng đã tồn tại', errorMessage);
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        username: username,
        password: password,
        score: 0,
        level: 1,
        avatar: '🚀',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('tankio_users', JSON.stringify(users));

    showSuccess('Đăng ký thành công! Vui lòng đăng nhập.', successMessage);

    setTimeout(() => {
        window.location.href = 'auth.html?mode=login';
    }, 2000);
}

function showError(message, element) {
    element.textContent = message;
    element.style.display = 'block';
}

function showSuccess(message, element) {
    element.textContent = message;
    element.style.display = 'block';
}
