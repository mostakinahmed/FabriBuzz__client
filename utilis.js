// Smooth Scroll footer
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Mobile Menu Toggle
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// <!-- Countdown Script -->
// Set the offer end date
const offerEnd = new Date();
offerEnd.setHours(offerEnd.getHours() + 24); // 24 hours from now

const timerEl = document.getElementById("mega-offer-timer");

function updateTimer() {
  const now = new Date();
  const diff = offerEnd - now;

  if (diff <= 0) {
    timerEl.innerText = "00:00:00";
    clearInterval(timerInterval);
    return;
  }

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(
    Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  timerEl.innerText = `${hours}:${minutes}:${seconds}`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
