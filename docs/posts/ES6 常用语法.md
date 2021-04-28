# ES6 常用语法

------

## 什么是ES6


ES6，全称ECMAScript6.0是 JavaScript 的下一个版本标准2015.06发版。
ES6主要是为了解决 ES5 的先天不足，比如 JavaScript 里并没有类的概念，但是目前浏览器的 JavaScript 是 ES5版本，大多数高版本的浏览器也支持 ES6，不过只实现了 ES6 的部分特性和功能。
本次主要介绍一些常用的ES6语法。如下

> * ES6 解构赋值
> * ES6 Map和Set
> * ES6 字符串、对象、数组和函数
> * ES6 Reflect与Proxy
> * ES6 Promise对象
> * ES6 Generator函数和async函数

------
[TOC]
## 1.解构赋值

解构赋值是对赋值运算符的扩展。
他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。
在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

>#### 数组模型的解构

#####  **基本**

```python
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3
```

#####  **可嵌套**

```python
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3
```

#####  **可忽略**

```python
let [a, , b] = [1, 2, 3];
// a = 1
// b = 3
```

#####  **剩余运算符**

```python
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

#####  **字符串**

```python
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

#####  **解构默认值**

```python
let [a = 2] = [undefined]; // a = 2
```
当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。

```python
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```
------

>#### 对象模型的解构

#####  **基本**

```python
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
```

#####  **可嵌套可忽略**

```python
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'

let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
// x = 'hello'
```

#####  **剩余运算符**

```python
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

## 2.Map和Set

### **Map 对象**
Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

**Maps 和 Objects 的区别**

 - 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
 - Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是
 - Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
 - Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

&nbsp; 
**Map中的key可以是字符串、对象和函数**

```python
var myMap = new Map();
var keyString = "a string"; 
var keyString = "a string"; 
var keyFunc = function () {};

myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键 keyObj 关联的值");
myMap.set(keyFunc, "和键 keyFunc 关联的值");
```
 
####  **Map的迭代**
##### **for...of**
```python
var myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
 
// 将会显示两个 log。 一个是 "0 = zero" 另一个是 "1 = one"
for (var [key, value] of myMap) {
  console.log(key + " = " + value);
}
for (var [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
/* 这个 entries 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 [key, value] 数组。 */
 
// 将会显示两个log。 一个是 "0" 另一个是 "1"
for (var key of myMap.keys()) {
  console.log(key);
}
/* 这个 keys 方法返回一个新的 Iterator 对象， 它按插入顺序包含了 Map 对象中每个元素的键。 */
 
// 将会显示两个log。 一个是 "zero" 另一个是 "one"
for (var value of myMap.values()) {
  console.log(value);
}
/* 这个 values 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的值。 */
```

####  **Map对象的操作**
&nbsp;
##### **Map 与 Array的转换**
```python
var kvArray = [["key1", "value1"], ["key2", "value2"]];
 
// Map 构造函数可以将一个 二维 键值对数组转换成一个 Map 对象
var myMap = new Map(kvArray);
 
// 使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组
var outArray = Array.from(myMap);
```
##### **Map 的克隆**
```python
var myMap1 = new Map([["key1", "value1"], ["key2", "value2"]]);
var myMap2 = new Map(myMap1);
 
console.log(original === clone); 
// 打印 false。 Map 对象构造函数生成实例，迭代出新的对象。
```

##### **Map 的合并**
```python
var first = new Map([[1, 'one'], [2, 'two'], [3, 'three'],]);
var second = new Map([[1, 'uno'], [2, 'dos']]);
 
// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的，对应值即 uno，dos， three
var merged = new Map([...first, ...second]);
```

### **Set 对象**
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

**Set 中的特殊值**

Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

 - +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复；
 - undefined 与 undefined 是恒等的，所以不重复；
 - NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。

&nbsp; 
####  **不可重复性**

```python
let mySet = new Set();
 
mySet.add(1); // Set(1) {1}
mySet.add(5); // Set(2) {1, 5}
mySet.add(5); // Set(2) {1, 5} 这里体现了值的唯一性
mySet.add("some text"); 
// Set(3) {1, 5, "some text"} 这里体现了类型的多样性
var o = {a: 1, b: 2}; 
mySet.add(o);
mySet.add({a: 1, b: 2}); 
// Set(5) {1, 5, "some text", {…}, {…}} 
// 这里体现了对象之间引用不同不恒等，即使值相同，Set 也能存储
```
 
####  **类型转换**
##### **Array**
```python
// Array 转 Set
var mySet = new Set(["value1", "value2", "value3"]);
// 用...操作符，将 Set 转 Array
var myArray = [...mySet];
String
// String 转 Set
var mySet = new Set('hello');  // Set(4) {"h", "e", "l", "o"}
// 注：Set 中 toString 方法是不能将 Set 转换成 String
```

####  **Set对象一些用法**
##### **数组去重**
```python
var mySet = new Set([1, 2, 3, 4, 4]);
[...mySet]; // [1, 2, 3, 4]
```
##### **并集**
```python
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1, 2, 3, 4}
```
##### **交集**
```python
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}
```
##### **差集**
```python
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var difference = new Set([...a].filter(x => !b.has(x))); // {1}
```

## 3.字符串、对象、数组和函数

### **字符串**
#### **字符串补全**

 - padStart：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
 - padEnd：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。

&nbsp;
 以上两个方法接受两个参数，第一个参数是指定生成的字符串的最小长度，第二个参数是用来补全的字符串。如果没有指定第二个参数，默认用空格填充。
 
```python
console.log("h".padStart(5,"o"));  // "ooooh"
console.log("h".padEnd(5,"o"));    // "hoooo"
console.log("h".padStart(5));      // "    h"

