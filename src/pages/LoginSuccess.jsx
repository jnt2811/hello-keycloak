import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "./../constants";

export const LoginSuccess = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      window.opener.postMessage("LOGIN SUCCESS");
    }, 1000);

    setTimeout(() => {
      history.push(paths.main);
    }, 1100);
  }, [history]);

  return <div>Authenticated. Returning to homepage...</div>;
};
