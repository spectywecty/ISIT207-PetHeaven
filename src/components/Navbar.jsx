import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { member, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="brand">🐾 Pet Heaven</Link>
      <nav>
        <NavLink to="/pets">Adopt</NavLink>
        <NavLink to="/release">Release a Pet</NavLink>
        {member ? (
          <>
            <span>Hi, {member.fullName.split(" ")[0]}</span>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Join us</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
