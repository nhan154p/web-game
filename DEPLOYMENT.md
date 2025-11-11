# Tank.io Online - Deployment Guide

## Local Development

### Prerequisites

- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The server will run on `http://localhost:3000`

### Project Structure

```
tank-io-online/
├── public/              # Frontend static files
│   ├── index.html       # Homepage
│   ├── auth.html        # Login/Signup
│   ├── menu.html        # Main menu
│   ├── game.html        # Game canvas
│   ├── shop.html        # Shop & upgrades
│   ├── leaderboard.html # Rankings
│   ├── css/
│   │   └── style.css    # All styles
│   ├── js/
│   │   ├── storage.js   # LocalStorage utilities
│   │   ├── radar.js     # Animated radar background
│   │   ├── auth.js      # Authentication logic
│   │   ├── menu.js      # Menu page logic
│   │   ├── game.js      # Game engine & Tank class
│   │   ├── shop.js      # Shop logic
│   │   ├── leaderboard.js # Leaderboard
│   │   └── socket.js    # WebSocket client
│   └── assets/          # Images, sounds (to be added)
├── server/
│   ├── index.js         # Express + Socket.IO server
│   └── README.md        # Backend documentation
├── netlify/             # Netlify configuration
├── .env                 # Environment variables
├── package.json         # Dependencies
├── netlify.toml         # Netlify build config
└── README.md            # Project documentation
```

## Deployment to Netlify

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build` (or skip if not needed)
4. Set publish directory: `public`

### Option 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=public
```

### Environment Variables on Netlify

In Netlify Dashboard:
1. Go to Site Settings → Build & Deploy → Environment
2. Add variables:
   - `PORT=8888`
   - `NODE_ENV=production`

## Game Features Implemented

### ✅ Completed Features

- 🏠 Homepage with animated radar background
- 🔐 Authentication system (Login/Signup)
- 📊 Main menu with player stats
- 🎮 Basic game canvas (2D top-down)
- 🚀 Tank movement (WASD keys)
- 🔫 Shooting mechanics (mouse click)
- 💥 Collision detection for bullets
- 👾 AI bot enemies
- 📈 Score and level system
- 🛍️ Shop with cosmetics
- 🏆 Leaderboard
- ⚙️ Upgrade system
- 📡 WebSocket connection (Socket.IO ready)
- 💾 LocalStorage for player data

### 🚀 Planned Features

- 🗄️ MongoDB database integration
- 🔗 Real multiplayer synchronization
- 🎨 More tank types (Sniper, Machine Gun, Destroyer)
- 🎯 Better collision detection
- 🌐 Multiple map environments
- 🛡️ Different game modes (1v1, Team Battle, etc.)
- 🤖 Improved AI pathfinding
- 🎵 Sound effects and music
- 📱 Mobile responsive improvements

## Troubleshooting

### Port already in use
```bash
# Change port in .env
PORT=3001 npm start
```

### Socket.IO connection fails
- Make sure server is running
- Check browser console for errors
- Ensure CORS is properly configured

### Page shows blank
- Check browser console for JavaScript errors
- Clear browser cache
- Check that all JS files are being loaded

## Performance Tips

1. **For production**: Minify CSS and JavaScript
2. **Add caching**: Static assets should cache for long periods
3. **Optimize assets**: Use compressed images and sprites
4. **Database**: Consider caching leaderboard data

## Support & Contributing

For issues or suggestions, create an issue in the project repository.

## License

ISC
