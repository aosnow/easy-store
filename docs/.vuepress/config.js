// ------------------------------------------------------------------------------
// name: config
// author: mudas( mschool.tech )
// created: 2021/2/25 10:36
// ------------------------------------------------------------------------------

const pkg = require('../../package.json');

module.exports = {
  // 如果你的网站部署到非根 URL，则需要在 .vuepress/config.js 中设置 base 选项。
  // 例如，如果你打算将你的网站部署到 https://foo.github.io/bar/，那么base应该设置为 "/bar/"（它应该始终以斜杠开始和结束）
  // 参考：http://caibaojian.com/vuepress/guide/assets.html#基准-url
  base: '/easy-store/',

  title: `${pkg.name}<v${pkg.version}>`,
  description: pkg.description,

  cache: false,

  theme: '@vuepress/default',
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    smoothScroll: true,
    nav: [
      { text: '首页', link: './' },
      { text: '指南', link: './guide' },
      { text: 'Github', link: 'https://github.com/aosnow/easy-store', target: '_blank' }
    ],

    sidebar: [
      ['./guide', '快速上手指南'],
      ['./easy-store', 'Easy Store'],
      {
        title: '其它工具',
        path: './namespace',
        children: [
          ['./namespace', 'namespace types 工具'],
          ['./increment', 'increment 增量保存工具'],
          ['./merge', 'Store 模块合并工具']
        ]
      }
    ]
  }
};
