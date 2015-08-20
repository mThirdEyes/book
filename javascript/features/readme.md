# JavaScript中的一些特性

## 匿名函数调用

```javascript
方式1
(function(win){
    console.log(win);
})(window);

方式2
(function(win){
    console.log(win);
}(window));

以上为比较常见的两种匿名函数调用方式
```

## setTimeout

```javascript

// 闭包
var a = 3;
while(a--) {
    (function(a){
        setTimeout(function(){
            //alert(a);
            console.log(a); // 2 1 0
        }, 0);
    })(a);
}

// 
var a = 3;
while(a--) {
    setTimeout(function(){
        //alert(a);
        console.log(a); // -1 -1 -1
    }, 0);
}
```

## 斐波那契数列(递归)

```javascript
function fibonacci(num) {
    if(num === 1 || num === 2){
        return 1;
    }

    var self = arguments.callee;

    return self(num-1) + self(num-2);
}
```