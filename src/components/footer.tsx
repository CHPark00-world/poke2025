import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <p className="footer_text">
          © {new Date().getFullYear()} Pokédex. All rights reserved.
        </p>
        <p className="footer_info">
          Made by {"  "}
          <a
            href="https://github.com/CHPark00-world/poke2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            박찬혁
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
