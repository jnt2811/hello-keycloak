import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://keycloak.dev.deepcare.vn/",
  realm: "Deepcare",
  clientId: "api-gateway",
});

export default keycloak;
