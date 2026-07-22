(() => {
  "use strict";

  const demos = {
    stylist: { initials: "KR", brand: "Snapdragon Salon", name: "Kandy Russell", role: "Master Stylist · Salon Founder", accent: "#d2a75f", actions: ["Book an appointment", "Explore services", "Meet the salon", "Save contact"] },
    property: { initials: "MC", brand: "Apex Property Group", name: "Maya Chen", role: "Regional Property Manager", accent: "#87a79a", actions: ["View managed properties", "Owner resources", "Resident portal", "Save contact"] },
    realtor: { initials: "SB", brand: "Arizona City Home", name: "Shelly Berry", role: "Real Estate · Phoenix Metro", accent: "#b99362", actions: ["View active listings", "Schedule a showing", "Read client reviews", "Save contact"] },
    print: { initials: "JG", brand: "Minuteman Press", name: "Josh Gardner", role: "Print · Signs · Marketing", accent: "#d5a746", actions: ["Request a quote", "View print services", "Get directions", "Call the shop"] },
    tech: { initials: "AA", brand: "Li9 Technology Solutions", name: "Armando Arias", role: "Founder · President · CEO", accent: "#caa875", actions: ["Explore capabilities", "View solutions", "Start a conversation", "Share profile"] }
  };

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

  const tabs = [...document.querySelectorAll("[data-demo]")];
  const profile = document.querySelector("[data-demo-profile]");
  const miniCard = document.querySelector("[data-mini-card]");
  const phone = document.querySelector("[data-demo-phone]");
  const fields = {
    initials: document.querySelector("[data-initials]"),
    avatar: document.querySelector("[data-avatar]"),
    brand: document.querySelector("[data-brand]"),
    name: document.querySelector("[data-name]"),
    role: document.querySelector("[data-role]"),
    actions: document.querySelector("[data-actions]")
  };

  const selectDemo = (key) => {
    const demo = demos[key];
    if (!demo) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.demo === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    miniCard?.style.setProperty("--accent", demo.accent);
    phone?.style.setProperty("--accent", demo.accent);
    fields.initials.textContent = demo.initials;
    fields.avatar.textContent = demo.initials;
    fields.brand.textContent = demo.brand;
    fields.name.textContent = demo.name;
    fields.role.textContent = demo.role;
    fields.actions.replaceChildren(...demo.actions.map((action, index) => {
      const row = document.createElement("div");
      row.innerHTML = `<i>0${index + 1}</i><b></b><span aria-hidden="true">↗</span>`;
      row.querySelector("b").textContent = action;
      return row;
    }));
    profile?.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease" });
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => selectDemo(tab.dataset.demo)));
  tabs.forEach((tab, index) => tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const increment = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    const next = tabs[(index + increment + tabs.length) % tabs.length];
    next.focus();
    selectDemo(next.dataset.demo);
  }));
  selectDemo("stylist");

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
