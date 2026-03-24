import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/activities");
  };

  return (
    <header>
      <p>
        <Link to="/">Fitness Trackr</Link>
      </p>
      <nav>
        <NavLink to="/activities">Activities</NavLink>
        {token ? (
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
