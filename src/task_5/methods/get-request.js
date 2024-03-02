const path = require('node:path');
const getUserHobbies = require('./getUserHobbies-request');

module.exports = (req, res) => {
  let userId = path.basename(req.url);
  let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  //regex that checks for uuid
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (req.url == '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.write(JSON.stringify(req.users));

    const links = {
      self: req.url,
    };
    console.log(links);

    res.end(JSON.stringify({ _links: links }));
  } else if (
    req.url.startsWith('/api/users/') &&
    req.url.endsWith('/hobbies')
  ) {
    getUserHobbies(req, res);
  } else if (!regexV4.test(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Validation Failed',
        message: 'UUID is not valid',
      })
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
  }
};
