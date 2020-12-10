/**
 * myAlert.js
 * @author UESTC Chen Xiyu
 * 基于bootstrap4模态框样式,使用回调函数模拟alert
 */
// var params = {
//     paramsID:''//必填，例:var newAlert= new MyAlert({'paramsID':'newAlert'})
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

    window.MyAlert = function (params) {

        this.params = params;
        this.id = this.params.paramsID

    };
    MyAlert.prototype = {
        init: function (theClass) {
            var myAlertHTML = '<div class="modal fade" id="' + this.id + '-myAlert">\
            <div class="modal-dialog' + theClass + '"><div class="modal-content">\
            <!-- 模态框头部 -->\
            <div class="modal-header">\
                <div id="' + this.id + '-myAlertTitle" style="font-size: 20px;font-weight:bold;"></div>\
                <button type="button" class="close" data-dismiss="modal" id="' + this.id + '-myAlertCloseX">&times;</button>\
            </div>\
            <!-- 模态框主体 -->\
            <div class="modal-body" id="' + this.id + '-myAlertBody" style="font-size: 17px;">\
            </div>\
            <!-- 模态框底部 -->\
            <div class="modal-footer" id="' + this.id + '-myAlertFooter">\
                <button type="button" class="btn btn-primary" style="" id="' + this.id + '-myAlertSubmit">确认</button>\
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="' + this.id + '-myAlertClose">取消</button>\
            </div></div></div></div>';
            myAlertWrap = document.createElement('div');
            myAlertWrap.innerHTML = myAlertHTML;
            document.body.appendChild(myAlertWrap);
            $("#" + this.id + "-myAlert").modal({
                backdrop: 'static',
                keyboard: false
            }); //设置点击遮罩层模态框不消失
        },
        set: function () {
            //设置标题
            document.getElementById(this.id + '-myAlertTitle').innerHTML = this.params.title;

            //设置text
            if (this.params.body.hasOwnProperty('text') && this.params.body.text != null && this.params.body.text != '') {
                document.getElementById(this.id + '-myAlertBody').innerHTML = this.params.body.text;
            }

            //设置input
            if (this.params.body.hasOwnProperty('input') && this.params.body.input != null && this.params.body.input.length > 0) {
                this.params.body.input.forEach(item => {
                    inputHTML = document.createElement('input');
                    inputHTML.id = item.id;
                    inputHTML.setAttribute('class', 'form-control');
                    inputHTML.setAttribute('type', item.type);
                    inputHTML.setAttribute('placeholder', item.placeholder);
                    document.getElementById(this.id + '-myAlertBody').append(inputHTML);
                });
            }

            //设置textarea
            if (this.params.body.hasOwnProperty('textarea') && this.params.body.textarea != null && this.params.body.textarea.length > 0) {
                this.params.body.textarea.forEach(item => {
                    textareaHTML = document.createElement('textarea');
                    textareaHTML.id = item.id;
                    textareaHTML.setAttribute('class', 'form-control');
                    textareaHTML.setAttribute('type', item.type);
                    textareaHTML.setAttribute('placeholder', item.placeholder);
                    textareaHTML.setAttribute('style', 'height:100px');
                    document.getElementById(this.id + '-myAlertBody').append(textareaHTML);
                });
            }

            //设置select
            if (this.params.body.hasOwnProperty('select') && this.params.body.select != null && this.params.body.select.length > 0) {
                this.params.body.select.forEach(item => {
                    selectHTML = document.createElement('select');
                    selectHTML.id = item.id;
                    selectHTML.setAttribute('class', 'form-control');
                    document.getElementById(this.id + '-myAlertBody').append(selectHTML);
                    for (var i = 0; i < item.text.length; i++) {
                        var theOption = document.createElement("option");
                        theOption.text = item.text[i];
                        theOption.value = item.value[i];
                        selectHTML.add(theOption);
                    }
                });
            }

            //定时器
            if (this.params.hasOwnProperty('timer') && this.params.timer != null && this.params.timer > 0) {
                timerTipsHTML = document.createElement('text');
                timerTipsHTML.id = this.id + '-TimerTips';
                timerTipsHTML.setAttribute('style', 'margin-right:265px;font-size:15px;color:#808080;');
                timerTipsHTML.innerHTML = this.params.timer + '秒后消失'
                document.getElementById(this.id + '-myAlertFooter').prepend(timerTipsHTML);
                const TIME_COUNT = this.params.timer;
                var timer = 0;
                if (!timer) {
                    count = TIME_COUNT;
                    timer = setInterval(() => {
                        if (count > 0 && count <= TIME_COUNT) {
                            count -= 1;
                        } else {
                            document.getElementById(this.id + '-myAlertClose').click();
                            clearInterval(timer);
                            timer = null;
                            MyAlert.clear(this.params);
                            this.callback(true); //回调
                        }
                    }, 1000);
                }
            }
        },
        clear: function (theId) {
            var bodyList = document.getElementById(theId + '-myAlertBody');
            if (bodyList != null) {
                while (bodyList.hasChildNodes()) {
                    bodyList.removeChild(bodyList.lastChild);
                }
            }
            if (document.getElementById(theId + '-TimerTips') != null) {
                document.getElementById(theId + '-myAlertFooter').removeChild(document.getElementById(theId + '-TimerTips'));
            }
        },
        open: function () {
            $('#modalAlert').modal();
        },
        tips: function (callback) {
            this.init(' modal-sm');
            this.set();
            this.open();
            var theParams = this.params;
            var theId = this.id;
            //button的点击事件
            document.onclick = function (e) {
                var target = e.target;
                //console.log(target.id)
                if (target.id == theId + '-myAlertSubmit') {
                    var eventJson = {};
                    if (theParams.body.hasOwnProperty('input') && theParams.body.input != null && theParams.body.input.length > 0) {
                        theParams.body.input.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    if (theParams.body.hasOwnProperty('textarea') && theParams.body.textarea != null && theParams.body.textarea.length > 0) {
                        theParams.body.textarea.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    if (theParams.body.hasOwnProperty('select') && theParams.body.select != null && theParams.body.select.length > 0) {
                        theParams.body.select.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    document.getElementById(theId + '-myAlertClose').click();
                    this.clear(theId);
                    callback(eventJson); //回调
                }
                if (target.id == theId + '-myAlertClose' || target.id == theId + '-myAlertCloseX') {
                    this.clear(theId);
                }
            }
        },
        modal: function (callback) {
            this.init('');
            this.set();
            this.open();
            var theParams = this.params;
            var theId = this.id;
            //button的点击事件
            document.onclick = function (e) {
                var target = e.target;
                //console.log(target.id)
                if (target.id == theId + '-myAlertSubmit') {
                    var eventJson = {};
                    if (theParams.body.hasOwnProperty('input') && theParams.body.input != null && theParams.body.input.length > 0) {
                        theParams.body.input.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    if (theParams.body.hasOwnProperty('textarea') && theParams.body.textarea != null && theParams.body.textarea.length > 0) {
                        theParams.body.textarea.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    if (theParams.body.hasOwnProperty('select') && theParams.body.select != null && theParams.body.select.length > 0) {
                        theParams.body.select.forEach(item => {
                            eventJson[item.id] = $("#" + item.id).val();
                        })
                    }
                    document.getElementById(theId + '-myAlertClose').click();
                    this.clear(theId);
                    callback(eventJson); //回调
                }
                if (target.id == theId + '-myAlertClose' || target.id == theId + '-myAlertCloseX') {
                    this.clear(theId);
                }
            }

        }
    }
})(window, document);
