import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  // url: "http://localhost:8080/auth",
  url: "https://keycloak.dev.deepcare.vn/",
  realm: "Deepcare",
  clientId: "api-gateway",
  clientSecret: "2V8jhy3pqgmirwr6tlAncwDdXHNOctCw",
  // onLoad: "check-sso",
  // silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
});

export default keycloak;
