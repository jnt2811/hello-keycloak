import { ReactKeycloakProvider } from "@react-keycloak/web";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTokens } from "../ducks/slices/authSlice";
import keycloak from "../libs/Keycloak";

export const KeycloakProvider = ({ children }) => {
  const dispatch = useDispatch();

  const handleTokens = (tokens) => {
    if (!!tokens.token) {
      tokens.info = jwtDecode(tokens.token);

      dispatch(updateTokens(tokens));
    }

    // keycloak.clearToken();
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      LoadingComponent="Authenticating..."
      onTokens={handleTokens}
      initOptions={{
        checkLoginIframe: false,
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};
