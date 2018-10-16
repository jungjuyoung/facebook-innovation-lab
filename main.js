// nodejs에 기본적으로 가지고 있는 기능 중에서 http 모듈을 가져와;
const http = require('http');
const url = require('url');
const server = http.createServer(
    function(request, response) {
        if(request.url == '/favicon.ico') {
            return response.writeHead(404);
        }
        const parsed_url = url.parse(request.url, true);
        let id = parsed_url.query.id;
        let constents = parsed_url.query.constents
        let content = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>facebook Innovation Lab to Web</title>
        </head>
        <body>
            <h1>HTML</h1>
            <ol>
                <li><a href="/?id=html">html</a></li>
                <li><a href="/?id=css">css</a></li>
                <li><a href="/?id=javascript">javascript</a></li>
            </ol> 
            <h2>${id}</h2>
            ${constents}
            <script src=""></script>
        </body>
        </html>`;
        response.write(content);
        response.end();
    }
);
server.listen(8000);