import { ReactKeycloakProvider } from "@react-keycloak/web";
import { createContext, useContext, useState } from "react";
import keycloak from "./libs/Keycloak";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const status = {
  pending: "pending",
  success: "success",
  fail: " fail",
};

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(status.pending);
  const [authInfo, setAuthInfo] = useState({});

  const value = { authStatus, setAuthStatus, authInfo, setAuthInfo };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      LoadingComponent={<div>Authenticating...</div>}
      onEvent={(e) => {
        console.log("on event", e);

        if (e === "onReady") {
          setAuthStatus(status.fail);
        }
      }}
      onTokens={(e) => {
        setAuthInfo(e);

        if (!!e.token) setAuthStatus(status.success);
      }}
    >
      <AuthContext.Provider value={value}>
        {authStatus === status.pending ? <div>Loading...</div> : children}
      </AuthContext.Provider>
    </ReactKeycloakProvider>
  );
};
