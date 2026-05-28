const shareButton = document.getElementById("shareButton");

const resetShareButtonText = () => {
  if (!shareButton) return;

  window.setTimeout(() => {
    shareButton.textContent = "Share this card";
  }, 1800);
};

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: "Shelly Berry | Arizona Real Estate",
    text: "Shelly Berry, longtime Arizona real estate broker with RE/MAX Fine Properties.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {
      // User cancelled sharing or the share failed. Fall back to copying.
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    shareButton.textContent = "Link copied";
  } catch {
    shareButton.textContent = "Copy this page link";
  }

  resetShareButtonText();
});