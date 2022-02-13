const {app, BrowserWindow, screen, ipcMain, shell, Notification} = require("electron");
const Store = require('electron-store');
const path = require('path');
const store = new Store();
const { autoUpdater } =require("electron-updater");
app.setAppUserModelId('倒计时');





var mainWindow = null;
var settings = null;
var updateWin = null;
var tools = null;
var weather = null;
var browser = null;
var imagedown = null;
var audioPlayer = null;
var t60s = null;







app.on('ready',()=>{
    var size = screen.getPrimaryDisplay().workAreaSize;
    var width = parseInt(size.width * 0.3);
    var height = parseInt(size.width * 0.3*0.8);
    mainWindow = new BrowserWindow({
      frame:false,
      width: width,
      height: height,
      right: true,
      x:size.width-width-10,
      y:10,
      fullscreenable: false,
      resizable: false,
      transparent: true,
      hasShadow: false,
      focusable: true,
      nodeIntegration: true,
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          
          enableRemoteModule: true
      }
    })
    mainWindow.loadFile('./src/index.html');
    mainWindow.setSkipTaskbar(true);
    // mainWindow.setMenu(null);
    // mainWindow.webContents.openDevTools({mode:'undocked'});
    mainWindow.on('closed',()=>{
        mainWindow = null;
        settings = null;
        app.quit();
    })
    //updateHandle();
})
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (win === null) {
      createWindow();
    }
  });

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    
  })
}


ipcMain.on('window-close', function() {
  app.quit();
})
ipcMain.on('mainReload',function(){
  mainWindow.webContents.reload()
})
















ipcMain.on('notification',(event,data)=>{
  if(Notification.isSupported()){
    var notification = new Notification({
      title: data.title,
      subtitle: data.subtitle,
      body: data.msg,
      silent: data.silent,
      icon: data.icon,
      timeoutType: 'default'
    })
    notification.show();
    notification.on('click',function(){
      eval(data.click);
    })
  }
})
















