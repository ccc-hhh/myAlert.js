# myAlert.js
## 基于bootstrap4模态框，使用回调函数的模拟alert
### 使用前须引用jquery.js和bootstrap
#### 可以用任何一个类似bootstrap模态框的前端框架的模态框代码替换本js中的html，只需修改有关模态框的部分代码即可
##### 目前支持title、text、input、textarea、select和定时关闭
```javascript
var params = {
     paramsID: '',//仅在myAlert2.js中支持,必填
     title: '',//必填
     body:{
         text:'',
         input:[{type:'',placeholder:'',id:''},...]/null,
         textarea:[{placeholder:'',id:''},...]/null,
         select:[{text:[0,1,2...],value:[0,1,2...],id:''},...]/null
     },
     timer: 0,1,2.../null
};
```
### myAlert.js 调用方式：(暂不支持回调函数中再次调用myAlert)
```javascript
myAlert(params,function(event){//event的返回值为：{youInputID:value...}
     ....//your js code
})
```
### myAlert2.js 调用方式：(支持回调函数中再次调用)
```javascript
var myAlert = new MyAlert(params);
//小模态框
myAlert.tips(function(event){//event的返回值为：{youInputID:value...}
     ....//your js code
})
//中等模态框
myAlert.modal(function(event){//event的返回值为：{youInputID:value...}
     ....//your js code
})

