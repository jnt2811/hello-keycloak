import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.opener.postMessage("LOGIN SUCCESS");
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 1100);
  }, [navigate]);

  return <div>Authenticated. Returning to homepage...</div>;
};
