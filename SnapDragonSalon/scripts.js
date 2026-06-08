const revealEls = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
  revealObserver.observe(el);
});

const header = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY > 12;
    header?.classList.toggle("is-scrolled", scrolled);
  },
  { passive: true }
);
