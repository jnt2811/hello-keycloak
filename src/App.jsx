import { useKeycloak } from "@react-keycloak/web";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthProvider, status, useAuth } from "./authContext";
import Home from "./pages/Home";
import { LoginSuccess } from "./pages/LoginSuccess";

const PrivateOutlet = ({ children }) => {
  const { keycloak } = useKeycloak();
  const { authStatus, authInfo } = useAuth();

  // if (authStatus === status.pending) return <div>Authenticating...</div>;

  if (authStatus === status.fail) return <Navigate to="/" replace />;

  const handleClickLogout = () => {
    keycloak.logout();
  };

  return (
    <>
      <button onClick={handleClickLogout}>Logout</button>

      <br />
      <br />

      {children}

      <br />

      <pre>{JSON.stringify(authInfo, null, 2)}</pre>
    </>
  );
};

const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateOutlet>
            <Dashboard />
          </PrivateOutlet>
        ),
      },
    ],
  },
  {
    path: "/authenticated",
    element: <LoginSuccess />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<div>Loading suspense...</div>}>
          <RouterProvider router={router} fallbackElement={<div>Loading router provider...</div>} />
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
