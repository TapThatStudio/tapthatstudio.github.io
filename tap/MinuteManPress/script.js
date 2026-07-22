const revealItems = document.querySelectorAll('[data-reveal]');
const toast = document.querySelector('[data-toast]');
const shareButton = document.querySelector('[data-share-page]');

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: '0px 0px -40px 0px'
});

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 300)}ms`;
  revealObserver.observe(item);
});

shareButton?.addEventListener('click', async () => {
  const shareData = {
    title: 'Josh Gardner | Minuteman Press Downtown Portland',
    text: 'Downtown Portland print, signs, apparel, promotional products, design, and mailing support.',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast('Link copied.');
  } catch (error) {
    showToast('Share canceled.');
  }
});
