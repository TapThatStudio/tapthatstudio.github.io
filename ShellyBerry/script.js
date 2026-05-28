const shareButton = document.getElementById("shareButton");

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
      // User cancelled or sharing failed. Fall back to copying the link.
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    shareButton.textContent = "Link copied";
  } catch {
    shareButton.textContent = "Copy this page link";
  }

  window.setTimeout(() => {
    shareButton.textContent = "Share this card";
  }, 1800);
});