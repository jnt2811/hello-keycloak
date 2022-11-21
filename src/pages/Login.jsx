import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";

const Login = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login({
        redirectUri: window.location.origin,
      });

      window.opener.postMessage("LOGIN SUCCESS");
    }
  }, []);

  return <></>;
};

export default Login;

// http://localhost:8080/auth/realms/deepcare/protocol/openid-connect/auth?client_id=api-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A5173&state=9f217fc0-87f1-4596-a7f0-f9158d2a6a94&response_mode=fragment&response_type=code&scope=openid&nonce=55e643e0-91d4-46a3-bb50-24e755c59fe6

// http://localhost:8080/auth/realms/deepcare/protocol/openid-connect/auth?client_id=api-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A5173&state=57284aec-6d75-4c07-9c08-5ded4e801906&response_mode=fragment&response_type=code&scope=openid&nonce=7c23efa7-8206-491e-98d0-fe7afa7b9b15