//如果指定的长度小于或者等于原字符串的长度，则返回原字符串:
console.log("hello".padStart(5,"A"));  // "hello"

//如果原字符串加上补全字符串长度大于指定长度，则截去超出位数的补全字符串:
console.log("hello".padEnd(10,",world!"));  // "hello,worl"
```

#### **模板字符串**
模板字符串相当于加强版的字符串，用反引号`,除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。

##### **基本用法**
```python
let string = `Hello'\n'world`;
console.log(string); 
// "Hello'
// 'world"

// 换行用法 模板字符串会保留空格和换行
let string1 =  `Hey,
can you stop angry now?`;
console.log(string1);
// Hey,
// can you stop angry now?

// 字符串插入变量和表达式
let name = "Tom";
let age = 27;
let info = `My Name is ${name},I am ${age+1} years old next year.`
console.log(info);
// My Name is Tom,I am 28 years old next year.

//插入函数
function f(){
  return "have fun!";
}
let string2= `Game start,${f()}`;
console.log(string2);  
// Game start,have fun!
```
##### **标签用法**
标签模板，是一个函数的调用，其中调用的参数是模板字符串。
```python
alert`Hello world!`;
// 等价于
alert('Hello world!');

getPersonInfo(a,b,c)
getPersonInfo`${person} is ${age} years old` 
//三个参数为 ["", "is", "years old"], person, age
```

### **对象**

#### **属性的简洁表示法**
这个在我们vue项目中模块导出或者注册组件经常用到
```python
export default{
  components: {
    specifyAreaSelect
  },
}

export default {
    actions,
    state
}
```

#### **属性名表达式**
ES6允许用表达式作为属性名，但是一定要将表达式放在方括号内。
```python
const obj = {
 ["he"+"llo"](){
   return "Hi";
  }
}
obj.hello();  //"Hi"
//注意点：属性的简洁表示法和属性名表达式不能同时使用，否则会报错。
```

#### **对象的拓展运算符**
拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。
```
//基本
let person = {name: "Amy", age: 15};
let someone = { ...person };
someone;  //{name: "Amy", age: 15}

//合并对象
let age = {age: 15};
let name = {name: "Amy"};
let person = {...age, ...name};
person;  //{age: 15, name: "Amy"}
```

