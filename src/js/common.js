
let {clipboard,ipcRenderer,shell} = require('electron');
let Store = require("electron-store");
let store = new Store();
let path = require("path");
let http = require("http");
let https = require("https");
let request = require('request');
let fs = require('fs');
let cmd= require('node-cmd');
var package = require("../package.json");
const cp = require('child_process');
const exec = require('child_process').exec;
const { execFile } = require('child_process');

let appVersion = package.version;
$(function(){
    $("body").css({ "transform": "scale(1)" });
})

function playClickMusic(src){
    var audioEle = $('<audio src="'+src+'" style="display:none">');
    $("body").append(audioEle);
    audioEle[0].play();
    setTimeout(() => {
        audioEle.remove();
    }, 3000);
}

function closeWin(page){
    playClickMusic("./audio/close.mp3");
    setTimeout(() => {
        $("body").css({ "transform": "scale(0.8)" });
        $("body").fadeTo(50, 0.01, function() {
            $("body").slideUp(50, function() {
                ipcRenderer.send(page);
            });
        });
    }, 300);   
}


function sendNotification(data){
    ipcRenderer.send('notification',data);
}


$(".tab .item").click(function(){
    playClickMusic("./audio/click_xx.mp3");
    if(!$(this).is(".active")){
        setTimeout(() => {
            playClickMusic("./audio/click_xx_tuo.mp3");
        }, 250);
    }   
})
$(".select .show").click(function(){
    var e=e||window.event;
    e.stopPropagation();
    $(this).next().slideToggle(300);
})
$(document).click(function(){
    $(".select .selection").slideUp(300);
})
$(".ysbtns button").click(function(){
    if(!$(this).hasClass("closeBtn")){
        playClickMusic("./audio/open.mp3");
    }
})
$(".appbar .item").click(function(){
    playClickMusic("./audio/click_xx.mp3");
})
$(".list .item").click(function(){
    playClickMusic("./audio/confirm.mp3");
})
$(".btns .item").click(function(){
    playClickMusic("./audio/confirm.mp3");
})
$(".gotolist .sitem").click(function(){
    playClickMusic("./audio/click_xx.mp3");
})
$(".tools .item").click(function(){
    playClickMusic("./audio/confirm.mp3");
})
function url(url){
    shell.openExternal(url);
}
function browserUrl(url){
    ipcRenderer.send("browserUrl",url);
}
function changeWallpaper(addr){
    if(addr&&addr!=null){
        // var command = 'reg add "hkcu\\control panel\\desktop" /v wallpaper /d "'+addr+'" /f';
        // cmd.run(command);
        // cmd.run('RunDll32.exe USER32.DLL,UpdatePerUserSystemParameters');
        // for(i=0;i<50;i++){
        //     setTimeout(() => {
        //         cmd.run('RunDll32.exe USER32.DLL,UpdatePerUserSystemParameters');
        //     }, i*200);
        // }
        // tip("设置壁纸，如果失败多试几次。")
        var exefile = path.resolve("./src/windows-wallpaper.exe")
        cp.execFile(exefile,[addr],function(err,msg){
            if(!err){
                alert("设置成功！")
            }
        })
    }
}

function clearWeatherCache() {
    store.set("weather",null);
    ipcRenderer.send('mainReload');
    alert("清除成功");
}

function rollBackToDefault() {
    store.delete("weather");
    store.delete("bgmcb");
    store.delete("autoCheckUpdate");
    store.delete("hitokotoSwitch");
    store.delete("hitokotoTime");
    store.delete("hitokotoType");
    store.delete("bigtitle");
    store.delete("subtitle");
    store.delete("timeSet");
    store.delete("adcode");
    store.delete("ip");
    store.delete("imgSourceSelect");
    store.delete("imgSource")
    store.delete("checkNoticeTime")
    ipcRenderer.send('mainReload');
    alert("已恢复到默认设置");
}


$("[data-hoverTip]").hover(function(){
    tip($(this).attr("data-hoverTip"),700,"center")
},function(){

})
