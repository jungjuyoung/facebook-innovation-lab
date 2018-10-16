const http = require('http');// nodejs에 기본적으로 가지고 있는 기능 중에서 http 모듈을 가져와;
const url = require('url');// url에 기본적으로 가지고 있는 모듈을 가져와;
const fs = require('fs');// fs파일 시스템 모듈 가져와;
const server = http.createServer(
    function(request, response) {
        if(request.url == '/favicon.ico') {
            return response.writeHead(404);
        }
        const parsed_url = url.parse(request.url, true);
        let id = '';
        let contents = '';
        // request.url의 값이 /일때
        // id의 값은 Welcome으로 하고 
        // contents의 값은 hello, web으로 한다.
        // request.url의 값이 /이 아닐떄
        if(request.url === '/') {
            id = 'Welcome';
            contents = 'Hello, web';
        }else{
            id = parsed_url.query.id;
            contents = fs.readFileSync(`data/${id}.html`, 'utf8');
        }
        console.log(`id: ${id}`);
        console.log(`contents: ${contents}`);
        let content = `<!DOCTYPE html>
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
                <li><a href="/?id=html">html</a></li>
                <li><a href="/?id=css">css</a></li>
                <li><a href="/?id=javascript">javascript</a></li>
            </ol> 
            <h2>${id}</h2>
            ${contents}
        </body>
        </html>`;
        response.write(content);
        response.end();
    }
);
server.listen(8000); 