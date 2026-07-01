function readRuntimeConfig(env = process.env) {
  const host = env.CONTROL_SERVER_HOST || env.HOST || "127.0.0.1";
  const portValue = env.CONTROL_SERVER_PORT || env.PORT || "3000";
  const port = Number.parseInt(portValue, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("CONTROL_SERVER_PORT must be an integer between 1 and 65535.");
  }

  return {
    host,
    port,
    nodeEnv: env.NODE_ENV || "development"
  };
}

module.exports = { readRuntimeConfig };
