# Tank.io Online

A multiplayer tank shooter game built with HTML5 Canvas, Node.js, and WebSocket.

## Features

- 🎮 Real-time multiplayer gameplay
- 🚀 Multiple tank classes (Sniper, Machine Gun, Destroyer)
- 💰 Shop system with cosmetics
- 🏆 Leaderboard and rankings
- ⚙️ Tank upgrade system
- 🔐 User authentication

## Tech Stack

- **Frontend**: HTML5 Canvas, JavaScript (Phaser.js for game engine)
- **Backend**: Node.js, Express.js
- **Real-time**: Socket.IO (WebSocket)
- **Deployment**: Netlify

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

The game will be available at `http://localhost:3000`

## Project Structure

```
tank-io-online/
├── public/              # Static frontend files
│   ├── index.html      # Homepage
│   ├── auth.html       # Login/Signup
│   ├── menu.html       # Main menu
│   ├── game.html       # Game canvas
│   ├── css/            # Stylesheets
│   ├── js/             # Frontend scripts
│   └── assets/         # Images, sounds
├── server/             # Backend files
│   ├── index.js        # Main server
│   ├── gameState.js    # Game logic
│   └── handlers/       # WebSocket handlers
├── netlify/            # Netlify configuration
└── package.json        # Dependencies
```

## Deployment

This project is configured to run on Netlify. Deploy using:

```bash
netlify deploy
```

## License

ISC
