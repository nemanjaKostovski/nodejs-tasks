const generateETag = require('../utils/generate-ETag');

module.exports = (req, res) => {
  // Extract userId from request URL parameters
  let userId = req.url.split('/')[3];
  console.log('UserID', userId);

  // Find the user by userId
  const user = req.users.find((user) => user.user.id === userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `User with id ${userId} not found` }));
  } else {
    // If user found, return the list of hobbies
    const etag = generateETag(user);
    res.setHeader('ETag', '"' + etag + '"');
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Adding HATEOAS links
    const links = {
      self: req.url,
      user: `/api/users/${userId}`,
    };

    res.end(JSON.stringify({ hobbies: user.user.hobbies, _links: links }));
  }
};
