import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { status, useAuth } from "../authContext";

const Home = () => {
  const { keycloak } = useKeycloak();
  const keyCloakWindow = useRef();
  const { authStatus, setAuthStatus, authInfo } = useAuth();

  const handleClickLogin = () => {
    const WIDTH = 800;
    const HEIGHT = 600;

    const TOP = window.top.outerHeight / 2 + window.top.screenY - HEIGHT / 2;
    const LEFT = window.top.outerWidth / 2 + window.top.screenX - WIDTH / 2;

    const loginUrl = keycloak.createLoginUrl({
      redirectUri: window.location.origin + "/authenticated",
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
      // setAuthStatus(status.success);
      keycloak.login();
    }
  };

  useEventListener("message", handleMessage, window);

  // if (authStatus === status.pending) return <div>Authenticating...</div>;

  return (
    <div>
      <h1>Home</h1>

      {authStatus === status.success ? (
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={() => keycloak.logout()}>Logout</button>

          <Link to="/dashboard">
            <button>Go to dashboard</button>
          </Link>
        </div>
      ) : (
        <button onClick={handleClickLogin}>Login</button>
      )}

      <pre>{JSON.stringify(authInfo, null, 2)}</pre>
    </div>
  );
};

export default Home;

// Hook custom sự kiện
export const useEventListener = (
  eventName,
  handler,
  element = window,
  condition = true,
  delay = 100
) => {
  const savedHandler = useRef(); // ref chứa hàm xử lý

  useEffect(() => {
    savedHandler.current = handler; // lưu hàm xử lý vào ref
  }, [handler]);

  useEffect(() => {
    // kiểm tra có thể khởi tạo sự kiện lắng nghe event
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);

    if (!!condition) {
      // điều kiện sử dụng hàm lắng nghe sự kiện
      setTimeout(() => {
        element.addEventListener(eventName, eventListener);
      }, delay);
    } else {
      element.removeEventListener(eventName, eventListener);
    }
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, element, condition]);
};
