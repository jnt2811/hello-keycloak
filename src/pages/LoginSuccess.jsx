import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const DEPLAY_CLOSE = 1000;

export const LoginSuccess = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    setTimeout(() => {
      window.opener.postMessage("LOGIN SUCCESS");
    }, DEPLAY_CLOSE);
  }, []);

  return (
    <div>
      {!!keycloak.authenticated
        ? "You are authenticated! Returning to main page..."
        : "You are not authenticated! Returning to login page..."}
    </div>
  );
};
