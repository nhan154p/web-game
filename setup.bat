@echo off
REM Tank.io Online - Quick Start Script for Windows

echo.
echo 🚀 Tank.io Online - Installation ^& Setup
echo ========================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Create .env if it doesn't exist
if not exist .env (
    echo.
    echo 📝 Creating .env file...
    (
        echo PORT=3000
        echo NODE_ENV=development
        echo DATABASE_URL=mongodb://localhost:27017/tankio
        echo JWT_SECRET=tank_io_secret_key_2025
    ) > .env
    echo ✅ .env file created
)

echo.
echo 🎮 Setup complete!
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
