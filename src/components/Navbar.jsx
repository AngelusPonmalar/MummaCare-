import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineFileText, AiOutlineHeart, AiOutlineMessage, AiOutlineShopping } from "react-icons/ai";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <AiFillHome /> },
    { path: "/profile", label: "Profile", icon: <AiOutlineUser /> },
    { path: "/medical", label: "Medical", icon: <AiOutlineFileText /> },
    { path: "/assessment", label: "Assessment", icon: <AiOutlineHeart /> },
    { path: "/ai", label: "AI Assistant", icon: <AiOutlineMessage /> },
    { path: "/store", label: "Store", icon: <AiOutlineShopping /> },
  ];

  return (
    <div style={navContainer}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link to={item.path} key={item.path} style={{ ...navLink, color: isActive ? "#E91E63" : "#757575" }}>
            <span style={{ fontSize: "24px" }}>{item.icon}</span>
            <span style={{ fontSize: "12px", marginTop: "4px" }}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* ---------- Styles ---------- */

const navContainer = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "#FFFFFF", // White background like your image
  display: "flex",
  justifyContent: "space-around",
  padding: "10px 0",
  borderTop: "1px solid #EEEEEE", // Subtle line at top
  boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
};

const navLink = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: "500"
};