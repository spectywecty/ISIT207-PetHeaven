import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { member, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={close}>🐾 Pet Heaven</Link>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label="Toggle menu"
        onClick={() => setOpen(o => !o)}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav
        id="main-nav"
        className={open ? "open" : ""}
        onClick={e => { if (e.target.closest("a")) close(); }}
      >
        <NavLink to="/pets">Adopt</NavLink>
        <NavLink to="/release">Release a Pet</NavLink>
        {member ? (
          <>
            <span>Hi, {member.fullName.split(" ")[0]}</span>
            <button onClick={() => { logout(); close(); }}>Log out</button>
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
