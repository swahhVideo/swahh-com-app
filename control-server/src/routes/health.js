function handleHealthCheck(response) {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ status: "ok", service: "control-server" }));
}

module.exports = { handleHealthCheck };
