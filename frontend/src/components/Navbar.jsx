import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, isAdmin }) => {
  return (
    <>
      {isLoggedIn && (
        <div className="navbar1">
          <div className="navbar-elements">
            <Link to={"/login"}>
              <button className="btn-navbar">Logout</button>
            </Link>
            <Link to={"/actors"}>
              <button className="btn-navbar">Actors</button>
            </Link>
            <Link to={"/movies"}>
              <button className="btn-navbar">Movies</button>
            </Link>
            {/* )} */}
            {!isAdmin && (
              <Link to={"/user"}>
                <button className="btn-navbar">My page</button>
              </Link>
            )}
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className="navbar1">
          <Link to={"/register"}>
            <button className="btn-navbar">Register</button>
          </Link>
          <Link to={"/login"}>
            <button className="btn-navbar">Login</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
