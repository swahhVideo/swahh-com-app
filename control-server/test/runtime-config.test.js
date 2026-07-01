const assert = require("node:assert/strict");
const test = require("node:test");
const { readRuntimeConfig } = require("../src/config/runtime-config");

test("readRuntimeConfig returns safe local defaults", () => {
  const config = readRuntimeConfig({});

  assert.deepEqual(config, {
    host: "127.0.0.1",
    port: 3000,
    nodeEnv: "development"
  });
});

test("readRuntimeConfig reads explicit control server values", () => {
  const config = readRuntimeConfig({
    CONTROL_SERVER_HOST: "0.0.0.0",
    CONTROL_SERVER_PORT: "8080",
    NODE_ENV: "production"
  });

  assert.deepEqual(config, {
    host: "0.0.0.0",
    port: 8080,
    nodeEnv: "production"
  });
});

test("readRuntimeConfig rejects invalid ports", () => {
  assert.throws(
    () => readRuntimeConfig({ CONTROL_SERVER_PORT: "99999" }),
    /CONTROL_SERVER_PORT/
  );
});
