const fs = require('fs');
const os = require('os');
const childProcess = require('child_process');

function getCommand() {
  if (os.platform() === 'win32') {
    return "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }";
  } else {
    return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
  }
}

function writeToLog(data) {
  const logFilePath = 'activityMonitor.log';

  const logData = `${Date.now()} : ${data}\n`;
  fs.appendFile(logFilePath, logData, (err) => {
    if (err) throw err;
  });
}

function displayTopProcess() {
  const command = getCommand();
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    const processInfo = stdout.trim();
    return processInfo;
  });
}

function main() {
  const refreshRate = 100;
  // Interval for console display
  setInterval(() => {
    console.clear();
    const processInfo = displayTopProcess();
    process.stdout.write(`\r${processInfo}`);
  }, refreshRate);

  const logInterval = 60000;
  // Interval for appending to file every minute
  setInterval(() => {
    const processInfo = displayTopProcess();
    writeToLog(processInfo);
  }, logInterval);
}

main();
