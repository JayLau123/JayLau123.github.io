"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // The selected theme still applies for the current page when storage is unavailable.
    }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <svg
        className="theme-icon theme-icon-moon"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M19.2 15.4A8.2 8.2 0 0 1 8.6 4.8 8.2 8.2 0 1 0 19.2 15.4Z" />
      </svg>
      <svg
        className="theme-icon theme-icon-sun"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="3.7" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </svg>
      <span className="theme-label theme-label-dark">Dark mode</span>
      <span className="theme-label theme-label-light">Light mode</span>
    </button>
  );
}
