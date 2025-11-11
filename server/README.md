# Tank.io Backend Configuration

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/tankio
JWT_SECRET=your_jwt_secret_key_here
```

## Server Structure

- `server/index.js` - Main server file with Express and Socket.IO
- `server/gameState.js` - Game state management
- `server/handlers/` - WebSocket event handlers

## Running the Server

```bash
npm install
npm start
```

The server will listen on `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/leaderboard` - Get top 10 players
- `POST /api/auth/login` - User login (coming soon)
- `POST /api/auth/signup` - User registration (coming soon)

## WebSocket Events

### Client → Server

- `player_join` - Join game
- `player_move` - Update player position
- `player_shoot` - Fire a bullet
- `player_hit` - Report collision
- `player_stats` - Update player stats

### Server → Client

- `player_joined` - Confirm join
- `player_spawned` - New player joined
- `player_moved` - Player movement update
- `projectile_fired` - Bullet fired
- `player_damaged` - Player took damage
- `player_killed` - Player eliminated
- `player_disconnected` - Player left
- `game_state` - Full game state broadcast

