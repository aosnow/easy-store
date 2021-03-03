// ------------------------------------------------------------------------------
// name: vue.config.js
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2019/4/23 21:00
// ------------------------------------------------------------------------------

const path = require('path');
const DEBUG = process.env.NODE_ENV === 'development';

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

// 排除所有不必要的模块，让宿主环境去安排必要的第三方包
const regexp = /^(core-js)/i;
const externals = DEBUG ? '' : [regexp];

// 配置集合
module.exports = {
  publicPath: DEBUG ? '/' : './',
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: false,

  // 调试配置
  devServer: {
    // 跨域配置
    proxy: {
      // 扫码点餐
      '/smo-api': {
        target: 'http://test.blibao.com:10080',
        // target: 'https://pre-test-api.blibao.com/sweep-api/',
        // target: 'http://pre.test.web.blibao.com:5001',
        changeOrigin: true,
        secure: false
      }
    }
  },

  css: {
    // 强制将所有 css 内容内联
    // 对于 lib 的打包不宜输出独立的 css 文件
    extract: false
  },

  configureWebpack: {
    entry: resolve('src/main.js'),

    // 排除外部库以及不需要打包的 node_modules 第三方包（如使用CDN或引用本地JS库）
    externals
  },

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  // 此处列出 node_modules 中同样需要让 babel 转译的 esm 模块
  transpileDependencies: [
    '@mudas/*'
  ],

  chainWebpack: (config) => {

    // 输出到 dist，而非 dist/static
    config.output.filename('[name].js');

    // 增加资源识别路径（仍然不支持 style="background: url()" 的路径识别）
    // config.module.rule('file').include.add('/demo/assets');

    // 路径别名
    config.resolve.alias.set('@', resolve('src'));

    // 开发阶段的别名
    config.resolve.alias.set('@mudas/store', resolve('packages'));

    // 打包后的测试别名
    // config.resolve.alias.set('@mudas/easy-store', resolve('dist/easy-store.common.js'));

  }
};
