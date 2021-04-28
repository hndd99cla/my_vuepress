# uniapp

------

## 准备过程
------

## 1.   下载HBuilder X（开发使用）和微信开发者工具（预览使用）
## 2.   导入uniapp项目，安装依赖并安装本地运行需要的插件，在HBuilderX的工具->插件安装
## 3.	在manifest.json的微信小程序配置中填写自己的微信小程序AppID
        在微信开发者工具申请获取或者使用自己是开发者的项目即可
## 4.	运行->运行到小程序模拟器即可

------
## 开发
------
**项目结构和语法跟平时的项目差不多，有差异的看看小程序开发文档或者uniapp开发文档即可，以下是个人首次开发过程中遇到的一些经验和问题**


>#### 文件目录
pages.json 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。它类似微信小程序中app.json的页面管理部分。注意定位权限申请等原属于app.json的内容，在uni-app中是在manifest中配置。
manifest.json 文件是应用的配置文件，用于指定应用的名称、图标、权限等。
其他文件与vue项目差不多，按vue项目的开发模式和规范开发即可。


----------


>#### 程序包问题
由于小程序的特性，整个小程序所有分包大小不超过 12M，单个分包/主包大小不能超过2M
所以建议功能比较多的项目进行分包开发

假设支持分包的小程序目录结构如下：
```
├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils
```
开发者通过在 app.json subpackages 字段声明项目分包结构：
```
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```
具体配置和文件引用规则可看官方文档，此外还有独立分包和分包预下载配置。
https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html

>#### 本地资源问题
由于小程序包大小的问题，所以建议根据需求尽量的把引用图片放在服务器上，比较小或者使用率较高的图片放在本地。
注意：底部tab栏的图片只能放在本地！
小程序端的background的url属性不支持本地图片，只能使用base64编码的或者外部文件。也不能使用本地的字体文件
支付宝小程序组件内 image 标签不可使用相对路径

--------
>#### 样式问题
- 使用rpx作为单位，样式rpx的值对应蓝湖750尺寸的设计图
- 在uniapp上使用伪元素content:attr()小程序不支持，可以使用计数器
- 以:style=""这样的方式设置px像素值，其值为实际像素，不会被编译器转换
- 设置placeholder-class在微信小程序端无效，可以使用placeholder-style统一设置项目placeholder的样式
- 尽量避免使用太新的css，布局尽量使用flex支持更多平台

>#### 标签问题
- input输入框组件@click事件在支付宝小程序端无效，处理:使用@input或者在外层添加@click事件
- 支付宝小程序picker组件子元素只支持view标签，处理:不放其他标签或者使用uni-popup组件

>#### 其他问题
 - 路由 小程序页面栈最多只能有10层，所以有的页面在跳转时不要直接跳转，使用返回或者跳转代替之前的页面，不要嵌套太多层
 - tab栏如果有页面链接地址一样的，多余的在安卓端不显示
 - package.json配置文件不能有注释！！
 - 文件名和文件夹名不能有@

-----
>##### APP.vue的onLaunch与首页onLoad(created)的问题：
并不是执行完onLaunch再执行onLoad，如果onLaunch有异步函数（例如小程序进入获取用户信息），会出现先执行完onLoad再执行onLaunch的异步函数的情况
  
**解决办法：1.异步函数执行完数据存入store，在onLoad页面watch这个数据，触发watch再执行操作。**
````
const store = new Vuex.Store({
    state: {
		name:'未登录',
		certNo:''
	},
    mutations: {},
    actions: {}
})

//APP.vue 获取用户信息存入store和缓存
	getUserInfo(accessToken) {
		this.$api.getUserInfo({
	    data: {
		accessToken: accessToken
	    },
	    success: res => {
		if (res.name) {
		    uni.setStorageSync('name', res.name);
		    this.$store.state.name = res.name
		}
		if (res.certNo) {
		    uni.setStorageSync('certNo', res.certNo);
		    this.$store.state.certNo = res.certNo
		        }
			}
		});
	}
		
//home.vue 首页监听store数据，异步函数执行完再从缓存取数据而不会出现缓存还为空的情况		
	computed: {
	    name:{
	        get(){
	            return this.$store.state.name
            },
	    set(){}
	    },
        certNo:{
            get(){
                return this.$store.state.certNo
	        },
			set(){}
	    }
	},
	watch:{
	    name(val,oldVal){
			this.name = uni.getStorageSync('name')			
	     },
		certNo(){
			this.certNo = uni.getStorageSync('certNo')
		}
	},
