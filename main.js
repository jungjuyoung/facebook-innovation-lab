const http = require('http');// nodejs에 기본적으로 가지고 있는 기능 중에서 http 모듈을 가져와;
const url = require('url');// nodejs에 기본적으로 가지고있는 url 모듈을 가져와;
const fs = require('fs');// nodejs에 기본적으로 가지고 있는 fs파일 시스템 모듈 가져와;
function templateList(){
    let topics = fs.readdirSync('data');
    let listTags = '';

    topics.map((a, i, ar) => {
        listTags += `<li><a href="/?id=${a}">${a}</a></li>`;
    });
    return listTags;
}

function tempalteHTML(_listTags, _id, _contents){
    let constent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>facebook Innovation Lab to Web</title>
        </head>
        <body>
            <h1><a href="/">HTML</a></h1>
            <ol>
                ${_listTags}
            </ol>        
            <h2>${_id}</h2>
            ${_contents}
        </body>
        </html>`;
        return constent;
}
const server = http.createServer ( // http모듈안에 createServer라는 기능으로 서버를 구현
    function(request, response) {
        if(request.url == '/favicon.ico') {
            return response.writeHead(404);
        }
        const parsed_url = url.parse(request.url, true);
        // request.url의 값이 /일때
        // id의 값은 Welcome으로 하고 
        // contents의 값은 hello, web으로 한다.
        // request.url의 값이 /이 아닐떄
        console.log(`request.url: ${request.url}`)
        if(request.url === '/') {
            id = 'Welcome';
            contents = 'Hello, web';
        } else {
            id = parsed_url.query.id;
            contents = fs.readFileSync(`data/${id}`, 'utf8');
        }
        const listTags = templateList();
        const content = tempalteHTML(listTags, id, contents)

        response.write(content);
        response.end();
    }
);
server.listen(8000); 
