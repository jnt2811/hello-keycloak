import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  // url: "http://localhost:8080/auth",
  url: "https://keycloak.dev.deepcare.vn/",
  realm: "Deepcare",
  clientId: "api-gateway",
});

export default keycloak;
