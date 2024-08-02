import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import ScrollableTable from "./ScrollableTable.jsx";
import SyncScrollableTable from "./SyncScrollableTable.jsx";
import BasicGrid from "./BasicGrid.jsx";
import Headers from "./Headers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ScrollableTable rows={50} cols={50} /> */}
    {/* <SyncScrollableTable rows={50} cols={50} /> */}
    <BasicGrid />
    {/* <Headers /> */}
  </React.StrictMode>
);
