const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Crea la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // --- CAMBIO CLAVE AQUÍ ---
  // Ahora cargará la página de login al iniciar.
  mainWindow.loadFile('login.html');

  // Opcional: Abre las herramientas de desarrollo (para depurar).
  // mainWindow.webContents.openDevTools();
}

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté listo para crear ventanas de navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es presionado y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Salir cuando todas las ventanas estén cerradas, excepto en macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
