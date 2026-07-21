const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');
const revealItems = document.querySelectorAll('.reveal');
const shareButtons = document.querySelectorAll('[data-share]');

const closeNav = () => {
  if (!nav || !navToggle) return;

  nav.classList.remove('open');
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
};

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = nav.classList.toggle('open');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a, button').forEach((item) => {
    item.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });
}

const setCopiedState = (button, originalText) => {
  button.classList.add('is-copied');
  button.textContent = 'Link copied';

  window.setTimeout(() => {
    button.classList.remove('is-copied');
    button.textContent = originalText;
  }, 1800);
};

shareButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const originalText = button.textContent.trim() || 'Share';

    const shareData = {
      title: 'TapThat Studio',
      text: 'Premium NFC cards and custom tap experiences that make your business easier to remember, share, and act on.',
      url: 'https://tapthatstudio.com/'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setCopiedState(button, originalText);
      }
    } catch (error) {
      console.warn('Share cancelled or failed:', error);
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}