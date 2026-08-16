const taglines = [
  "Congratulations. Your phone book just got 10x cooler.",
  "I look great on your screen. Check for yourself.",
  "You're welcome. Your contact list was looking pretty boring.",
  "Achievement unlocked: Elite texting partner acquired.",
  "Beep boop. I am now inside your phone.",
  "Congratulations. Your phone book just got a major upgrade.",
  "I look great on your screen. Go ahead and hit save.",
  "You're welcome. Your contact list was looking a little boring.",
  "Achievement unlocked: You just acquired an elite texting partner.",
  "Now you have my info. Try not to text me all at once.",
  "Congrats, you now know someone cool.",
  "You now have direct access to me. Use wisely.",
  "The contact you didn't know you needed."
];

const taglineElement = document.querySelector("#tagline");
const taglineButton = document.querySelector("#taglineButton");
const shareButton = document.querySelector("#shareButton");
const toast = document.querySelector("#toast");
const heroCard = document.querySelector(".hero-card");

let currentIndex = -1;
let toastTimer;

function randomTaglineIndex() {
  if (taglines.length < 2) return 0;

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * taglines.length);
  } while (nextIndex === currentIndex);

  return nextIndex;
}

function showTagline({ animate = true } = {}) {
  if (!taglineElement) return;

  currentIndex = randomTaglineIndex();

  if (!animate) {
    taglineElement.textContent = taglines[currentIndex];
    return;
  }

  taglineElement.classList.remove("swap");
  void taglineElement.offsetWidth;
  taglineElement.classList.add("swap");

  window.setTimeout(() => {
    taglineElement.textContent = taglines[currentIndex];
  }, 165);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function shareMrWill() {
  const shareData = {
    title: "Mr Will",
    text: "Tap responsibly.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copied");
  } catch {
    const input = document.createElement("input");
    input.value = window.location.href;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast("Link copied");
  }
}

function updateGlassLight(event) {
  if (!heroCard || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = heroCard.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  heroCard.style.setProperty("--mx", `${x}%`);
  heroCard.style.setProperty("--my", `${y}%`);
}

function updatePartyMode() {
  const partyPill = document.querySelector(".party-pill");
  if (!partyPill) return;

  const now = new Date();
  const day = now.getDay();   // 0 = Sunday, 5 = Friday, 6 = Saturday
  const hour = now.getHours();

  const isPartyTime =
    day === 6 ||               // Saturday
    day === 0 ||               // Sunday
    (day === 5 && hour >= 17); // Friday after 5 PM

  partyPill.hidden = !isPartyTime;
}

updatePartyMode();

showTagline({ animate: false });
taglineButton?.addEventListener("click", () => showTagline());
shareButton?.addEventListener("click", shareMrWill);
heroCard?.addEventListener("pointermove", updateGlassLight);
