const INFRASTRUCTURE_SERVICES = Object.freeze({
  app: {
    label: "Swahh App",
    requiredKeys: ["PUBLIC_APP_URL", "CONTROL_SERVER_URL", "CDN_BASE_URL", "UPLOADS_BASE_URL"]
  },
  github: {
    label: "GitHub",
    requiredKeys: ["GITHUB_REPOSITORY", "GITHUB_BRANCH"]
  },
  spaceship: {
    label: "Spaceship DNS",
    requiredKeys: ["DOMAIN_NAME", "DNS_PROVIDER"]
  },
  idriveE2: {
    label: "IDrive e2",
    requiredKeys: [
      "IDRIVE_E2_ENDPOINT",
      "IDRIVE_E2_REGION",
      "IDRIVE_E2_MEDIA_BUCKET",
      "IDRIVE_E2_PRIVATE_BUCKET",
      "IDRIVE_E2_ACCESS_KEY_ID",
      "IDRIVE_E2_SECRET_ACCESS_KEY"
    ]
  },
  salad: {
    label: "Salad",
    requiredKeys: [
      "SALAD_ORGANIZATION_NAME",
      "SALAD_PROJECT_NAME",
      "SALAD_CONTAINER_GROUP_NAME",
      "SALAD_API_KEY"
    ]
  }
});

const SENSITIVE_INFRASTRUCTURE_KEYS = new Set([
  "IDRIVE_E2_ACCESS_KEY_ID",
  "IDRIVE_E2_SECRET_ACCESS_KEY",
  "SALAD_API_KEY"
]);

function readInfrastructureConfig(env = process.env) {
  return Object.fromEntries(
    Object.values(INFRASTRUCTURE_SERVICES)
      .flatMap((service) => service.requiredKeys)
      .map((key) => [key, env[key] || ""])
  );
}

module.exports = {
  INFRASTRUCTURE_SERVICES,
  SENSITIVE_INFRASTRUCTURE_KEYS,
  readInfrastructureConfig
};
