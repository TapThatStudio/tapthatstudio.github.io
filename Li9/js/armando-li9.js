const shareButton = document.querySelector('.share-button');
const toast = document.querySelector('.toast');

const showToast = (message = 'Profile link copied') => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2200);
};

const shareProfile = async () => {
  const shareData = {
    title: 'Armando Arias | Li9 Technology Solutions',
    text: 'Connect with Armando Arias at Li9 for enterprise IT modernization, OpenShift, automation, and AI-ready infrastructure.',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast();
  } catch (error) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast();
    } catch (clipboardError) {
      showToast('Copy this page URL to share');
    }
  }
};

if (shareButton) {
  shareButton.addEventListener('click', shareProfile);
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
