
import React, { useContext, useState } from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import NavbarAfterAuth from "../navbarAfterAuth/NavbarAfterAuth";
import { userContext } from "../../Context/User.context";
export default function Layout() {
  
const { token } = useContext(userContext);
  return (
    <>
      {token ? <NavbarAfterAuth /> : <Navbar />}

      <div>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}


