const http = require('node:http');
const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const patchReq = require('./methods/patch-request');
const deleteReq = require('./methods/delete-request');
let users = require('./data/users.json');

const port = 8000;

const server = http.createServer((req, res) => {
  req.users = users;
  switch (req.method) {
    case 'GET':
      getReq(req, res);
      break;
    case 'POST':
      postReq(req, res);
      break;
    case 'PATCH':
      patchReq(req, res);
      break;
    case 'DELETE':
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(
        JSON.stringify({ title: 'Not Found', message: 'Route not found' })
      );
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
