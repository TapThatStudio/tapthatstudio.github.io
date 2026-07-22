(() => {
  "use strict";

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });

  document.querySelectorAll("[data-share]").forEach((button) => {
    const original = button.textContent.trim();
    button.addEventListener("click", async () => {
      try {
        if (navigator.share) {
          await navigator.share({ title: "TapThat Studio", text: "Make your first impression impossible to forget.", url: window.location.href });
          return;
        }
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "Link copied";
        window.setTimeout(() => { button.textContent = original; }, 1800);
      } catch (error) {
        if (error?.name !== "AbortError") window.prompt("Copy this link:", window.location.href);
      }
    });
  });
})();
