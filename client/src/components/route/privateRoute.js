import React from "react";
import { Navigate } from "react-router-dom";
import { useStore2 } from "../../store/store.js";

const PrivateRoute = ({ children }) => {
  const { logState } = useStore2();
  return !logState ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
