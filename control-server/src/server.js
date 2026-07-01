const { createApp } = require("./app");
const { readRuntimeConfig } = require("./config/runtime-config");

const { host, port } = readRuntimeConfig();
const app = createApp();

app.listen(port, host, () => {
  console.log(`Control Server laeuft auf http://${host}:${port}`);
});
