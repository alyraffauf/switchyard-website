import type { IconName } from "../components/Icon";

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface HeroButton {
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

export type InstallOption = InstallOptionCommand | InstallOptionLink;

export interface Showcase {
  screenshot?: Screenshot;
  code?: string;
  title: string;
  description: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

const REPO_URL = "https://github.com/alyraffauf/switchyard";
const DONATE_URL = "https://ko-fi.com/alyraffauf";
const FLATHUB_URL = "https://flathub.org/apps/io.github.alyraffauf.Switchyard";
const SCREENSHOTS_BASE = `https://raw.githubusercontent.com/alyraffauf/switchyard/master/data/screenshots`;

export const screenshots: Screenshot[] = [
  {
    src: `${SCREENSHOTS_BASE}/launcher.png`,
    alt: "Browser launcher",
  },
  {
    src: `${SCREENSHOTS_BASE}/browser-rules.png`,
    alt: "Browser rules panel",
  },
  {
    src: `${SCREENSHOTS_BASE}/link-redirections.png`,
    alt: "Link redirections panel",
  },
  {
    src: `${SCREENSHOTS_BASE}/edit-rules.png`,
    alt: "Rule editor",
  },
];

export const features: Feature[] = [
  {
    icon: "checkCircle",
    title: "Automatic Routing",
    description:
      "Create rules by domain or regex. Links open in the right browser automatically.",
  },
  {
    icon: "sliders",
    title: "Browser Launcher",
    description:
      "No matching rule? Launch a browser with a quick keystroke or mouse click.",
  },
  {
    icon: "shuffle",
    title: "Link Redirections",
    description:
      "Rewrite URLs before they open. Strip trackers, swap domains, and more.",
  },
  {
    icon: "link",
    title: "Custom URLs",
    description:
      "Encode rules directly with switchyard:// links. Perfect for notes and to-dos.",
  },
  {
    icon: "star",
    title: "Favorite Browser",
    description:
      "Pin your favorite browser to appear first and act as fallback.",
  },
  {
    icon: "zap",
    title: "Fast & Native",
    description:
      "A native GNOME app that launches instantly. No background services.",
  },
];

export const installOptions: InstallOption[] = [
  {
    icon: "flatpak",
    title: "Flatpak",
    description: "Recommended for most users",
    link: FLATHUB_URL,
    linkText: "View on Flathub",
  },
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
    link: REPO_URL,
    linkText: "View on GitHub",
  },
];

export const heroButtons: HeroButton[] = [
  {
    href: FLATHUB_URL,
    label: "Flathub",
    icon: "flatpak",
    primary: true,
  },
  {
    href: REPO_URL,
    label: "GitHub",
    icon: "github",
    primary: true,
  },
  {
    href: DONATE_URL,
    label: "Donate",
    icon: "heart",
  },
];

export const showcases: Showcase[] = [
  {
    screenshot: screenshots[1],
    title: "Point-and-Click Setup",
    description:
      "Create and manage rules with a clean, native interface. No config files required—just point and click.",
  },
  {
    screenshot: screenshots[2],
    title: "Your Links, Your Way",
    description:
      "Take control of every link you open. Strip tracking parameters and enforce privacy-friendly frontends automatically.",
  },
  {
    code: `[[rules]]
name = "Video Sites"
logic = "any"
browser = "brave-browser.desktop"

[[rules.conditions]]
type = "domain"
pattern = "youtube.com"

[[rules.conditions]]
type = "domain"
pattern = "twitch.tv"`,
    title: "Plain Text Configuration",
    description:
      "Prefer text editors? Define rules in a simple TOML file. Easy to version control, share, and back up.",
  },
];

export const footerLinks: FooterLink[] = [
  { href: REPO_URL, label: "GitHub" },
  { href: `${REPO_URL}/issues`, label: "Issues" },
  { href: DONATE_URL, label: "Donate" },
];
