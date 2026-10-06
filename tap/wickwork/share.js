// Prefer the device's share sheet; otherwise copy a clean page URL.
const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');
const shareFallback = document.querySelector('#share-fallback');
const shareUrl = document.querySelector('#share-url');

shareButton.hidden = false;

shareButton.addEventListener('click', async () => {
  // Always share the public page, including when viewing a local preview.
  const canonical = document.querySelector('link[rel="canonical"]');
  const url = canonical?.href
    || new URL(window.location.pathname, window.location.origin).href;
  const data = {
    title: 'Jaywick Woodworks',
    text: 'Handcrafted in wood. Built to last.',
    url,
  };

  shareStatus.textContent = '';
  shareFallback.hidden = true;
  shareButton.disabled = true;

  try {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        // Closing the share sheet should not trigger a clipboard write.
        if (error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      shareStatus.textContent = 'Link copied. Ready to share.';
    } catch {
      shareUrl.value = url;
      shareFallback.hidden = false;
      shareStatus.textContent = 'Select and copy the link below.';
      shareUrl.focus();
      shareUrl.select();
    }
  } finally {
    shareButton.disabled = false;
  }
});
