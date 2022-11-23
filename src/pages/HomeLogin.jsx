import { useKeycloak } from "@react-keycloak/web";
import { useRef } from "react";
import { paths } from "../constants";
import { useEventListener } from "../hooks";

export const HomeLogin = () => {
  const { keycloak } = useKeycloak();
  const keyCloakWindow = useRef();

  const handleClickLogin = () => {
    const WIDTH = 800;
    const HEIGHT = 600;

    const TOP = window.top.outerHeight / 2 + window.top.screenY - HEIGHT / 2;
    const LEFT = window.top.outerWidth / 2 + window.top.screenX - WIDTH / 2;

    const loginUrl = keycloak.createLoginUrl({
      redirectUri: window.location.origin + paths.authenticated,
    });

    keyCloakWindow.current = window.open(
      loginUrl,
      "_blank",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${WIDTH}, height=${HEIGHT}, top=${TOP}, left=${LEFT}`
    );
  };

  const handleMessage = (e) => {
    if (e.data === "LOGIN SUCCESS") {
      console.log("EVENT MSG", e);
      keyCloakWindow.current?.close();
      keycloak.login();
    }
  };

  useEventListener("message", handleMessage, window);

  return (
    <div>
      <h1>Home Login</h1>

      <button onClick={handleClickLogin}>Login</button>
    </div>
  );
};
