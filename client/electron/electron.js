// client/electron/electron.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Detect development mode
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
        },
    });

    if (isDev) {
        // DEVELOPMENT: load Vite dev server
        win.loadURL('http://localhost:5173');
    } else {
        // PRODUCTION: load compiled Vite files
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

// Create window when app is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Re-create window on macOS when dock icon is clicked and no other windows are open
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});