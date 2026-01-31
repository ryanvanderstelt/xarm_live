# Node.js Upgrade Guide

## Current Status
- Current Node.js version: 20.10.0
- Required version for Vite 7: 20.19+ or 22.12+

## Option 1: Direct Download (Recommended for Quick Upgrade)

1. Visit https://nodejs.org/
2. Download the **LTS version** (currently 22.x or 20.x LTS)
3. Run the installer and follow the setup wizard
4. Restart your terminal/PowerShell
5. Verify installation: `node --version`
6. Reinstall dependencies: `cd frontend && npm install`

## Option 2: Using nvm-windows (Recommended for Managing Multiple Versions)

1. Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
2. Download the `nvm-setup.exe` installer
3. Run the installer and follow the setup
4. Restart your terminal/PowerShell
5. Install Node.js 22 LTS: `nvm install 22`
6. Use it: `nvm use 22`
7. Verify: `node --version`
8. Reinstall dependencies: `cd frontend && npm install`

## After Upgrading

Once Node.js is upgraded:
1. Navigate to the frontend directory: `cd frontend`
2. Remove old node_modules: `Remove-Item -Recurse -Force node_modules, package-lock.json`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

## Verify Everything Works

- Backend should be running on: http://localhost:8000
- Frontend should be running on: http://localhost:5173
- Webcam feed should be visible at: http://localhost:5173
