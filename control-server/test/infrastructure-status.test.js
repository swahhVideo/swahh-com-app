const assert = require("node:assert/strict");
const test = require("node:test");
const { createApp } = require("../src/app");
const { createInfrastructureStatus } = require("../src/config/infrastructure-status");

const completeEnvironment = {
  PUBLIC_APP_URL: "https://swahh.com",
  CONTROL_SERVER_URL: "https://api.swahh.com",
  CDN_BASE_URL: "https://cdn.swahh.com",
  UPLOADS_BASE_URL: "https://uploads.swahh.com",
  GITHUB_REPOSITORY: "swahhVideo/swahh-com-app",
  GITHUB_BRANCH: "main",
  DOMAIN_NAME: "swahh.com",
  DNS_PROVIDER: "spaceship.com",
  IDRIVE_E2_ENDPOINT: "https://s3.us-west-2.idrivee2.com",
  IDRIVE_E2_REGION: "us-west-2",
  IDRIVE_E2_MEDIA_BUCKET: "swahh-media",
  IDRIVE_E2_PRIVATE_BUCKET: "swahh-private",
  IDRIVE_E2_ACCESS_KEY_ID: "access-key",
  IDRIVE_E2_SECRET_ACCESS_KEY: "secret-key",
  SALAD_ORGANIZATION_NAME: "swahhvideo",
  SALAD_PROJECT_NAME: "default",
  SALAD_CONTAINER_GROUP_NAME: "swahh-transcoder",
  SALAD_API_KEY: "salad-key"
};

test("createInfrastructureStatus reports incomplete services", () => {
  const status = createInfrastructureStatus({
    GITHUB_REPOSITORY: "swahhVideo/swahh-com-app"
  });

  assert.equal(status.status, "incomplete");
  assert.equal(status.services.find((service) => service.service === "github").configured, false);
});

test("createInfrastructureStatus reports configured services", () => {
  const status = createInfrastructureStatus(completeEnvironment);

  assert.equal(status.status, "configured");
  assert.equal(status.services.every((service) => service.configured), true);
});

test("createInfrastructureStatus marks secrets without exposing values", () => {
  const status = createInfrastructureStatus(completeEnvironment);
  const idriveService = status.services.find((service) => service.service === "idriveE2");
  const secret = idriveService.variables.find(
    (variable) => variable.key === "IDRIVE_E2_SECRET_ACCESS_KEY"
  );

  assert.deepEqual(secret, {
    key: "IDRIVE_E2_SECRET_ACCESS_KEY",
    configured: true,
    sensitive: true
  });
});

test("GET /infrastructure/status returns integration status", async () => {
  const app = createApp();

  await new Promise((resolve) => app.listen(0, "127.0.0.1", resolve));

  const { port } = app.address();
  const response = await fetch(`http://127.0.0.1:${port}/infrastructure/status`);
  const body = await response.json();

  app.close();

  assert.equal(response.status, 200);
  assert.equal(body.status, "incomplete");
  assert.equal(Array.isArray(body.services), true);
});
