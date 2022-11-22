import { useKeycloak } from "@react-keycloak/web";
import { Redirect, Route } from "react-router-dom";
import { paths } from "../constants";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  console.log("public", keycloak.authenticated);

  const isAuth = !!keycloak.authenticated;

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Redirect to={paths.main} /> : <Component {...props} />)}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  console.log("private", keycloak.authenticated);

  const isAuth = !!keycloak.authenticated;

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={paths.login} />)}
    />
  );
};
