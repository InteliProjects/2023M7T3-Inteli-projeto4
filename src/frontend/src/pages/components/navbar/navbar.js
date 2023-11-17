import React, { useState } from 'react';
import logo from "../../../assets/logo.svg";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../userSideBar/userSideBar";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img
        src={logo}
        className="logo-home"
        onClick={() => navigate("/Login")}
      ></img>
      <button
        className="account"
        onMouseOver={() => {
          document.querySelector(".navbar button").style.textDecoration =
            "underline";
        }}
        onMouseOut={() => {
          document.querySelector(".navbar button").style.textDecoration =
            "none";
        }}
        onClick={toggleSidebar}
      >
        My Account
      </button>
      {sidebarOpen && <UserSidebar />}{" "}
    </div>
  );
};
export default Navbar;
