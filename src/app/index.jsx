import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes";
import { paths } from "../constants";
import { Dashboard, HomeLogin, LoginSuccess, NotFound, SoftwareRoute } from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doCheckUser } from "../ducks/slices/authSlice";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.authenticated} component={LoginSuccess} />
        <PublicRoute exact path={paths.login} component={HomeLogin} />

        <PrivateRoute exact path={paths.software_route} component={SoftwareRoute} />

        <PrivateRoute path={paths.cis} component={CisRoute} />

        <Redirect exact from={paths.main} to={paths.software_route} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

const CisRoute = () => {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { user, tokens } = authReducer;

  useEffect(() => {
    if (!user && !!tokens) {
      dispatch(doCheckUser(tokens));
    }
  }, [dispatch, tokens, user]);

  console.log("[INFO] CIS ROUTE", user, tokens);

  if (!user) return <div>Initializing user information...</div>;

  return (
    <>
      <Switch>
        <Route exact path={paths.dashboard} component={Dashboard} />

        <Redirect exact from={paths.cis} to={paths.dashboard} />

        <Route component={NotFound} />
      </Switch>

      <br />

      <div>
        User: {!!user ? <pre>{JSON.stringify(user, null, 2)}</pre> : "Initializing user..."}
      </div>
    </>
  );
};
