import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../libs/Keycloak";

export const KeycloakProvider = ({ children }) => {
  return <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>;
};
