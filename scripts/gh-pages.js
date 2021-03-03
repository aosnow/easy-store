// ------------------------------------------------------------------------------
// name: gh-pages
// author: mudas( mschool.tech )
// created: 2021/3/2 15:12
// ------------------------------------------------------------------------------

const ghpages = require('gh-pages');
const date = new Date();
const times = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

ghpages.publish(
  './docs/.vuepress/dist',
  {
    // 推送到远程分支，设置成 false 则只进行 commit
    push: true,
    message: `update docs at \`${times}\``,
    function(err) {
      console.log(err);
    }
  }
);
