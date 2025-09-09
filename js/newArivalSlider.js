document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("category-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Show arrow buttons on md+ (they are hidden by default on mobile via Tailwind classes)
  // Scroll by visible width (one "page")
  function pageWidth() {
    return slider.clientWidth * 0.95; // slightly less to keep a bit of context
  }

  nextBtn.addEventListener("click", () => {
    // if at end -> go to start for looping
    if (
      Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth
    ) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: pageWidth(), behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (slider.scrollLeft <= 0) {
      // jump to end
      slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: -pageWidth(), behavior: "smooth" });
    }
  });

  // Autoplay (optional) - slides every 3.5s
  let autoplay = true;
  let interval = null;
  function startAutoplay() {
    if (!autoplay) return;
    interval = setInterval(() => {
      if (
        Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: pageWidth(), behavior: "smooth" });
      }
    }, 3500);
  }
  function stopAutoplay() {
    if (interval) clearInterval(interval);
  }
  startAutoplay();

  // Pause autoplay on user interaction
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("touchstart", stopAutoplay, { passive: true });
  slider.addEventListener("touchend", startAutoplay, { passive: true });

  // Drag to scroll (mouse + touch)
  let isDown = false;
  let startX;
  let scrollLeft;
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("cursor-grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAutoplay();
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
    startAutoplay();
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
    startAutoplay();
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; // scroll-fast multiplier
    slider.scrollLeft = scrollLeft - walk;
  });

  // touch events
  slider.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopAutoplay();
    },
    { passive: true }
  );
  slider.addEventListener(
    "touchmove",
    (e) => {
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );
  slider.addEventListener("touchend", () => startAutoplay());

  // Responsive: ensure arrows visible on desktop and hidden on small screens
  function updateArrowVisibility() {
    const md = window.matchMedia("(min-width: 768px)").matches;
    if (md) {
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    } else {
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
    }
  }
  updateArrowVisibility();
  window.addEventListener("resize", updateArrowVisibility);
});
