# Vue uniapp各端差异

#### 1. Uniapp支付宝小程序的input不支持@click；picker里只能有view标签；文件和文件夹不能有@

#### 2. 微信小程序palceholder-class失效 应该设置palceholder-style

#### 3. Input组件@input在H5端数据更新不及时：@input事件操作用setTimeout包裹

#### 4. 组件的循环插槽

```javascript
<slot name="icon" :item="customizeIcon[index]"/>
//把接收到的props数组把数组的每个值再次传到父组件
<template v-slot:icon="{{item}}">
  <view>
    <image :src="item" style="width:50rpx;height:50rpx"/>
  </view>
</template>
```
