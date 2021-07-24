import "./Nav.css";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link className="homeLink link" to="/">
        Home
      </Link>
      {Auth.loggedIn() ? (
        <>
          <Link className="userCrapLink link" to="usercrap">
            User Crap
          </Link>
          <Link className="postLink link" to="userpost">
            Post
          </Link>
          <Link onClick={Auth.logout} className="logoutLink link" to="/">
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link className="loginLink link" to="login">
            Log In
          </Link>
          <Link className="signupLink link" to="signup">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
