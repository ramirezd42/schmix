const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const zmq = require('zmq');
const fs = require('fs');

const sync = zmq.socket('pull');
sync.bind('tcp://127.0.0.1:5564');

const protobuf = require('protocol-buffers');
const messageFormats = protobuf(fs.readFileSync('test.proto'));

const buf = messageFormats.Person.encode({
  name: 'Dave Ramirez',
  id: 1,
  email: 'ramirezd42@gmail.com',
  phone: [{
    number: '215-641-0197',
    type: 1
  }]
});

const pub = zmq.socket('pub');
pub.bind('tcp://127.0.0.1:5565');

// Subscriber notifies when ready to receive messages
sync.on('message', data => {
  console.log('data:');
  console.log(data);
  sync.close(); // close sync after connection established to avoid resending sent data

  let updates = 0;
  const interval = setInterval(() => {
    pub.send(buf);
    if (updates >= 10) {
      pub.send('END');
      clearInterval(interval);
    }
  }, 1000);
});
// Create application containers for React app and CSS

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL('http://localhost:8080');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () =>
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
