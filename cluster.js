const cluster = require('cluster');
const http = require('http');
const os = require('os');

const port = 6006;

const requestHandler = (request, response) => {
  response.writeHead(200);
  if (request.url === '/error') {
    throw new Error('Oh no!');
  } else {
    response.end(
      `<h1 style="text-align:center;margin-top:40px;">It runs ^#128640</h1>`
    );
    process.send({ cmd: 'notifyRequest' });
  }
};

const server = http.createServer(requestHandler);

console.log(
  `✅ ${
    cluster.isPrimary
      ? 'I am Primary'
      : `I am worker, my id is ${cluster.worker.id}`
  }`
);

// Check is cluster primary or not
if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork(); // Forks worker for each CPU core
  }
}
