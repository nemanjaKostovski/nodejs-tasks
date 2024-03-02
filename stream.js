const { Readable } = require('stream');

async function readableToString2(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const readable = Readable.from('Good morning!', { encoding: 'utf8' });
assert.equal(readableToString2(readable), 'Good morning!');
