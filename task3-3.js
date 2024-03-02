const fs = require('fs');
const csvtojson = require('csvtojson');

const csvFilePath = './csv/example.csv'; // Path to your CSV file
const txtFilePath = './output.txt'; // Path to the output TXT file

const inputStream = fs.createReadStream(csvFilePath);
const outputStream = fs.createWriteStream(txtFilePath);

inputStream.on('error', (err) => {
  console.error('Error reading CSV file:', err);
});

outputStream.on('error', (err) => {
  console.error('Error writing to TXT file:', err);
});

const csvConverter = csvtojson()
  .fromStream(inputStream)
  .subscribe(
    (jsonObj) => {
      const jsonString = JSON.stringify(jsonObj) + '\n';
      outputStream.write(jsonString);
    },
    (err) => {
      console.error('Error converting CSV to JSON:', err);
    },
    () => {
      console.log('CSV to JSON conversion completed.');
      outputStream.end();
    }
  );
