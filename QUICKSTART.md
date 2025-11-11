# 🎮 Tank.io Online - Quick Start Guide

## 📋 PROJECT OVERVIEW

**Tank.io Online** is a multiplayer browser-based tank shooter game with:
- Real-time 2D gameplay (top-down view)
- User authentication & profiles
- Shop & cosmetic system
- Leaderboard & rankings
- WebSocket multiplayer support
- Responsive design for desktop & mobile

## ⚡ QUICK START (5 Minutes)

### 1️⃣ Install & Run

#### On Windows:
```bash
cd path\to\web_game
setup.bat
npm start
```

#### On Mac/Linux:
```bash
cd path/to/web_game
chmod +x setup.sh
./setup.sh
npm start
```

### 2️⃣ Open in Browser
```
http://localhost:3000
```

### 3️⃣ Play the Game
1. **Sign Up** - Create a new account
2. **Login** - Use your credentials
3. **Play** - Click "Play Now" to start
4. **Control** - Use WASD to move, mouse to aim, click to shoot
5. **Shop** - Buy cosmetics with earned points
6. **Leaderboard** - Check top players

## 🎮 GAME CONTROLS

| Action | Control |
|--------|---------|
| Move Forward/Back/Left/Right | W/S/A/D |
| Aim Barrel | Mouse Movement |
| Fire Bullet | Left Click |
| Return to Menu | ESC |

## 📁 PROJECT STRUCTURE

```
web_game/
├── 📄 index.html              Homepage
├── 📄 auth.html               Login/Signup
├── 📄 menu.html               Main menu
├── 📄 game.html               Game canvas
├── 📄 shop.html               Shop & upgrades
├── 📄 leaderboard.html        Rankings
├── 📁 css/
│   └── style.css              All styles (900+ lines, fully responsive)
├── 📁 js/
│   ├── storage.js             LocalStorage utilities
│   ├── radar.js               Animated background
│   ├── auth.js                Auth system
│   ├── menu.js                Menu logic
│   ├── game.js                Game engine & Tank class
│   ├── shop.js                Shop system
│   ├── leaderboard.js         Leaderboard display
│   └── socket.js              WebSocket client
├── 📁 server/
│   └── index.js               Express + Socket.IO backend
├── 📄 package.json            Dependencies
├── 📄 netlify.toml            Netlify config
├── 📄 .env                    Environment variables
└── 📄 README.md               Project docs
```

## 🎯 KEY FEATURES

### Homepage
- ✅ Animated rotating radar background
- ✅ Glowing logo with neon effects
- ✅ Large login/signup buttons
- ✅ Footer with links

### Authentication
- ✅ User registration with validation
- ✅ Secure login with password checking
- ✅ Session persistence
- ✅ Logout functionality

### Game
- ✅ 2D top-down tank controls
- ✅ Real-time shooting mechanics
- ✅ Enemy AI tanks
- ✅ Collision detection
- ✅ Score & level system
- ✅ HP and energy bars
- ✅ Game HUD with controls legend

### Shop
- ✅ Tank skins (6 cosmetics)
- ✅ Permanent upgrades (4 types)
- ✅ Effects & badges (4 items)
- ✅ Point-based purchasing
- ✅ Item ownership tracking

### Social
- ✅ Player leaderboard (top 10)
- ✅ Score rankings
- ✅ Level display
- ✅ Medals for top 3 players

## 🚀 DEPLOYMENT

### Deploy to Netlify (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/tank-io.git
git push -u origin main
```

#### Step 2: Connect to Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Select your GitHub repository
4. Build command: (leave empty or use `npm run build`)
5. Publish directory: `public`
6. Deploy!

#### Step 3: Your game is live! 🎉
Visit your deployed URL (e.g., `tank-io.netlify.app`)

### Manual Netlify Deployment
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=public
```

## 📊 GAME MECHANICS

### Score System
- 10 points per bullet hit
- 100 points per enemy defeated
- Bonus points at level milestones

### Leveling
- Level = Score ÷ 1000 + 1
- Example: 2500 points = Level 3

### Tank Classes (Planned)
- **Standard** - Balanced (current)
- **Sniper** - Long range, low fire rate
- **Machine Gun** - High fire rate, short range
- **Destroyer** - Explosive rounds, slow

## 💾 DATA STORAGE

### Local Storage (Client-Side)
```javascript
// User data
localStorage.tankio_user
localStorage.tankio_token

// Players database
localStorage.tankio_users

// Owned items
localStorage.tankio_owned_[itemId]
```

### Backend (Node.js)
- Player connections
- Real-time game state
- Leaderboard (cached)
- WebSocket events

## 🔧 DEVELOPMENT

### Add New Feature

#### Add a new shop item:
1. Edit `public/js/shop.js`
2. Add to `SHOP_DATA` object
3. Save and refresh browser

#### Add a new game mechanic:
1. Edit `public/js/game.js`
2. Modify `gameLoop()` function
3. Test in browser DevTools

#### Add a new page:
1. Create `public/newpage.html`
2. Create `public/js/newpage.js`
3. Link from navigation

## 🐛 TROUBLESHOOTING

### Game won't load
```bash
# Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
# Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
```

### Socket.IO connection fails
- Backend server must be running
- Check `npm start` is active
- Look for errors in browser console
- Verify CORS is enabled

### Points not saving
- LocalStorage might be disabled
- Check browser privacy settings
- Clear browser storage and login again

### Movement is jerky
- Lower graphics quality in game settings
- Close other browser tabs
- Update your browser

## 📚 ADDITIONAL RESOURCES

- **Backend API**: See `server/README.md`
- **Full Features**: See `FEATURES.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Socket.IO Docs**: https://socket.io/docs/
- **Express Docs**: https://expressjs.com/
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

## 🎨 CUSTOMIZATION

### Change Colors
Edit `public/css/style.css` variables:
```css
:root {
    --primary-color: #00d4ff;      /* Cyan */
    --secondary-color: #ff006e;    /* Pink */
    --accent-color: #ffb400;       /* Gold */
    --success-color: #00ff41;      /* Green */
}
```

### Change Game Settings
Edit `public/js/game.js`:
```javascript
shootCooldown: 500,        // Time between shots (ms)
tankSpeed: 3,              // Tank movement speed
bulletSpeed: 6,            // Bullet travel speed
bulletLifetime: 5000       // Bullet lifetime (ms)
```

### Change Shop Items
Edit `public/js/shop.js` `SHOP_DATA` object:
```javascript
SHOP_DATA = {
    skins: [...],      // Tank cosmetics
    upgrades: [...],   // Permanent boosts
    cosmetics: [...]   // Effects & badges
}
```

## 📞 SUPPORT

For issues or questions:
1. Check browser console for errors (F12)
2. Review error messages in `.log` files
3. Check `DEPLOYMENT.md` for common issues
4. Create a GitHub issue with details

## 📄 LICENSE

ISC License - Free to use and modify

---

## 🎬 NEXT STEPS

### Immediate
1. ✅ Run locally: `npm start`
2. ✅ Test all features
3. ✅ Play a game
4. ✅ Deploy to Netlify

### Soon
- [ ] Add database (MongoDB/MySQL)
- [ ] Implement real multiplayer
- [ ] Add more tank types
- [ ] Add sound effects
- [ ] Add particle effects
- [ ] Optimize for mobile

### Future
- [ ] Create mobile app
- [ ] Add clans/teams feature
- [ ] Add seasonal events
- [ ] Add battle pass system
- [ ] Add AI boss battles
- [ ] Cross-platform sync

---

**Happy Gaming! 🎮**

Questions? Check the docs or modify the code and experiment! 🚀
