/* eslint-disable no-console */
/* eslint-disable max-len */

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const zmq = require('zmq');
const personMessages = require('./messages/person_pb.js');
const actionMessages = require('./messages/action_pb.js');

const person = new personMessages.Person({
  name: '/Users/dxr224/Dropbox/closures{} - To Reach with Little Arms (DEMO)/03 - In Breaking Through.mp3',
  id: 1,
  email: 'ramirezd42@gmail.com',
  phone: [{
    number: '215-641-0197',
    type: 1
  }]
});

const action = new actionMessages.Action();
action.setType('person');
// action.setPayload(person);

// socket to talk to server
console.log('Connecting to hello world server…');
const requester = zmq.socket('req');

let x = 0;
requester.on('message', reply => {
  console.log('Received reply', x, ': [', reply.toString(), ']');
  x += 1;
  if (x === 10) {
    requester.close();
    process.exit(0);
  }
});

requester.connect('tcp://localhost:5555');

for (let i = 0; i < 10; i++) {
  console.log('Sending request', i, '…');
  requester.send(new Buffer(action.serializeBinary()));
}

process.on('SIGINT', () =>
  requester.close()
);
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