#### **对象新方法**
Object.assign() 用于将源对象的所有可枚举属性复制到目标对象中。
##### **基本**
```
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
target;  // {a: 1, b: 2, c: 3}
```
##### **注意点**
```
//assign 的属性拷贝是浅拷贝:
let sourceObj = { a: { b: 1}};
let targetObj = {c: 3};
Object.assign(targetObj, sourceObj);
targetObj.a.b = 2;
sourceObj.a.b;  // 2

//同名属性替换
targetObj = { a: { b: 1, c:2}};
sourceObj = { a: { b: "hh"}};
Object.assign(targetObj, sourceObj);
targetObj;  // {a: {b: "hh"}}

//数组的处理
Object.assign([2,3], [5]);  // [5,3]
//会将数组处理成对象，所以先将 [2,3] 转为 {0:2,1:3} ，然后再进行属性复制，所以源对象的 0 号属性覆盖了目标对象的 0。
```

### **数组**

#### **数组的创建**
##### **Array.from()**
```
console.log(Array.from([1, 2])); // [1, 2]
//可迭代
console.log(Array.from([1, 2, 3], (n) => n * 2)); // [2, 4, 6]
```

#### **类数组对象**
一个类数组对象必须含有 length 属性，且元素属性名必须是数值或者可转换为数值的字符。
```
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
console.log(); // ['1', '2', 3]
 
// 没有 length 属性,则返回空数组
let array = Array.from({
  0: '1',
  1: '2',
  2: 3,
});
console.log(array); // []
 
// 元素属性名不为数值且无法转换为数值，返回长度为 length 元素值为 undefined 的数组  
let array1 = Array.from({
  a: 1,
  b: 2,
  length: 2
});
console.log(array1); // [undefined, undefined]
```

#### **扩展的方法**
##### **find()**
查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
```
let arr = Array.of(1, 2, 3, 4);
console.log(arr.find(item => item > 2)); // 3
 
// 数组空位处理为 undefined
console.log([, 1].find(n => true)); // undefined
```
##### **fill()**
将一定范围索引的数组元素内容填充为单个指定的值
```
let arr = Array.of(1, 2, 3, 4);
// 参数1：用来填充的值
// 参数2：被填充的起始索引
// 参数3(可选)：被填充的结束索引，默认为数组末尾
console.log(arr.fill(0,1,2)); // [1, 0, 3, 4]
```
##### **flat()**
展开数组
```
console.log([1 ,[2, 3]].flat()); // [1, 2, 3]
 
// 指定转换的嵌套层数
console.log([1, [2, [3, [4, 5]]]].flat(2)); // [1, 2, 3, [4, 5]]
 
// 不管嵌套多少层
console.log([1, [2, [3, [4, 5]]]].flat(Infinity)); // [1, 2, 3, 4, 5]
 
// 自动跳过空位
console.log([1, [2, , 3]].flat());<p> // [1, 2, 3]
```

#### **扩展运算符**
```
let arr = [1, 2],
    arr1 = [...arr];
console.log(arr1); // [1, 2]

console.log([...[1, 2],...[3, 4]]); // [1, 2, 3, 4]
```

### **函数**

