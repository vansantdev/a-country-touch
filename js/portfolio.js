// ===== Mobile menu =====
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ===== Open lightbox from portfolio cards =====
document.querySelectorAll(".portfolio-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open");
    const lb = document.getElementById(id);
    if (lb) {
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    }
  });
});

// ===== Lightbox + slider logic =====
document.querySelectorAll(".lightbox").forEach((lb) => {
  const closeBtn = lb.querySelector(".lightbox-close");
  const prev = lb.querySelector(".prev");
  const next = lb.querySelector(".next");
  const imgs = Array.from(lb.querySelectorAll(".slide-img"));

  function show(i) {
    imgs.forEach((img) => img.classList.remove("is-active"));
    if (imgs[i]) imgs[i].classList.add("is-active");
    lb.dataset.index = String(i);
  }

  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (imgs.length) show(0);
  }

  // init
  if (imgs.length) show(0);

  if (closeBtn) closeBtn.addEventListener("click", close);

  // click outside modal to close
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });

  if (prev) {
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!imgs.length) return;
      const cur = parseInt(lb.dataset.index || "0", 10);
      show((cur - 1 + imgs.length) % imgs.length);
    });
  }

  if (next) {
    next.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!imgs.length) return;
      const cur = parseInt(lb.dataset.index || "0", 10);
      show((cur + 1) % imgs.length);
    });
  }
});
