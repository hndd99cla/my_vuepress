# footer位置的自动适配

#### footer位置的自动适配（主内容不足一屏时显示在最底部，超出一屏时跟随主内容显示）

```javascript
<div class="index">
  <div class="container">
    <!-- 你的页面内容 -->
  </div>
  <div class="foot">
    <!-- 需要自适应的底部内容 -->
  </div>
</div>

body{
	height:100;
	width:100%;
}
.index{
    min-height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 }

```