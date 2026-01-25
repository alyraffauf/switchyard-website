import { useState, useEffect } from "react";
import "./index.css";
import icon from "/icon.svg";
import { Icon } from "./components/Icon";
import {
  screenshots,
  features,
  heroButtons,
  showcases,
  installOptions,
  footerLinks,
} from "./data/content";

function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    if (lightboxSrc) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxSrc]);

  const openLightbox = (src: string) => setLightboxSrc(src);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-brand">
              <img src={icon} alt="" className="hero-icon" />
              <h1>Switchyard</h1>
            </div>
            <p className="tagline">A rules-based browser launcher for Linux.</p>
            <p className="description">
              Work links in Chrome. Personal links in Firefox.
            </p>
            <div className="hero-badge">100% Free & Open Source</div>
            <div className="cta-buttons">
              {heroButtons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`btn ${btn.primary ? "btn-primary" : "btn-secondary"}`}
                >
                  {btn.icon && (
                    <Icon name={btn.icon} filled className="btn-icon" />
                  )}
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-screenshot">
            <img
              src={screenshots[0].src}
              alt={screenshots[0].alt}
              onClick={() => openLightbox(screenshots[0].src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && openLightbox(screenshots[0].src)
              }
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature">
                <div className="feature-icon">
                  <Icon name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcases */}
      {showcases.map((showcase, index) => (
        <section
          key={showcase.title}
          className={`showcase ${index % 2 === 0 ? "showcase-alt" : "showcase-reverse"}`}
        >
          <div className="showcase-content">
            {showcase.screenshot && (
              <img
                src={showcase.screenshot.src}
                alt={showcase.screenshot.alt}
                className="showcase-img"
                onClick={() => openLightbox(showcase.screenshot!.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && openLightbox(showcase.screenshot!.src)
                }
              />
            )}
            <div className="showcase-text">
              <h2>{showcase.title}</h2>
              <p>{showcase.description}</p>
            </div>
            {showcase.code && (
              <pre className="code-block">
                <code>{showcase.code}</code>
              </pre>
            )}
          </div>
        </section>
      ))}

      {/* Installation */}
      <section
        className={`install ${(showcases.length - 1) % 2 === 0 ? "install-alt" : ""}`}
        id="install"
      >
        <div className="container">
          <h2>Get Started</h2>
          <div className="install-options">
            {installOptions.map((option) => (
              <div key={option.title} className="install-option">
                <div className="install-icon">
                  <Icon name={option.icon} filled />
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                {"command" in option ? (
                  <code>{option.command}</code>
                ) : (
                  <a href={option.link} className="install-link">
                    {option.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={(showcases.length - 1) % 2 === 0 ? "footer-alt" : ""}>
        <div className="container">
          <div className="footer-brand">
            <img src={icon} alt="Switchyard" />
            <span>Switchyard</span>
          </div>
          <nav className="footer-links">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <p className="footer-copy">
            Made by <a href="https://aly.codes">Aly Raffauf</a> ·
            GPL-3.0-or-later
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="lightbox"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <img src={lightboxSrc} alt="Screenshot preview" />
        </div>
      )}
    </>
  );
}

export default App;
