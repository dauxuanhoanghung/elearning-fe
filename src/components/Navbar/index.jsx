import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = () => {
  const [showContent, setShowContent] = useState(false);
  const [user, setUser] = useState(null);

  function Toggle() {
    setShowContent(!showContent);
  }

  const [searchInput, setSearchInput] = useState("");

  const handleEnter = (event) => {
    if (event.keyCode === 13 && searchInput.length > 0) {
      history.push(`/search/${searchInput}`);
      setSearchInput("");
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEnter);
    return () => window.removeEventListener("keyup", handleEnter);
  });

  return (
    <div className="navbar">
      <MenuIcon className="navbar__menuIcon" onClick={Toggle} />
      <div className={showContent ? "navbar__hidden" : "hide"}>
        {!user && (
          <>
            <Link to="/login">
              <h3 style={{ marginTop: "15px" }}>Login</h3>
            </Link>
            <Link to="/signup">
              <h3>Sign Up</h3>
            </Link>
          </>
        )}

        {user && (
          <>
            <button className="m-signOut">
              <h3 style={{ marginTop: "15px" }}>Log Out</h3>
            </button>
          </>
        )}
      </div>
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="navbar__logo"
        />
      </Link>
      <p className="navbar__text">Categories</p>
      <input
        type="text"
        placeholder="Search for anything"
        className="navbar__input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <p className="navbar__text navbar__ub">Your Business</p>
      {user && (
        <>
          <button className="navbar__logout">
            <p className="navbar__text navbar__ins">Log-Out</p>
          </button>
          <p className="navbar__text">My learning</p>
          <FavoriteBorderIcon className="navbar__icon navbar__favIcon" />
          <div className="navbar__mediaSet">
            <SearchIcon className="navbar__searchIcon" />
            <ShoppingCartOutlinedIcon className="navbar__icon" />
          </div>
          <NotificationsNoneIcon className="navbar__icon navbar__notificationIcon" />
          <Avatar
            className="navbar__icon navbar__avatar"
            style={{ height: 32, width: 32 }}
          />
        </>
      )}
      {!user && (
        <div className="navbar__user">
          <Link to={`/search/python`}>
            <SearchIcon className="navbar__searchIcon" />
          </Link>
          <ShoppingCartOutlinedIcon className="navbar__icon" />
          <Link to="/login">
            <p className="navbar__login">Log in</p>
          </Link>
          <Link to="/signup">
            <p className="navbar__signup">Sign up</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
