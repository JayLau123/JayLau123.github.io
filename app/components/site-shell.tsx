const navItems = [
  { label: "About", href: "/", icon: "about" },
  { label: "Blog", href: "/blog/", icon: "blog" },
  { label: "Gallery", href: "/gallery/", icon: "gallery" },
] as const;

type NavItem = (typeof navItems)[number];

function NavIcon({ icon }: { icon: NavItem["icon"] }) {
  if (icon === "blog") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 5.5h10M7 10h10M7 14.5h6M5 3.5h14v17H5z" />
      </svg>
    );
  }

  if (icon === "gallery") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 5.5h15v13h-15zM7.5 15l3.2-3.3 2.4 2.5 1.7-1.8 2.7 2.6M8 9h.01" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
    </svg>
  );
}

export function SiteHeader({ active }: { active: NavItem["icon"] }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={active === item.icon ? "page" : undefined}
          >
            <NavIcon icon={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        &copy; 2026 Chuanyu Liu. Built with OpenAI Sites. Hosted on GitHub
        Pages. Schematic generated with GPT Image.
      </p>
    </footer>
  );
}
