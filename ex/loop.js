// loop + array
// let topics = ['HTML5', 'CSS3','Javscript'];
const fs = require('fs'); // 노드에 있는 파일시스템 모듈을 가져와;
let filelist = fs.readdirSync('data');
// let listTag = '';
console.log(`filelist: ${filelist}`);

let topics = fs.readdirSync('data');

topics.map((a, i, ar) => {
    console.log(`<li><a href="/?id=${a}">${a}</a></li>`);
})
