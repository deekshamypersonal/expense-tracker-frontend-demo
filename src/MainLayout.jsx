import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = ({ onLogout }) => {
  return (
    <div>
      {/* <NavBar onLogout={onLogout} /> */}
      <NavBar onLogout={onLogout} />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  content: {
    padding: "0px",
  },
};

export default MainLayout;
