const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

const args = process.argv.slice(2);
const URL = args[0];
const localFilePath = args[1];

const writeToFile = function(body) {
  fs.writeFile(`${localFilePath}`, body, error => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
  });
};

request(URL, (error, response, body) => {
  if (error) {
    console.log(`${URL} is invalid, terminating application.`);
    return;
  }
  let fileExists = fs.existsSync(localFilePath);
  if (!fileExists) {
    writeToFile(body);
  } else {
    rl.question("File already exists. Please type Y if you would like to overwrite it \n", (answer) => {
      if (answer.toUpperCase() === 'Y') {
        writeToFile(body);
      }
      rl.close();
    });
  }
});