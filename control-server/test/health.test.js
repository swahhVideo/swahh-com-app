const assert = require("node:assert/strict");
const test = require("node:test");
const { createApp } = require("../src/app");

test("GET /health returns server status", async () => {
  const app = createApp();

  await new Promise((resolve) => app.listen(0, "127.0.0.1", resolve));

  const { port } = app.address();
  const response = await fetch(`http://127.0.0.1:${port}/health`);
  const body = await response.json();

  app.close();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    status: "ok",
    service: "control-server"
  });
});