#### **默认传参**
```
function fn(name,age=17){
 console.log(name+","+age);
}
fn("Amy",18);  // Amy,18
fn("Amy","");  // Amy,
fn("Amy");     // Amy,17
```
#### **不定参数**
不定参数用来表示不确定参数个数，形如，...变量名，由...加上一个具名参数标识符组成。具名参数只能放在参数组的**最后**，并且有且只有一个不定参数。
```
function f(...values){
    console.log(values.length);
}
f(1,2);      //2
f(1,2,3,4);  //4
```
#### **箭头函数**
箭头函数提供了函数更简洁的写法，同时函数内的this指向也会有一定改变
```
var f = v => v;
//等价于
var f = function(v){
 return v;
}

//当无参数或者多个参数时
var f = (a,b) => a+b;
f(6,2);  //8

//多行语句需要用{}把函数体包起来
var f = (a,b) => {
 let result = a+b;
 return result;
}
f(6,2);  // 8

//当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
// 报错
var f = (id,name) => {id: id, name: name};
f(6,2);  // SyntaxError: Unexpected token :
 
// 不报错
var f = (id,name) => ({id: id, name: name});
f(6,2);  // {id: 6, name: 2}

//注意点：没有 this、super、arguments 和 new.target 绑定。
var func = () => {
  // 箭头函数里面没有 this 对象，
  // 此时的 this 是外层的 this 对象，即 Window 
  console.log(this)
}
func(55)  // Window 
var func = () => {    
  console.log(arguments)
}
func(55);  // ReferenceError: arguments is not defined

//箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。
function fn(){
  setTimeout(()=>{
    // 定义时，this 绑定的是 fn 中的 this 对象
    console.log(this.a);
  },0)
}
var a = 20;
// fn 的 this 对象为 {a: 19}
fn.call({a: 18});  // 18
```

## **4.Reflect与Proxy**
Proxy 与 Reflect 是 ES6 为了操作对象引入的 API 。

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。

Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

vue3.0中，双向绑定就是使用了Proxy语法代替了原来的defineProperty，掌握Proxy对我们使用vue会有很大的帮助

### **Proxy**
一个 Proxy 对象由两个部分组成： target 、 handler 。在通过 Proxy 构造函数生成实例对象时，需要提供这两个参数。 target 即目标对象， handler 是一个对象，声明了代理 target 的指定行为。
```
let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        //参数target是访问的对象，key是访问的对象属性名
        //以下是访问对象的值时运行的代码
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        //参数target是访问的对象，key是访问的对象属性名，value是新设置的值
        //以下是设置对象的值时运行的代码
        console.log('setting '+key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
// getting name
// setting age
// 25
 
// target 可以为空对象
let targetEpt = {}
let proxyEpt = new Proxy(targetEpt, handler)
// 调用 get 方法，此时目标对象为空，没有 name 属性
proxyEpt.name // getting name
// 调用 set 方法，向目标对象中添加了 name 属性
proxyEpt.name = 'Tom'
// setting name
// "Tom"
// 再次调用 get ，此时已经存在 name 属性
proxyEpt.name
// getting name
// "Tom"
 
// handler 对象也可以为空，相当于不设置拦截操作，直接访问目标对象
```

#### **用Proxy写一个拦截器**
```
let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {//不为数字报错
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {//大于200报错
                throw new RangeError('The age seems invalid');
            }
        }
        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
    }
};
let proxy= new Proxy({}, validator)
proxy.age = 100;
proxy.age           // 100
proxy.age = 'oppps' // 报错
proxy.age = 300     // 报错
```
注意，严格模式下，set代理如果没有返回true，就会报错。

### **Reflect**
ES6 中将 Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。
Reflect 对象对某些方法的返回结果进行了修改，使其更合理。
Reflect 对象使用函数的方式实现了 Object 的命令式操作。

查找并返回 target 对象的 name 属性。
```
let exam = {
    name: "Tom",
    age: 24,
    get info(){
        return this.name + this.age;
    }
}
Reflect.get(exam, 'name'); // "Tom"
 
// 当 target 对象中存在 name 属性的 getter 方法， getter 方法的 this 会绑定 // receiver
let receiver = {
    name: "Jerry",
    age: 20
}
Reflect.get(exam, 'info', receiver); // Jerry20
 
// 当 name 为不存在于 target 对象的属性时，返回 undefined
Reflect.get(exam, 'birth'); // undefined
 
// 当 target 不是对象时，会报错
Reflect.get(1, 'name'); // TypeError
```

