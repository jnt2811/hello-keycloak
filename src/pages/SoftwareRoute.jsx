import { useKeycloak } from "@react-keycloak/web";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { paths } from "../constants";

export const SoftwareRoute = () => {
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const { tokens } = useSelector((state) => state.auth);
  const module = tokens.info.module;

  const handleClickLogout = () => {
    keycloak.logout();
  };

  const handleGoToCis = () => history.push(paths.cis);

  const handleGoToLis = () => (window.location.href = "https://lis.dev.deepcare.vn");

  if (module.length === 1) {
    if (module[0] === "CIS") {
      return <Redirect to={paths.cis} />;
    } else if (module[0] === "LIS") {
      handleGoToLis();
      return <></>;
    }
  }

  console.log("[INFO] Software Routing", tokens);

  return (
    <div>
      <h1>Software route</h1>

      <button onClick={handleClickLogout}>Logout</button>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={handleGoToCis}>Go to CIS</button>

        <button onClick={handleGoToLis}>Go to LIS</button>
      </div>

      <br />

      <div>
        Token: <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </div>
    </div>
  );
};
