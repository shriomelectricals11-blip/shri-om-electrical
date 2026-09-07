
import { useMemo, useState } from "react";
import "./App.css";


const SHOP_NAME = "Shri Om Electricals";
const SHOP_ADDRESS = "Tq. Purna, Dist. Parbhani, Maharashtra - 431511";

const CONTACTS = [
  "9579587032",
  "8975187479",
  "8857001206",
];

const WHATSAPP_NUMBER = "918857001206";

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(
    "Shri Om Electrical, Purna, Parbhani, Maharashtra, India"
  );


const products = [
  {
    id: 1,
    name: "LED Bulb 9W",
    category: "Lighting",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Modular Switch 6A",
    category: "Switches",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "MCB 32A",
    category: "Protection",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "FR PVC Wire 1.5 sq mm",
    category: "Wires",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Ceiling Fan 1200mm",
    category: "Fans",
    image:
      "https://images.unsplash.com/photo-1631545806609-3c9a1f8b1e93?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Distribution Board 6 Way",
    category: "Protection",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
  },
];

const categories = [
  "All",
  "Lighting",
  "Switches",
  "Protection",
  "Wires",
  "Fans",
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function enquire(product) {
    const message = `Hello! I would like to enquire about ${product.name}. Please share the latest price and availability.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function enquireShop() {
    const message =
      "Hello! I would like to know more about your electrical products.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="site">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">⚡</span>
          <span>
            <strong>{SHOP_NAME}</strong>
          </span>
        </a>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="nav-whatsapp" onClick={enquireShop}>
          Chat on WhatsApp
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YOUR TRUSTED ELECTRICAL SHOP</span>
            <h1>Quality Electrical Products for a Brighter Future</h1>
            <p>
              Explore quality electrical products for your home,
              office and business at competitive prices.
            </p>
            <button className="primary-button" onClick={enquireShop}>
              Enquire on WhatsApp ↗
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span>💡</span>
            <span>🔌</span>
            <span>⚡</span>
          </div>
        </section>

        <section className="catalogue" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR CATALOGUE</span>
              <h2>Explore Our Products</h2>
              <p>Find the right electrical products for your needs.</p>
            </div>
            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          <input
            className="search"
            type="search"
            placeholder="Search bulbs, wires, switches..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />

          <div className="filters" aria-label="Product categories">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-button ${category === item ? "active" : ""
                  }`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="product-category">
                    {product.category}
                  </span>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <button
                    className="whatsapp-button"
                    onClick={() => enquire(product)}
                  >
                    WhatsApp Enquiry ↗
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try a different search or select another category.</p>
              <button
                className="filter-button active"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="about" id="about">
          <div>
            <span className="eyebrow">WHY CHOOSE US</span>
            <h2>Electrical essentials, made simple.</h2>
          </div>
          <div className="benefits">
            <div><span>✓</span> Quality products</div>
            <div><span>✓</span> Friendly assistance</div>
            <div><span>✓</span> Easy WhatsApp enquiries</div>
          </div>
        </section>
        <section className="contact" id="contact">
          <div className="contact-details">
            <span className="eyebrow">VISIT OUR SHOP</span>
            <h2>{SHOP_NAME}</h2>
            <p>
              <span aria-hidden="true">📍</span> {SHOP_ADDRESS}
            </p>
            <h3>Contact Us</h3>
            <div className="contact-numbers">
              {CONTACTS.map((number) => (
                <a key={number} href={`tel:${number}`}>
                  <span aria-hidden="true">📞</span> {number}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-actions">
            <button
              className="primary-button"
              onClick={enquireShop}
            >
              WhatsApp Enquiry ↗
            </button>

            <a
              className="directions-button"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 Get Directions on Google Maps
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">⚡</span>
          <strong>{SHOP_NAME}</strong>
        </a>
        <p>© {new Date().getFullYear()} {SHOP_NAME}</p>
        <a href="#products">Browse products ↑</a>
      </footer>
    </div>
  );
}

export default App;