### **组合使用**
```
let exam = {
    name: "Tom",
    age: 24
}
let handler = {
    get: function(target, key){
        console.log("getting "+key);
        return Reflect.get(target,key);
    },
    set: function(target, key, value){
        console.log("setting "+key+" to "+value)
        Reflect.set(target, key, value);
    }
}
let proxy = new Proxy(exam, handler)
proxy.name = "Jerry"
proxy.name
// setting name to Jerry
// getting name
// "Jerry"
```
[更多详情](https://www.runoob.com/w3cnote/es6-reflect-proxy.html)

## **5.Promise**
Promise是异步编程的一种解决方案。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

### **Promise 状态**
Promise 异步操作有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。
Promise 对象只有：从 pending 变为 fulfilled 和从 pending 变为 rejected 的状态改变。只要处于 fulfilled 和 rejected ，状态就不会再变了即 resolved（已定型）。
```
const p1 = new Promise(function(resolve,reject){
    resolve('success1');
    resolve('success2');
}); 
const p2 = new Promise(function(resolve,reject){  
    resolve('success3'); 
    reject('reject');
});
p1.then(function(value){  
    console.log(value); // success1
});
p2.then(function(value){ 
    console.log(value); // success3
});
```
注意：
无法取消 Promise ，一旦新建它就会立即执行，无法中途取消。如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### **then 方法**
then 方法接收两个函数作为参数，第一个参数是 Promise 执行成功时的回调，第二个参数是 Promise 执行失败时的回调，两个函数只会有一个被调用。
在 JavaScript 事件队列的当前运行完成之前，回调函数永远不会被调用。
```
const p = new Promise(function(resolve,reject){
  resolve('success');
});

p.then(function(value){
  console.log(value);
});

console.log('first');
// first
// success
```
通过 .then 形式添加的回调函数，不论什么时候，都会被调用。
可以添加多个回调函数，它们会按照插入顺序并且独立运行。适合我们在业务中先请求一个接口完成后再请求另一个接口。
```
const p = new Promise(function(resolve,reject){
  resolve(1);
}).then(function(value){ // 第一个then // 1
  console.log(value);
  return value * 2;
}).then(function(value){ // 第二个then // 2
  console.log(value);
}).then(function(value){ // 第三个then // undefined
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){ // 第四个then // resolve
  console.log(value);
  return Promise.reject('reject'); 
}).then(function(value){ // 第五个then //reject:reject
  console.log('resolve:' + value);
}, function(err) {
  console.log('reject:' + err);
});
```
then 方法将返回一个 resolved 或 rejected 状态的 Promise 对象用于链式调用，且 Promise 对象的值就是这个返回值。

### **Promise封装axios**
```
 checkLogin: () => {
// 返回一个promise对象
    return new Promise((resolve, reject) => {
      axios({
            url: url
            method: 'post',
            data: {
            }
          })
            .then((res) => {
              resolve(res.data);
              // console.log(res);
            })
            .catch(function (error) {
              reject(error);
              // console.log(error);
            });
    });
  }
```
调用
```
this.checkLogin().then(res => {
        console.log(res);
        // 执行成功的回调函数
        },
        error => { 
        console.log(error); 
        // 执行失败的回调函数
        });
```

### **Promise.prototype.catch方法：捕捉错误**
```
getJSON("/posts.json").then(function(posts) {
  // some code
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

### **Promise.all方法，Promise.race方法**
Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。例如
```
var p = Promise.all([p1,p2,p3]);
```
Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例。（Promise.all 方法的参数不一定是数组，但是必须具有 iterator 接口，且返回的每个成员都是 Promise 实例。）
p 的状态由 p1、p2、p3 决定，分成两种情况。
 
 - 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 - 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
```
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function(id){
  return getJSON("/post/" + id + ".json");
});
 
