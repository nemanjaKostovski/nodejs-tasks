const http = require('http');
const fs = require('fs');

const port = 4000;

const server = http.createServer((req, res) => {
  fs.readFile('page.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);

    return res.end();
  });
});

fs.appendFile('mushroomList.txt', 'Champignon', (err) => {
  if (err) throw err;
  console.log('Saved!');
});

server.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}/`);
});
