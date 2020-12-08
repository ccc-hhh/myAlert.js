/**
 * myAlert.js
 * @author UESTC Chen Xiyu
 * 基于bootstrap4模态框样式,使用回调函数模拟alert
 */
// var params = {
//     title: '',//必填
//     body:{
//         text:'',
//         input:[{type:'',placeholder:'',id:''},...]/null,
//         textarea:[{placeholder:'',id:''},...]/null,
//         select:[{text:[0,1,2...],value:[0,1,2...],id:''},...]/null
//     },
//     timer: 0,1,2.../null
// };
(function (window, document) {

    window.myAlert = function (params, callback) {
        var myAlertHTML = '<div class="modal fade" id="myAlert">\
        <div class="modal-dialog"><div class="modal-content">\
                <!-- 模态框头部 -->\
                <div class="modal-header">\
                    <div id="myAlert-title" style="font-size: 20px;font-weight:bold;"></div>\
                    <button type="button" class="close" data-dismiss="modal" id="myAlert-x-close">&times;</button>\
                </div>\
                <!-- 模态框主体 -->\
                <div class="modal-body" id="myAlert-body" style="font-size: 17px;">\
                </div>\
                <!-- 模态框底部 -->\
                <div class="modal-footer" id="myAlert-footer">\
                    <button type="button" class="btn btn-primary" style="" id="myAlert-submit">确认</button>\
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="myAlert-close">取消</button>\
                </div></div></div></div>';
        myAlertWrap = document.createElement('div');
        myAlertWrap.innerHTML = myAlertHTML;
        document.body.appendChild(myAlertWrap);
        $("#myAlert").modal({
            backdrop: 'static',
            keyboard: false
        }); //设置点击遮罩层模态框不消失
        //设置标题
        document.getElementById('myAlert-title').innerHTML = params.title;

        //设置text
        if (params.body.hasOwnProperty('text') && params.body.text != null && params.body.text != '') {
            document.getElementById('myAlert-body').innerHTML = params.body.text;
        }

        //设置input
        if (params.body.hasOwnProperty('input') && params.body.input != null && params.body.input.length > 0) {
            params.body.input.forEach(item => {
                inputHTML = document.createElement('input');
                inputHTML.id = item.id;
                inputHTML.setAttribute('class', 'form-control');
                inputHTML.setAttribute('type', item.type);
                inputHTML.setAttribute('placeholder', item.placeholder);
                document.getElementById('myAlert-body').append(inputHTML);
            });
        }

        //设置textarea
        if (params.body.hasOwnProperty('textarea') && params.body.textarea != null && params.body.textarea.length > 0) {
            params.body.textarea.forEach(item => {
                textareaHTML = document.createElement('textarea');
                textareaHTML.id = item.id;
                textareaHTML.setAttribute('class', 'form-control');
                textareaHTML.setAttribute('type', item.type);
                textareaHTML.setAttribute('placeholder', item.placeholder);
                textareaHTML.setAttribute('style', 'height:100px');
                document.getElementById('myAlert-body').append(textareaHTML);
            });
        }

        //设置select
        if (params.body.hasOwnProperty('select') && params.body.select != null && params.body.select.length > 0) {
            params.body.select.forEach(item => {
                selectHTML = document.createElement('select');
                selectHTML.id = item.id;
                selectHTML.setAttribute('class', 'form-control');
                document.getElementById('myAlert-body').append(selectHTML);
                for (var i = 0; i < item.text.length; i++) {
                    var theOption = document.createElement("option");
                    theOption.text = item.text[i];
                    theOption.value = item.value[i];
                    selectHTML.add(theOption);
                }
            });
        }

        //定时器
        if (params.hasOwnProperty('timer') && params.timer != null && params.timer > 0) {
            timerTipsHTML = document.createElement('text');
            timerTipsHTML.id = 'timerTips';
            timerTipsHTML.setAttribute('style', 'margin-right:265px;font-size:15px;color:#808080;');
            timerTipsHTML.innerHTML = params.timer + '秒后消失'
            document.getElementById('myAlert-footer').prepend(timerTipsHTML);
            const TIME_COUNT = params.timer;
            var timer = 0;
            if (!timer) {
                count = TIME_COUNT;
                timer = setInterval(() => {
                    if (count > 0 && count <= TIME_COUNT) {
                        count -= 1;
                    } else {
                        document.getElementById('myAlert-close').click();
                        clearInterval(timer);
                        timer = null;
                        myAlertClear(params);
                        callback(true); //回调
                    }
                }, 1000);
            }
        }


        //打开模态框
        $('#modalAlert').modal();

        //button的点击事件
        document.onclick = function (e) {
            var target = e.target;
            //console.log(target.id)
            if (target.id == 'myAlert-submit') {
                var eventJson = returnEvent(params);
                document.getElementById('myAlert-close').click();
                myAlertClear();
                callback(eventJson); //回调
            }
            if (target.id == 'myAlert-close' || target.id == 'myAlert-x-close') {
                myAlertClear();
            }
        };
    };

    //myAlert完成后清空body及footer,清空之前返回input/textarea/select的值
    function myAlertClear() {
        var bodyList = document.getElementById('myAlert-body');
        while (bodyList.hasChildNodes()) {
            bodyList.removeChild(bodyList.lastChild);
        }
        if (document.getElementById('timerTips') != null) {
            document.getElementById('myAlert-footer').removeChild(document.getElementById('timerTips'));
        }
    }

    //设置input/textarea/select的返回值
    function returnEvent(params) {
        var eventJson = {};
        if (params.body.hasOwnProperty('input') && params.body.input != null && params.body.input.length > 0) {
            params.body.input.forEach(item => {
                eventJson[item.id] = $("#" + item.id).val();
            })
        }
        if (params.body.hasOwnProperty('textarea') && params.body.textarea != null && params.body.textarea.length > 0) {
            params.body.textarea.forEach(item => {
                eventJson[item.id] = $("#" + item.id).val();
            })
        }
        if (params.body.hasOwnProperty('select') && params.body.select != null && params.body.select.length > 0) {
            params.body.select.forEach(item => {
                eventJson[item.id] = $("#" + item.id).val();
            })
        }
        return eventJson;

    }
})(window, document);

//myAlert(function (id) {});//回调