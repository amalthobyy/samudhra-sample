// Simple, readable client-side interactions for the Samudhra site.
// No frameworks, just plain JavaScript for easy debugging.

// MOBILE NAV TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });

  // Close menu when a link is clicked (on mobile)
  navMenu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }
  });
}

// SCROLL REVEAL ANIMATIONS
// Uses IntersectionObserver so off-screen elements don't cost performance.
const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window && animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: if IntersectionObserver is not supported, just show everything.
  animatedElements.forEach((el) => el.classList.add("is-visible"));
}

// SMOOTH SCROLL FOR IN-PAGE LINKS (for older browsers that ignore CSS behavior)
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLAnchorElement)) return;

  const href = target.getAttribute("href");
  if (href && href.startsWith("#") && href.length > 1) {
    const section = document.querySelector(href);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// DYNAMIC FOOTER YEAR
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

