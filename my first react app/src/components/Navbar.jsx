import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "16px", background: "#1A1D23" }}>
      <Link to="/" style={{ color: "#E8E8E3", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ color: "#E8E8E3", textDecoration: "none" }}>About</Link>
      <Link to="/todo" style={{ color: "#D9A441", textDecoration: "none" }}>Todo</Link>
    </nav>
  );
}

export default Navbar;