# JavaScript中的闭包

闭包（closure）是 ECMAScript 的语法特性，`闭包就是在函数内部定义的函数可访问其外部函数的作用域。`

## 作用域(scope)
要理解闭包，首先必须理解JavaScript特殊的作用域。

avaScript的作用域的特殊之处，就在于函数内部可以访问函数外部的作用域，反之，函数外部却无法访问函数内部的作用域。

```javascript
var a = 1; // 在函数外部声明变量a

function fn() {
	var b = 2;// 在函数内部声明变量b
	alert(a);

}

fn(); // 1

alert(b); // undefined
```
在JavaScript运行函数都会创建属于函数的`上下文环境（context）`及`作用域（scope）`，作用域即当前环境范围内的变量。
JavaScript最外层的环境为window对象，也就是全局作用域所在的环境。当执行到下一级环境时，下一级环境会主动包含上一级的作用域，最终形成一级一级关联的作用域链（对象的 [Scope] 属性指向该作用域链）。

`闭包`就是借助这种作用域链，一方面可使内部函数可访问外部函数的变量；另一方面，闭包还可以抑制外部函数环境的销毁，使其变量始终保存在内存中，直至不需要时再销毁。

## 示例

```javascript
function foo(x) {
  var tmp = 3;

  function bar(y) {
    alert(x + y + (++tmp)); // will alert 16
  }

  bar(10);
}

foo(2); // 16
```

```javascript
function foo(x) {
  var tmp = 3;

  return function (y) {
    alert(x + y + (++tmp)); // will also alert 16
  }
}

var bar = foo(2); // bar is now a closure.
bar(10);
```



## 参考资料
* [How do JavaScript closures work?](http://stackoverflow.com/questions/111102/how-do-javascript-closures-work)
* [学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)