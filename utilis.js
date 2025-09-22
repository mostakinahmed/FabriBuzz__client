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

// //loader for homepage
// window.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     document.getElementById("loader").classList.add("hidden"); // hide loader
//     document.getElementById("mainContent").classList.remove("hidden"); // show content
//   }, 2000); // 2 seconds
// });

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");

  // Check if the loader was already shown
  const loaderShown = localStorage.getItem("loaderShown");

  if (!loaderShown) {
    // Show loader for 2 seconds
    setTimeout(() => {
      loader.classList.add("hidden");
      mainContent.classList.remove("hidden");

      // Remember that loader has been shown
      localStorage.setItem("loaderShown", "true");
    }, 2000);
  } else {
    // Loader already shown, skip it
    loader.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }
});
