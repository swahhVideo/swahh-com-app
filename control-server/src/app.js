const http = require("node:http");
const { handleHealthCheck } = require("./routes/health");
const { handleInfrastructureStatus } = require("./routes/infrastructure");

function createApp() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://control-server.local");

    if (request.method === "GET" && url.pathname === "/health") {
      handleHealthCheck(response);
      return;
    }

    if (request.method === "GET" && url.pathname === "/infrastructure/status") {
      handleInfrastructureStatus(response);
      return;
    }

    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
  });
}

module.exports = { createApp };
