import {BrowserWindow} from 'electron';

export class Main {
  public static mainWindow: Electron.BrowserWindow;
  public static application: Electron.App;
  public static BrowserWindow;
  public static serialPort;


  public static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }


  public static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    Main.mainWindow = null;
  }


  public static onReady() {
    // this is a dependency we will have to live with
    // because we can't create BrowserWindow until
    // onReady fires.
    Main.mainWindow = new Main.BrowserWindow({
      height: 600,
      width: 800,
    });
    Main.mainWindow.loadURL('file://' + __dirname + '/../dist/index.html');
    Main.mainWindow.on('closed', Main.onClose);
  }


  public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}
