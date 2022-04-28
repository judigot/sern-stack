/*************************************************************************
 * DON'T MIX NODE.JS AND WEB JAVASCRIPT (WEBPACK CAN'T BUNDLE SEQUELIZE) *
 *************************************************************************/
import React from "react";
import ReactDOM from "react-dom/client";

import { LoginForm } from "components/LoginForm";

ReactDOM.createRoot(document.getElementById("loginForm")!).render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>
);
