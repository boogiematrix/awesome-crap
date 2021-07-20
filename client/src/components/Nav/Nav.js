import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      {/* TODO: Add conditionals for login and logout */}
      <Link className="loginLink link" to="login">
        Log In
      </Link>
      <Link className="signupLink link" to="signup">
        Sign Up
      </Link>
      <Link className="postLink link" to="userpost">
        Post 
      </Link>
      <Link className="homeLink link" to="/">
        Home
      </Link>
      <Link className="logoutLink link" to="/">
        Log Out
      </Link>
    </nav>
  );
};

export default Nav;
