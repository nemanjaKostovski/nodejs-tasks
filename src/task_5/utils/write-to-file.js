const fs = require('node:fs');
const path = require('node:path');

module.exports = (data) => {
  console.log(data);

  try {
    fs.writeFileSync(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(data),
      'utf-8'
    );
  } catch (error) {
    console.log(error);
  }
};
