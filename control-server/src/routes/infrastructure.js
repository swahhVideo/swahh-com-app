const { createInfrastructureStatus } = require("../config/infrastructure-status");

function handleInfrastructureStatus(response) {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(createInfrastructureStatus()));
}

module.exports = { handleInfrastructureStatus };
