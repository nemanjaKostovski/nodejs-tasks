const requestBodyParser = require('../utils/body-parser');
const writeToFile = require('../utils/write-to-file');

module.exports = async (req, res) => {
  let userId = req.url.split('/')[3];
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
  } else {
    try {
      let body = await requestBodyParser(req);
      const index = req.users.findIndex((user) => user.user.id === userId);
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: 'Not Found', message: 'User not found' })
        );
        res.end();
      } else {
        const user = req.users[index].user;
        const existingHobbies = user.hobbies || [];
        const newHobbies = body.hobbies || [];

        // Add new hobbies to existing ones
        const updatedHobbies = [
          ...new Set([...existingHobbies, ...newHobbies]),
        ];

        // Update the hobbies of the user
        user.hobbies = updatedHobbies;
        writeToFile(req.users);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            data: { user },
            error: null,
          })
        );
      }
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
  }
};