```
**2.使用promise特性与全局函数**
```
//APP.vue的全局函数
test(){
	return new Promise((resolve,reject)=>{
		this.getAccessToken(resolve)
	})
}
getAccessToken(resolve){
   success:res=>{
        //your code
        resolve()
   }
}

//home.vue 
created() {
		getApp().test().then(res=>{
			if(uni.getStorageSync('name')){
				this.name = uni.getStorageSync('name')
			}
			if(uni.getStorageSync('certNo')){
				this.certNo = uni.getStorageSync('certNo').replace(/^(.{3})(?:\d+)(.{3})$/, '\$1*********\$2');	
			}
		})
	}
```
-----    
>#### 父组件传正则表达式到子组件，微信小程序端正则表达式变成了object对象
    写组件时遇到一个坑，父组件传一个正则表达式到子组件进行表单验证，H5端正常；在小程序端会变成object对象，导致无法验证，目前想到的方法就是先传一个字符串到子组件，再转成reg类型，比如
```
//父组件,为了处理小程序正则由父组件传到子组件而变成object类型的坑，先传字符串过来
pattern:'^[0-9]+$'

//子组件
const pattern = new RegExp(this.pattern)
```

>#### input组件@input在H5端数据更新不及时(微信、支付宝正常)，导致实时搜索功能异常
    处理:使用setTimout
```
handleInput(){
//处理H5端input数据更新不及时
setTimeout(()=>{
//your code
    },0)
},
```

>#### 选择文件的问题
选择文件的问题，uniapp api只支持调取图片/视频文件管理器，而没有调起整个文件管理器的方法，而input的type=‘file’在uniapp里面也无效，其他小程序端例如微信、支付宝也没有对应的调起文件管理器的方法。
        统一处理办法:使用web-view组件，web-view组件是一个web浏览器组件，可以用来承载网页的容器，会自动铺满整个页面，通常是一个html文件，可以使用原生的input标签，但是除了APP、H5端支持本地html文件，其余小程序端只支持加载网络的web-view地址，而且web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url 。web-view:https://uniapp.dcloud.io/component/web-view。也可用于跳转到其他H5页面的需求。

**首先需要创建一个承载web-view标签的页面,例如webview.vue**
```
/*
当使用本地的webview
1.仅在APP、H5端可使用
2.web-view中的src便是我们在app应用中嵌入的H5页面路径，而且一般情况下用hybrid文件名(uniapp不会编译这个文件夹里面的文件)
3.@message不支持H5，使用监听message事件
*/
<template>
    <view>
		<web-view src="/hybrid/html/index.html"></web-view>
	</view>
	<script>
	    window.addEventListener('message',function(e){
	        console.log('接收到消息',e);
	    });
	</script>
</template>
```
```
/*
当使用网络的webview
1.在小程序端使用
2.需要配置这个跳转页面进入各小程序白名单
3.监听@message事件
*/
<template>
    <view>
		<web-view src="http://****" @message="handleMessage"></web-view>
	</view>
	<script>
        methods: {
			handleMessage(event){
				console.log('接收到消息',event.detail.data)
			}
		}
    </script>
</template>
```
**webview-view标签链接的html页面**
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
	</head>
	<body>
		<form action="" method="post">
		    <a href="javascript:;" class="file">选择文件
		        <input type="file" name="uploadFile" id="uploadFile" >
		    </a>
		</form>
	</body>
	<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js"></script>
	<script type="text/javascript">
		document.addEventListener('UniAppJSBridgeReady', function() {
			console.log("初始化uniapp的API成功");
		    document.getElementById('uploadFile').addEventListener('change',function(e){
		    	uni.postMessage({
		    	    data: {
		    			 action: e  /*传输数据*/
		    		}
		    	});
		    })
		});
		 
	</script>
</html>
```
**H5端的一个处理方法：动态添加input标签**
```
// #ifdef H5
let input = document.createElement('input')
input.setAttribute('type','file')
let container = document.getElementById('info')
container.appendChild(input)
// #endif
```
    