Promise.all(promises).then(function(posts) {
  // ...  
}).catch(function(reason){
  // ...
});
```

Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```
var p = Promise.race([p1,p2,p3]);
```
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。
如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

## **6.Generator函数和async函数**
Generator可以通过 yield关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。

### **Generator 函数组成**
Generator 有两个区分于普通函数的部分：是在 function 后面，函数名之前有个 * ；函数内部有 yield 表达式。

其中 * 用来表示函数为 Generator 函数，yield 用来定义函数内部的状态。
```
function* func(){
 console.log("one");
 yield '1';
 console.log("two");
 yield '2'; 
 console.log("three");
 return '3';
}
```

### **执行机制**
调用 Generator 函数和调用普通函数一样，在函数名后面加上()即可，但是 Generator 函数不会像普通函数一样立即执行，而是返回一个指向内部状态对象的指针，所以要调用遍历器对象Iterator 的 next 方法，指针就会从函数头部或者上一次停下来的地方开始执行，直到遇到yield。
```
func.next();
// one
// {value: "1", done: false}
 
func.next();
// two
// {value: "2", done: false}
 
func.next();
// three
// {value: "3", done: true}
 
func.next();
// {value: undefined, done: true}
```
第一次调用 next 方法时，从 Generator 函数的头部开始执行，先是打印了 one ,执行到 yield 就停下来，并将yield 后边表达式的值 '1'，作为返回对象的 value 属性值，此时函数还没有执行完， 返回对象的 done 属性值是 false。
第二次调用 next 方法时，同上步 。
第三次调用 next 方法时，先是打印了 three ，然后执行了函数的返回操作，并将 return 后面的表达式的值，作为返回对象的 value 属性值，此时函数已经结束，多以 done 属性值为true 。
第四次调用 next 方法时， 此时函数已经执行完了，所以返回 value 属性值是 undefined ，done 属性值是 true 。如果执行第三步时，没有 return 语句的话，就直接返回 {value: undefined, done: true}。

注意点：当 next 传入参数的时候，该参数会作为上一步yield的返回值

#### **return方法**
return 方法返回给定值，并结束遍历Generator函数。return方法提供参数时，返回该参数；不提供参数时，返回 undefined

```
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
var f = foo();
f.next();
// {value: 1, done: false}
f.return("foo");
// {value: "foo", done: true}
f.next();
// {value: undefined, done: true}
throw 方法
throw 方法可以再 Generator 函数体外面抛出异常，再函数体内部捕获。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('catch inner', e);
  }
};
 
var i = g();
i.next();
 
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('catch outside', e);
}
// catch inner a
// catch outside b
```
遍历器对象抛出了两个错误，第一个被 Generator 函数内部捕获，第二个因为函数体内部的catch 函数已经执行过了，不会再捕获这个错误，所以这个错误就抛出 Generator 函数体，被函数体外的 catch 捕获。

#### **使用场景**
为不具备 Iterator 接口的对象提供遍历方法。
```
function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for (const propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
 
const jane = { first: 'Jane', last: 'Doe' };
for (const [key,value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```
Reflect.ownKeys() 返回对象所有的属性，不管属性是否可枚举，包括 Symbol。jane 原生是不具备 Iterator 接口无法通过 for... of遍历。这边用了 Generator 函数加上了 Iterator 接口，所以就可以遍历 jane 对象了。

### **async函数**

async 是 ES7 才有的与异步操作有关的关键字，和 Promise ， Generator 有很大关联的

#### **返回值**
async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
```
async function helloAsync(){
    return "helloAsync";
  }
  
console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
   console.log(v);         // helloAsync
})
```
async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。
await 关键字仅在 async function 中有效。如果在async function函数体外使用await，你只会得到一个语法错误。
```
function testAwait(){
   return new Promise((resolve) => {
     //一个请求
     console.log(response)
   });
}
 
async function helloAsync(){
   await testAwait();
   console.log("end");
 }
helloAsync();
// response
// end
```
应用场景：先请求数据，再根据请求到的数据完成下一个请求。

正常情况下，await 命令后面是一个 Promise 对象，它也可以跟其他值，如字符串，布尔值，数值以及普通函数。
```
function testAwait(){
   console.log("testAwait");
}
async function helloAsync(){
   await testAwait();
   console.log("helloAsync");
}
helloAsync();
// testAwait
// helloAsync
```
await针对所跟不同表达式的处理方式：
Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。
非 Promise 对象：直接返回对应的值。
