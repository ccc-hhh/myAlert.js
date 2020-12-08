# myAlert.js
## 基于bootstrap4模态框，使用回调函数的模拟alert
### 使用前须引用jquery.js和bootstrap
#### 可以用任何一个类似bootstrap模态框的前端框架的模态框代码替换本js中的html，只需修改有关模态框的部分代码即可
##### 目前支持title、text、input、textarea、select和定时关闭
```javascript
var params = {

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

### 调用方式：(暂不支持回调函数中再次调用myAlert)
```javascript
myAlert(params,function(){

     ....//your js code
     
})
```
