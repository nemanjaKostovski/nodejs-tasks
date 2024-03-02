const requestBodyParser = require('../utils/body-parser');
const writeToFile = require('../utils/write-to-file');

module.exports = async (req, res) => {
  if (req.url == '/api/users') {
    try {
      let body = await requestBodyParser(req);
      const emailExists = req.users.some(
        (user) => user.user.email === body.email
      );
      if (emailExists) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            title: 'Conflict',
            message: 'User with this email already exists',
          })
        );
        return; // Exit the function here
      }

      let userId = crypto.randomUUID();
      let userData = {
        user: {
          id: userId,
          name: body.name,
          email: body.email,
        },
        links: {
          self: `/api/users/${userId}`,
          hobbies: `/api/users/${userId}/hobbies`,
        },
      };
      req.users.push(userData);
      writeToFile(req.users);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          title: 'Validation Failed',
          message: 'Request body is not valid',
        })
      );
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
  }
};
