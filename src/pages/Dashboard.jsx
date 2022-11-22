import { useKeycloak } from "@react-keycloak/web";

export const Dashboard = () => {
  const { keycloak } = useKeycloak();

  const handleClickLogout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <h1>Cis Dashboard</h1>

      <button onClick={handleClickLogout}>Logout</button>
    </div>
  );
};
