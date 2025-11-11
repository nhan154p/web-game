#!/bin/bash

# Tank.io Online - Quick Start Script

echo "🚀 Tank.io Online - Installation & Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/tankio
JWT_SECRET=tank_io_secret_key_2025
EOF
    echo "✅ .env file created"
fi

echo ""
echo "🎮 Setup complete!"
echo ""
echo "To start the server, run:"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
