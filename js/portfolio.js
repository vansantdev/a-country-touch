// js/portfolio.js

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// Open lightbox when clicking category cards
document.querySelectorAll(".portfolio-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open");
    const lb = document.getElementById(id);
    if (lb) {
      lb.classList.add("open");
      document.body.style.overflow = "hidden"; // stop background scroll
    }
  });
});

// Close + slider logic for each lightbox
document.querySelectorAll(".lightbox").forEach((lb) => {
  const closeBtn = lb.querySelector(".lightbox-close");
  const prev = lb.querySelector(".prev");
  const next = lb.querySelector(".next");
  const imgs = Array.from(lb.querySelectorAll(".slide-img"));

  let index = 0;

  function show(i) {
    if (!imgs.length) return;
    imgs.forEach((img) => img.classList.remove("is-active"));
    imgs[i].classList.add("is-active");
    index = i;
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = ""; // restore scroll
    show(0);
  }

  // init
  show(0);

  if (closeBtn) closeBtn.addEventListener("click", close);

  // click outside modal closes
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  // arrow controls
  if (prev) {
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      show((index - 1 + imgs.length) % imgs.length);
    });
  }

  if (next) {
    next.addEventListener("click", (e) => {
      e.stopPropagation();
      show((index + 1) % imgs.length);
    });
  }

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });
});
