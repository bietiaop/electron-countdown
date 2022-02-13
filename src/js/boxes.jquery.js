function alert(content,ok){
    var alertBox = $(`
    <div class="blbkg">
        <div class="alertBox">
            <div class="content">`+content+`</div>
            <div class="btnb">
                <input type="button" name="ok" value="确认">
            </div>
        </div>
    </div>
    `)
    alertBox.find(".alertBox").css({ "transform": "scale(0.8)"});
    $("body").append(alertBox);
    $("html").css({"overflow":"hidden"});
    alertBox.find("input[name='ok']").focus();
    alertBox.find(".alertBox").fadeTo(0, 1, function() {
        alertBox.find(".alertBox").css({ "transform": "scale(1)"});
        alertBox.find(".alertBox").slideDown(100);
    });
    alertBox.find("input[name='ok']").click(function(){
        if(ok){
            ok();
        }
        alertBox.find(".alertBox").css({ "transform": "scale(0.8)" });
        alertBox.find(".alertBox").fadeTo(50, 0.01, function() {
            $("html").css({"overflow":"unset"});
            alertBox.find(".alertBox").slideUp(50, function() {
                alertBox.remove();
            });
        });
    })
}
function confirm(content,confirm){
    var confirmBox = $(`
    <div class="blbkg">
        <div class="confirmBox">
            <div class="content">`+content+`</div>
            <div class="btns">
                <input type="button" name="cancel" value="取消">
                <input type="button" name="confirm" value="确认">
            </div>
        </div>
    </div>
    `)
    confirmBox.find(".confirmBox").css({ "transform": "scale(0.8)"});
    $("body").append(confirmBox);
    $("html").css({"overflow":"hidden"});
    confirmBox.find(".confirmBox").fadeTo(0, 1, function() {
        confirmBox.find(".confirmBox").css({ "transform": "scale(1)"});
        confirmBox.find(".confirmBox").slideDown(100);
    });
    confirmBox.find("input[name='confirm']").focus();
    confirmBox.find("input[name='cancel']").click(function(){
        confirmBox.find(".confirmBox").css({ "transform": "scale(0.8)" });
        confirmBox.find(".confirmBox").fadeTo(50, 0.01, function() {
            confirmBox.find(".confirmBox").slideUp(50, function() {
                confirmBox.remove();
            });
        });
    })
    confirmBox.find("input[name='confirm']").click(function(){
        if(confirm){
            confirm();
        }
        confirmBox.find(".confirmBox").css({ "transform": "scale(0.8)" });
        confirmBox.find(".confirmBox").fadeTo(50, 0.01, function() {
            $("html").css({"overflow":"unset"});
            confirmBox.find(".confirmBox").slideUp(50, function() {
                confirmBox.remove();
            });
        });
    })
}
function prompt(text,value,fun){
    if(typeof value!="function"){
        var defvalue = value;
    }else{
        var defvalue = "";
    }
    var promptBox = $(`
    <div class="blbkg">
        <div class="promptBox">
            <div class="content">`+text+`

                <div class="input">
                    <input type="text" placeholder="请输入" value="`+defvalue+`">
                </div>
            </div>
            <div class="btns">
                <input type="button" name="cancel" value="取消">
                <input type="button" name="confirm" value="确认">
            </div>
        </div>
    </div>
    `)
    promptBox.find(".promptBox").css({ "transform": "scale(0.8)"});
    $("body").append(promptBox);
    $("html").css({"overflow":"hidden"});
    promptBox.find(".promptBox[type=text]").focus();
    promptBox.find(".promptBox").fadeTo(0, 1, function() {
        promptBox.find(".promptBox").css({ "transform": "scale(1)"});
        promptBox.find(".promptBox").slideDown(100);
    });
    promptBox.find("input[name='cancel']").click(function(){
        promptBox.find(".promptBox").css({ "transform": "scale(0.8)" });
        promptBox.find(".promptBox").fadeTo(50, 0.01, function() {
            $("html").css({"overflow":"unset"});
            promptBox.find(".promptBox").slideUp(50, function() {
                promptBox.remove();
            });
        });
    })
    promptBox.find("input[name='confirm']").click(function(){
        if(promptBox.find("input[type='text']").val()==""){
            alert("请输入内容");
        }else{
            if(typeof value == "function"){
                value(promptBox.find("input[type='text']").val());
            }
            if (fun && typeof fun == "function"){
                fun(promptBox.find("input[type='text']").val());
            }
            promptBox.find(".promptBox").css({ "transform": "scale(0.8)" });
            promptBox.find(".promptBox").fadeTo(50, 0.01, function() {
                promptBox.find(".promptBox").slideUp(50, function() {
                    promptBox.remove();
                });
            });
        }
    })
}
function tip(content,time,position) {
    if(!time|time==""){
        time = 1500;
    }
    $(".tipBox").fadeOut(100,function(){$(this).remove();});
    
    var tipBox = $(`
    <div class="tipBox" style="display:none">`+content+`</div>
    `);
    if(position=="left"){
        tipBox.css({"left":"10px","top":"50%","transform":"translate(0,-50%)","bottom":"unset"})
    }
    if(position=="center"){
        tipBox.css({"left":"50%","top":"50%","transform":"translate(-50%,-50%)","bottom":"unset"})
    }
    if(position=="right"){
        tipBox.css({"right":"10px","left":"unset","top":"50%","transform":"translate(0,-50%)","bottom":"unset"})
    }
    if(position=="top"){
        tipBox.css({"bottom":"unset","top":"10px"})
    }
    if(position=="leftTop"){
        tipBox.css({"bottom":"unset","top":"10px","left":"10px","transform":"none"})
    }
    if(position=="leftBottom"){
        tipBox.css({"left":"10px","transform":"none"})
    }
    if(position=="rightTop"){
        tipBox.css({"bottom":"unset","top":"10px","right":"10px","left":"unset","transform":"none"})
    }
    if(position=="rightBottom"){
        tipBox.css({"left":"unset","right":"10px","transform":"none"})
    }
    $("body").append(tipBox.fadeIn(100));
    setTimeout(function(){
        tipBox.fadeOut(300,function(){$(this).remove();});
    },time)
}
class loadingCom {
    constructor(){
        this.loadingDom = $(`<div class="blbkg">
        <div class="loadingBox"><div class="loading"></div></div>
    </div>`)
    }
    start () {
        $("body").append(this.loadingDom.fadeIn(100));
        $("html").css({"overflow":"hidden"});
    }
    end() {
        this.loadingDom.fadeOut(200, function(){ $(this).remove();});
        $("html").css({"overflow":"unset"});
    }
}
let loading = new loadingCom();