import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../authContext";
import { PrivateRoute, PublicRoute } from "./routes";
import { paths } from "../constants";
import { Dashboard, HomeLogin, LoginSuccess, NotFound } from "../pages";

export const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Switch>
          <Route exact path={paths.authenticated} component={LoginSuccess} />
          <PublicRoute exact path={paths.login} component={HomeLogin} />
          <PrivateRoute path={paths.cis} component={CisRoute} />

          <Redirect exact from={paths.main} to={paths.cis} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

const CisRoute = () => {
  return (
    <Switch>
      <Route exact path={paths.dashboard} component={Dashboard} />

      <Redirect exact from={paths.cis} to={paths.dashboard} />

      <Route component={NotFound} />
    </Switch>
  );
};
