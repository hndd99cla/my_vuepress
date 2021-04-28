/*
 * @Description:
 * @Version: 0.1
 * @Autor: lzx
 * @Date: 2021-04-06 14:59:43
 */
module.exports = {
  title: 'lzx博客',
  description: '哈哈哈哈哈哈哈',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: '我的博客', link: '/posts/uniapp' }, // 内部链接 以docs为根目录
      { text: '我的组件', link: '/components/左右拉动组件' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/hndd99cla' }
        ]
      }
    ],
    sidebar: {
      // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
      '/posts/': [
        {
          title: 'uniapp',
          children: [
            '/posts/uniapp',
            '/posts/uniapp编译成小程序访问不到组件',
            '/posts/uniapp各端差异'
          ]
        },
        {
          title: 'css',
          children: [
            '/posts/梯形斜边弧度tab_css实现',
            '/posts/footer位置的自动适配',
          ]
        },
        {
          title: 'js',
          children: [
            '/posts/ES6 常用语法',
            '/posts/121501',
            '/posts/判断url图片是否404',
            '/posts/ajax返回blob封装'
          ]
        }

      ],
      '/components/': [
        {
          title: '我的组件',
          children: [
            '/components/左右拉动组件'
            // 上面地址查找的是：docs>accumulate>JS>test.md 文件
            // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
          ]
        }
      ]
    }
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}