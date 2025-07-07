// client/electron/electron.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    win.webContents.openDevTools(); // Optional: useful for debugging
  } else {
    // ✅ PRODUCTION: load Vite build inside client/dist
    const indexPath = path.join(__dirname, '../dist/index.html');
    win.loadFile(indexPath).catch(err => {
      console.error('❌ Failed to load index.html:', err);
    });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
