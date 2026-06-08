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

const shareButton = document.querySelector(".share-button");

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const originalText = shareButton.innerHTML;
    const profileUrl = "https://tapthatstudio.com/SnapDragonSalon/";

    const shareData = {
      title: "Kandy Russell | Snapdragon Salon",
      text: "Custom color, lived-in shape, and personal hair craft with Kandy Russell at Snapdragon Salon.",
      url: profileUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(profileUrl);
        shareButton.textContent = "Link copied";
        setTimeout(() => {
          shareButton.innerHTML = originalText;
        }, 1800);
      } else {
        shareButton.textContent = "Copy unavailable";
        setTimeout(() => {
          shareButton.innerHTML = originalText;
        }, 1800);
      }
    } catch {
      // Share was cancelled or unavailable. No action needed.
    }
  });
}