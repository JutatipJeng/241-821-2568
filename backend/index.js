// ทำการ import โมดูลที่จำเป็น
const http = require('http');
const host = 'localhost';
const port = 8000;

const requestlistener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!');
}

const server = http.createServer(requestlistener);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});