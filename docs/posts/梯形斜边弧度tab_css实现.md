# 梯形斜边弧度tab_css实现

![](http://lzxx.xyz/my-image/tab_css1.png)

```javascript
<div class="c" onclick="c()">
    <div class="b" onclick="b()"></div>
</div>
.b {
    width: 41%;
    height: 100px;
    line-height: 50px;
    background-color: red;
    position: relative;
  }

  .b:after {
    content: '';
    display: block;
    width: 67px;
    height: 100px;
    position: absolute;
    transform: skewX(30deg);
    background: red;
    border-top-right-radius: 8px;
    top: 0;
    right: -38px;
  }

  .c {
    width: 100%;
    height: 100px;
    background-color: cyan;
  }

```