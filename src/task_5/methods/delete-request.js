const path = require('node:path');
const writeToFile = require('../utils/write-to-file');

module.exports = (req, res) => {
  let userId = path.basename(req.url);
  let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  //regex that checks for uuid
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!regexV4.test(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Validation Failed',
        message: 'UUID is not valid',
      })
    );
  } else if (baseUrl == '/api/users/' && regexV4.test(userId)) {
    const index = req.users.findIndex((user) => {
      return user.user.id == userId;
    });
    if (index == -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: 'Not Found',
          message: `User with id ${userId} doesn't exist`,
        })
      );
      res.end();
    } else {
      req.users.splice(index, 1);
      writeToFile(req.users);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(req.users));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
  }
};