function creatSettings(){
  if(settings==null||!settings){
    settings = new BrowserWindow({
      width: 300,
      height: 500,
      frame: false,
      fullscreen: true,
      resizable: false,
      transparent: true,
      hasShadow: false,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    settings.loadFile('./src/settings.html');
    // mainWindow.setMenu(null);
    settings.on('closed',()=>{
      settings = null;
    })
  }
  // settings.webContents.openDevTools({mode:'right'});
}
ipcMain.on('settings',()=>{
  creatSettings();
})
ipcMain.on('settings-close', function() {
  settings.close();
})
ipcMain.on('setReload',function(){
  settings.webContents.reload()
})












function creatUpadteWin() {
  if(updateWin==null||!updateWin){
    updateWin = new BrowserWindow({
      width: 600,
      height: 300,
      frame: false,
      resizable: false,
      transparent: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    updateWin.loadFile('./src/update.html');
    // mainWindow.setMenu(null);
    updateWin.on('closed',()=>{
      updateWin = null;
    })
  }else{
    updateWin.focus();
  }
  // updateWin.webContents.openDevTools({mode:'right'});
}
ipcMain.on('updateWin',()=>{
  creatUpadteWin();
})
ipcMain.on('updateWin-close', function() {
  updateWin.close();
})
ipcMain.on('updateReload',function(){
  updateWin.webContents.reload();
})
ipcMain.on('updateWin-min',function(){
  updateWin.minimize();
})










ipcMain.on('enableAutoStart',function(){
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: false
  })
})
ipcMain.on('disableAutoStart',function(){
  app.setLoginItemSettings({
    openAtLogin: false
  })
})


















function creatTools() {
  if(tools==null||!tools){
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = parseInt(size.width * 0.6);
    var height = parseInt(size.width * 0.6*0.6);
    tools = new BrowserWindow({
      width: width,
      height: height,
      minimizable: true,
      maximizable: true,
      minWidth: 600,
      minHeight: 400,
      frame: false,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    tools.loadFile('./src/tools.html');
    // tools.setMenu(null);
    tools.on('closed',()=>{
      tools = null;
    })
  }else{
    tools.focus();
  }
  // tools.webContents.openDevTools({mode:'right'});
}
ipcMain.on('openTools',function(){
  creatTools();
})
ipcMain.on('tools-close', function() {
  tools.close();
})
ipcMain.on('toolsReload',function(){
  tools.webContents.reload();
})
ipcMain.on('tools-min',function(){
  tools.minimize();
})
ipcMain.on('tools-max',function(){
  if(tools.isMaximized()){
    tools.unmaximize();
  }else{
    tools.maximize();
  }
})























function creatWeather() {
  if(weather==null||!weather){
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = parseInt(size.width * 0.35);
    var height = parseInt(size.width * 0.35*1.2);
    weather = new BrowserWindow({
      width: width,
      height: height,
      minimizable: true,
      maximizable: true,
      minWidth: 400,
      minHeight: 600,
      frame: false,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webviewTag: true //开启webview标签渲染
      }
    })
    
    weather.loadFile('./src/weather.html');
    // weather.setMenu(null);
    weather.on('closed',()=>{
      weather = null;
    })
    
  }else{
    weather.focus();
  }
  
  // weather.webContents.openDevTools({mode:'undocked'});
}
ipcMain.on('weather',function(){
  creatWeather();
})
ipcMain.on('weather-close', function() {
  weather.close();
})
ipcMain.on('weatherReload',function(){
  weather.webContents.reload();
})
ipcMain.on('weather-min',function(){
  weather.minimize();
})
ipcMain.on('weather-max',function(){
  if(weather.isMaximized()){
    weather.unmaximize();
  }else{
    weather.maximize();
  }
})























function browserUrl(url) {
  if(browser==null||!browser){
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = parseInt(size.width * 0.75);
    var height = parseInt(size.width * 0.75*0.6);
    browser = new BrowserWindow({
      width: width,
      height: height,
      minimizable: true,
      maximizable: true,
      minWidth: 500,
      minHeight: 600,
      frame: false,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webviewTag: true //开启webview标签渲染
      }
    })
    browser.loadFile("./src/browser.html");
    setTimeout(() => {
      browser.webContents.send('openUrl', url);
    }, 1000);
    browser.on('closed',()=>{
      browser = null;
    })
  }else{
    browser.webContents.send('openUrl', url);
    browser.focus();
  }
  // browser.webContents.openDevTools({mode:'undocked'});
}

ipcMain.on('browserUrl',function(event,arg){
  browserUrl(arg)
})
ipcMain.on('browser-close', function() {
  browser.close();
})
ipcMain.on('browserReload',function(){
  browser.webContents.reload();
})
ipcMain.on('browser-min',function(){
  browser.minimize();
})
ipcMain.on('browser-max',function(){
  if(browser.isMaximized()){
    browser.unmaximize();
  }else{
    browser.maximize();
  }
})

app.on("web-contents-created", (event, contents) => {
  if (contents.getType() === "webview") {
    contents.on("new-window", (event,url) => {
      event.preventDefault();
      browserUrl(url);
    });
  }
})

















function creatImageDown() {
  if(imagedown==null||!imagedown){
    var size = screen.getPrimaryDisplay().workAreaSize;
    var width = parseInt(size.width * 0.7);
    var height = parseInt(size.width * 0.7*0.7);
    imagedown = new BrowserWindow({
      width: width,
      height: height,
      minWidth: 500,
      minHeight: 600,
      minimizable: true,
      maximizable: false,
      frame: false,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    imagedown.loadFile("./src/imagedown.html");
    // imagedown.webContents.openDevTools({mode:'undocked'});
  }else{
    imagedown.focus();
  }
  imagedown.on('closed',()=>{
    imagedown = null;
  })
}
ipcMain.on('imagedown',function(){
  creatImageDown();
})

ipcMain.on('imagedown-close', function() {
  imagedown.close();
})
ipcMain.on('imagedownReload',function(){
  imagedown.webContents.reload();
})
ipcMain.on('imagedown-min',function(){
  imagedown.minimize();
})
ipcMain.on('imagedown-max',function(){
  if(imagedown.isMaximized()){
    imagedown.unmaximize();
  }else{
    imagedown.maximize();
  }
})





















function creatAudioPlayer() {
  if(audioPlayer==null||!audioPlayer){
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = parseInt(size.width * 0.3);
    var height = parseInt(size.width * 0.3*0.2);
    audioPlayer = new BrowserWindow({
      width: width,
      height: height,
      minimizable: false,
      maximizable: false,
      right: true,
      minWidth: 300,
      minHeight: 90,
      x:screen.getPrimaryDisplay().workAreaSize.width-width-10,
      y:screen.getPrimaryDisplay().workAreaSize.height-height-screen.getPrimaryDisplay().workAreaSize.height/10,
      frame: false,
      resizable: false,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    audioPlayer.loadFile("./src/audio.html");
    // audioPlayer.webContents.openDevTools({mode:'undocked'});
  }else{
    audioPlayer.focus();
  }
  audioPlayer.on('closed',()=>{
    audioPlayer = null;
  })
}
ipcMain.on('audioPlayer',function(){
  creatAudioPlayer();
})

ipcMain.on('audioPlayer-close', function() {
  audioPlayer.close();
})
ipcMain.on('audioPlayerReload',function(){
  audioPlayer.webContents.reload();
})
ipcMain.on('audioPlayer-min',function(){
  audioPlayer.minimize();
})
ipcMain.on('audioPlayer-max',function(){
  if(audioPlayer.isMaximized()){
    audioPlayer.unmaximize();
  }else{
    audioPlayer.maximize();
  }
})
















function creat60s() {
  if(t60s==null||!t60s){
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = parseInt(size.width * 0.35);
    var height = parseInt(size.width * 0.35*1.2);
    t60s = new BrowserWindow({
      width: width,
      height: height,
      minimizable: true,
      maximizable: false,
      minWidth: 400,
      minHeight: 600,
      frame: false,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
    })
    
    t60s.loadFile('./src/60s.html');
    t60s.on('closed',()=>{
      t60s = null;
    })
    
  }else{
    t60s.focus();
  }
  
  // t60s.webContents.openDevTools({mode:'undocked'});
}
ipcMain.on('60s',function(){
  creat60s();
})
ipcMain.on('60s-close', function() {
  t60s.close();
})
ipcMain.on('60sReload',function(){
  t60s.webContents.reload();
})
ipcMain.on('60s-min',function(){
  t60s.minimize();
})


















function Message(window, type, data) {
  var senddata = {
      state: type,
      msg: data || ''
  }
  window.webContents.send('UpdateMsg', senddata);
  
}
 const uploadUrl = `http://countdown.tempest.blue/release`; // 更新包位置
 autoUpdater.autoDownload = false;
    autoUpdater.setFeedURL(uploadUrl)
    // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
        if (err.message.includes('sha512 checksum mismatch')) {
          if(updateWin){
            Message(updateWin, -1, 'sha512校验失败');
          }
        }else{
          if(updateWin){
            Message(updateWin, -1, '更新失败');
          }
        }
    })
    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event, arg) => {
        if(updateWin){
          Message(updateWin, 0);
        }
    })
    // 发现可更新数据时
    autoUpdater.on('update-available', (event, arg) => {

        if(updateWin){
          Message(updateWin, 1, event.version);
        }
        if(settings){
          Message(settings, 1);
        }
        if(tools){
          Message(tools, 1);
        }
        if(!settings&&!updateWin&&!tools){
          Message(mainWindow, 1);
        }
    })
    // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
        if(updateWin){
          Message(updateWin, 2);
        }
    })
    // 下载监听
    autoUpdater.on('download-progress', (progressObj) => {
        if(updateWin){
          Message(updateWin, 3, progressObj);
        }
    })
    // 下载完成
    autoUpdater.on('update-downloaded', () => {
        if(updateWin){
          Message(updateWin, 4);
        }
    })
    // 执行更新检查
    ipcMain.on('check-update', () => {
        autoUpdater.checkForUpdates().catch(err => {
            if(updateWin){
              Message(updateWin, -1, "检查更新失败");
            }
            
        })
    })
    // 退出并安装
    ipcMain.on('confirm-update', () => {
        autoUpdater.quitAndInstall();
    })

    // 手动下载更新文件
    ipcMain.on('confirm-downloadUpdate', () => {
        autoUpdater.downloadUpdate();
    })










