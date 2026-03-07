import React from "react";
import { Heart } from "lucide-react"; // Ensure lucide-react is installed
import "./Store.css";

const products = [
  { id: 1, name: "Prenatal Vitamins", price: "₹499", image: "https://images.unsplash.com/photo-1580281658629-0b3c9c5f87a0" },
  { id: 2, name: "Maternity Dress", price: "₹1299", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30" },
  { id: 3, name: "Pregnancy Pillow", price: "₹1899", image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba3" },
  { id: 4, name: "Baby Bump Support Belt", price: "₹899", image: "https://images.unsplash.com/photo-1616628182506-3d1ad9f5c3c2" },
  { id: 5, name: "Healthy Snacks", price: "₹399", image: "https://images.unsplash.com/photo-1604908177522-4294d6f1c5ab" },
  { id: 6, name: "Protein Powder", price: "₹799", image: "https://images.unsplash.com/photo-1579722076136-1262d645a753" },
  { id: 7, name: "Yoga Mat", price: "₹999", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f" },
  { id: 8, name: "Stretch Mark Oil", price: "₹350", image: "https://images.unsplash.com/photo-1608248597259-009699195b05" }
];

const Store = () => {
  return (
    <div className="store-container">
      {/* Branding Header integrated directly */}
      <div style={brandStyles.header}>
        <div style={brandStyles.logoCircle}>
          <Heart size={32} fill="#ff2d78" color="#ff2d78" />
        </div>
        <span style={brandStyles.name}>MummaCare+</span>
      </div>

      <h1 className="store-title">Pregnancy Care Store</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <button className="buy-btn">Add to Cart</button>
          </div>
        ))}
      </div>
      <div style={{ height: "80px", width: "100%" }}></div>
    </div>
  );
};

/* Branding Styles localized for this component */
const brandStyles = {
  header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" },
  logoCircle: { width: "50px", height: "50px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  name: { fontSize: "22px", fontWeight: "bold", color: "#E91E63" }
};

export default Store;