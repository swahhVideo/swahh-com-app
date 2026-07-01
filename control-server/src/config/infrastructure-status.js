const {
  INFRASTRUCTURE_SERVICES,
  SENSITIVE_INFRASTRUCTURE_KEYS,
  readInfrastructureConfig
} = require("./infrastructure-config");

function createServiceStatus(serviceName, serviceConfig, envValues) {
  const variables = serviceConfig.requiredKeys.map((key) => ({
    key,
    configured: Boolean(envValues[key]),
    sensitive: SENSITIVE_INFRASTRUCTURE_KEYS.has(key)
  }));

  return {
    service: serviceName,
    label: serviceConfig.label,
    configured: variables.every((variable) => variable.configured),
    variables
  };
}

function createInfrastructureStatus(env = process.env) {
  const envValues = readInfrastructureConfig(env);
  const services = Object.entries(INFRASTRUCTURE_SERVICES).map(([serviceName, serviceConfig]) =>
    createServiceStatus(serviceName, serviceConfig, envValues)
  );

  return {
    status: services.every((service) => service.configured) ? "configured" : "incomplete",
    services
  };
}

module.exports = {
  createInfrastructureStatus
};
