const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealTargets = document.querySelectorAll(
  ".feature-card, .detail-card, .ride-list article, .captain-card, .rules-box, .booking-panel"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

const shareButtons = document.querySelectorAll(".share-button");

const sharePage = async () => {
  const shareData = {
    title: "EdVenture Lake Pleasant",
    text: "Book a private wakeboarding, wakesurfing, tubing, or cruising session with Captain Ed on Lake Pleasant.",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showShareToast("Link copied. Lake day officially shareable.");
  } catch (error) {
    console.warn("Share failed:", error);
  }
};

const showShareToast = (message) => {
  const existingToast = document.querySelector(".share-toast");

  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "share-toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("is-visible");
  }, 10);

  window.setTimeout(() => {
    toast.classList.remove("is-visible");

    window.setTimeout(() => {
      toast.remove();
    }, 250);
  }, 2400);
};

shareButtons.forEach((button) => {
  button.addEventListener("click", sharePage);
});

revealTargets.forEach((element) => observer.observe(element));