import { useState } from "react";
import "./../Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="../../../public/logo.png" alt="logo" />
          <span>Evergreen-Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>

      <div className="right">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="user"
          />
          <span>Muruga</span>

          <a href="/profile" className="profile">
            <div className="notification">3</div>
            <span>Profile</span>
          </a>
        </div>

        <div className="menuIcon">
          <img
            src="../../../public/menu.png"
            alt="menu"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;