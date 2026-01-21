import { useState, useEffect } from "react";
import "./index.css";
import icon from "/icon.svg";

// =============================================================================
// Icons
// =============================================================================

const icons = {
  github: (
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  ),
  heart: (
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  ),
  checkCircle: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  bolt: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  sliders: (
    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  ),
  nixos: (
    <path d="M7.352 1.592l-1.364.002L5.32 2.75l1.557 2.713-3.137-.008-1.32 2.34H14.11l-1.353-2.332-3.192-.006-2.214-3.865zm6.175 0l-2.687.025 5.846 10.127 1.341-2.34-1.59-2.765 2.24-3.85-.683-1.182h-1.336l-1.57 2.705-1.56-2.72zm6.887 4.195l-5.846 10.125 2.696-.008 1.601-2.76 4.453.016.682-1.183-.666-1.157-3.13-.008L21.778 8.1l-1.365-2.313zM9.432 8.086l-2.696.008-1.601 2.76-4.453-.016L0 12.02l.666 1.157 3.13.008-1.575 2.71 1.365 2.315L9.432 8.086zM7.33 12.25l-.006.01-.002-.004-1.342 2.34 1.59 2.765-2.24 3.85.684 1.182H7.35l.004-.006h.001l1.567-2.698 1.558 2.72 2.688-.026-.004-.006h.01L7.33 12.25zm2.55 3.93l1.354 2.332 3.192.006 2.215 3.865 1.363-.002.668-1.156-1.557-2.713 3.137.008 1.32-2.34H9.881Z" />
  ),
  flatpak: (
    <path d="M12 0c-.556 0-1.111.144-1.61.432l-7.603 4.39a3.217 3.217 0 0 0-1.61 2.788v8.78c0 1.151.612 2.212 1.61 2.788l7.603 4.39a3.217 3.217 0 0 0 3.22 0l7.603-4.39a3.217 3.217 0 0 0 1.61-2.788V7.61a3.217 3.217 0 0 0-1.61-2.788L13.61.432A3.218 3.218 0 0 0 12 0Zm0 2.358c.15 0 .299.039.431.115l7.604 4.39c.132.077.24.187.315.316L12 12v9.642a.863.863 0 0 1-.431-.116l-7.604-4.39a.866.866 0 0 1-.431-.746V7.61c0-.153.041-.302.116-.43L12 12Z" />
  ),
  download: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14l-4-4h2.5V8h3v4H16l-4 4z" />
  ),
} as const;

type IconName = keyof typeof icons;

function Icon({
  name,
  filled = false,
  className,
}: {
  name: IconName;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? undefined : "currentColor"}
      strokeWidth={filled ? undefined : 2}
    >
      {icons[name]}
    </svg>
  );
}

// =============================================================================
// Types
// =============================================================================

interface Screenshot {
  src: string;
  alt: string;
}

interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

interface HeroButton {
  href: string;
  label: string;
  icon?: IconName;
  primary?: boolean;
}

interface InstallOptionCommand {
  icon: IconName;
  title: string;
  description: string;
  command: string;
}

interface InstallOptionLink {
  icon: IconName;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

type InstallOption = InstallOptionCommand | InstallOptionLink;

interface Showcase {
  screenshot?: Screenshot;
  code?: string;
  title: string;
  description: string;
}

interface FooterLink {
  href: string;
  label: string;
}

// =============================================================================
// Content Data
// =============================================================================

const REPO_URL = "https://github.com/alyraffauf/switchyard";
const DONATE_URL = "https://ko-fi.com/alyraffauf";
// @ts-expect-error Reserved for future use when Flatpak is enabled
const FLATHUB_URL = "https://flathub.org/apps/io.github.alyraffauf.Switchyard";
const SCREENSHOTS_BASE = `https://raw.githubusercontent.com/alyraffauf/switchyard/master/docs/images`;

const screenshots: Screenshot[] = [
  { src: `${SCREENSHOTS_BASE}/switchyard-picker.png`, alt: "Browser launcher" },
  { src: `${SCREENSHOTS_BASE}/switchyard.png`, alt: "Settings panel" },
  { src: `${SCREENSHOTS_BASE}/switchyard-rulesedit.png`, alt: "Rule editor" },
];

const features: Feature[] = [
  {
    icon: "checkCircle",
    title: "Automatic Routing",
    description:
      "Match URLs by domain, path, or regex. Links open in the right browser without you lifting a finger.",
  },
  {
    icon: "bolt",
    title: "Browser Launcher",
    description:
      "No matching rule? A laucnher appears so you can choose your browser with a keystroke or a click.",
  },
  {
    icon: "sliders",
    title: "Fast & Native",
    description:
      "A native GNOME app that launches instantly. No background processes, no resource drain.",
  },
];

const installOptions: InstallOption[] = [
  // {
  //   icon: "flatpak",
  //   title: "Flatpak",
  //   description: "Recommended for most users",
  //   link: FLATHUB_URL,
  //   linkText: "View on Flathub",
  // },
  {
    icon: "nixos",
    title: "Nix Flake",
    description: "Run directly or add to your config",
    command: "nix run github:alyraffauf/switchyard",
  },
  {
    icon: "github",
    title: "Build from Source",
    description: "Requires Go 1.24+ and GTK4",
    command: "git clone https://github.com/alyraffauf/switchyard",
  },
];

const heroButtons: HeroButton[] = [
  // {
  //   href: FLATHUB_URL,
  //   label: "Flathub",
  //   icon: "flatpak",
  //   primary: true,
  // },
  {
    href: REPO_URL,
    label: "GitHub",
    icon: "github",
    primary: true,
  },
  {
    href: "#install",
    label: "Install",
    icon: "download",
  },
  {
    href: DONATE_URL,
    label: "Donate",
    icon: "heart",
  },
];

const showcases: Showcase[] = [
  {
    screenshot: screenshots[1],
    title: "Point-and-Click Setup",
    description:
      "Create and manage rules with a clean, native interface. No config files required—just point and click.",
  },
  {
    code: `[[rules]]
name = "Work"
browser = "firefox.desktop"

[[rules.conditions]]
type = "domain"
pattern = "github.com"

[[rules]]
name = "Video Sites"
logic = "any"
browser = "brave-browser.desktop"

[[rules.conditions]]
type = "domain"
pattern = "youtube.com"

[[rules.conditions]]
type = "domain"
pattern = "twitch.tv"`,
    title: "Or Edit Config Files",
    description:
      "Prefer text editors? Define rules in a simple TOML file. Easy to version control, share, and back up.",
  },
];

const footerLinks: FooterLink[] = [
  { href: REPO_URL, label: "GitHub" },
  { href: `${REPO_URL}/issues`, label: "Issues" },
  { href: DONATE_URL, label: "Donate" },
];

// =============================================================================
// App Component
// =============================================================================

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
            <p className="tagline">Open every link in the right browser.</p>
            <p className="description">
              Work links in Chrome. Personal links in Firefox. Define your rules
              once, and Switchyard handles the rest.
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

      {/* Showcases */}
      {showcases.map((showcase, index) => (
        <section
          key={showcase.title}
          className={`showcase ${index % 2 === 1 ? "showcase-reverse" : ""}`}
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

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Why Switchyard?</h2>
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

      {/* Installation */}
      <section className="install" id="install">
        <div className="container">
          <h2>Install</h2>
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
      <footer>
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
