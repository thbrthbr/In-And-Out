import React from "react";
import { Navigate } from "react-router-dom";
import { useStore2 } from "../../store/store.js";

const PublicRoute = ({ children }) => {
  const { logState, setLogState } = useStore2();
  return logState ? <Navigate to="/" /> : children;
};

export default PublicRoute;
