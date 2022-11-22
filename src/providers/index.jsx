import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import { KeycloakProvider } from "./KeycloakProvider";

export const Providers = ({ children }) => {
  return (
    //<ReduxProvider>
    <KeycloakProvider>{children}</KeycloakProvider>
    //</ReduxProvider>
  );
};
