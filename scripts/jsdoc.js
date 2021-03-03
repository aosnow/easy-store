// ------------------------------------------------------------------------------
// name: jsdoc
// author: mudas( mschool.tech )
// created: 2021/2/25 11:30
// ------------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

const PATH_DOC = resolve('../docs/');
const libPath = resolve('../packages');

const template = `{{>main}}`;
const dir = fs.readdirSync(libPath, { withFileTypes: true });
const exclude = ['index', 'debug'];

// 生成单独的工具 API 文件
dir.forEach(file => {
  const fileData = path.parse(file.name);
  const realpath = path.resolve(libPath, file.name);

  if (exclude.indexOf(fileData.name) !== -1) return;

  jsdoc2md.render({
    files: realpath,
    template
  }).then(data => {
    fs.writeFile(`${PATH_DOC}/${fileData.name}.md`, data, (err) => {
      if (err) throw err;
    });
  });
});

jsdoc2md.clear();

// 生成 guide 导航页
const guideGroup = require('../docs/.vuepress/config').themeConfig.sidebar;
let guideData = fs.readFileSync(`${PATH_DOC}/.vuepress/template/guide.md`, 'utf-8');
guideData += `
## 目录\n`;
guideGroup.forEach(item => {
  guideData += genLinkList(item) + '\n';
});

fs.writeFile(`${PATH_DOC}/guide.md`, guideData, (err) => {
  if (err) throw err;
});

// 生成首页
let homeData = fs.readFileSync(`${PATH_DOC}/.vuepress/template/readme.md`, 'utf-8');
fs.writeFile(`${PATH_DOC}/README.md`, homeData, (err) => {
  if (err) throw err;
});

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

function genLinkList(item) {
  if (typeof item === 'string') {
    return `- [${item}](${item})`;
  }
  else if (Array.isArray(item)) {
    return `- [${item[1]}](${item[0]})`;
  }
  else if (Array.isArray(item.children)) {
    return `### ${item.title}\n${item.children.map(childItem => `${genLinkList(childItem)}`).join('\n')}`;
  }
}
