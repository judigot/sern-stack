import React from "react";
import ReactDOM from "react-dom";
import { ParentComponent } from "./ParentComponent";

export const Component = (elementID: string) => {
  ReactDOM.render(
    <React.StrictMode>
      <ParentComponent />
    </React.StrictMode>,
    document.getElementById(elementID)
  );
};
