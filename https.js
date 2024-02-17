const https = require('https');
const fs = require('fs');
const { error } = require('console');

https
  .get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(JSON.parse(data));
    });
  })
  .on('error', (error) => {
    console.log('Error: ' + error.message);
  });

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const port = 4000;

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello world');
});

server.listen(port, () => {
  console.log(`Server running 🚀 at https://localhost:${port}`);
});
