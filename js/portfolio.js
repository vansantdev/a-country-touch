// js/portfolio.js
// Works with gallery_data.js (window.GALLERY)
// Builds a lightbox on the fly and wires arrows / close.

(function () {
  const root = document.getElementById("lightbox-root");
  if (!root) return;

  const META = {
    wood: {
      title: "Woodworking",
      desc: "Handcrafted benches, tables, flags, clocks, decor, and custom builds."
    },
    tumblers: {
      title: "Tumblers & Drinkware",
      desc: "Personalized tumblers and mugs with names, colors, and designs."
    },
    prints: {
      title: "3D Prints",
      desc: "Custom 3D printed designs, lithophanes, and unique gifts."
    },
    metal: {
      title: "Metal / Wind Spinners",
      desc: "Metal wind spinners and engraved pieces."
    },
    door: {
      title: "Door Hangers",
      desc: "Seasonal and custom door signs."
    },
    custom: {
      title: "Custom Work",
      desc: "One-of-a-kind builds and special requests."
    }
  };

  // Build ONE reusable lightbox
  root.innerHTML = `
    <div class="lightbox" id="dynamic-lightbox" aria-hidden="true">
      <div class="lightbox-content" role="dialog" aria-label="Gallery lightbox">
        <button class="lightbox-close" type="button" aria-label="Close">×</button>
        <h3 id="lb-title"></h3>

        <div class="lightbox-slider">
          <button class="slide-btn prev" type="button" aria-label="Previous image">‹</button>

          <div class="slide-frame" id="lb-frame"></div>

          <button class="slide-btn next" type="button" aria-label="Next image">›</button>
        </div>

        <p class="muted" id="lb-desc"></p>
        <p class="small muted" id="lb-count"></p>
      </div>
    </div>
  `;

  const lb = document.getElementById("dynamic-lightbox");
  const frame = document.getElementById("lb-frame");
  const titleEl = document.getElementById("lb-title");
  const descEl = document.getElementById("lb-desc");
  const countEl = document.getElementById("lb-count");

  const closeBtn = lb.querySelector(".lightbox-close");
  const prevBtn = lb.querySelector(".prev");
  const nextBtn = lb.querySelector(".next");

  let index = 0;

  function renderImages(list) {
    frame.innerHTML = "";
    list.forEach((name, i) => {
      const img = document.createElement("img");
      img.className = "slide-img" + (i === 0 ? " is-active" : "");
      img.src = `images/${name}`;
      img.alt = `${titleEl.textContent} photo ${i + 1}`;
      img.loading = "lazy";
      frame.appendChild(img);
    });
  }

  function show(i) {
    const imgs = frame.querySelectorAll(".slide-img");
    if (!imgs.length) return;

    imgs.forEach(el => el.classList.remove("is-active"));
    imgs[i].classList.add("is-active");

    index = i;
    countEl.textContent = `Image ${index + 1} of ${imgs.length}`;
  }

  function open(key) {
    const gallery = window.GALLERY;

    if (!gallery || !gallery[key] || !gallery[key].length) {
      alert("No images found for this category yet.");
      return;
    }

    const meta = META[key] || { title: "Gallery", desc: "" };
    titleEl.textContent = meta.title;
    descEl.textContent = meta.desc;

    renderImages(gallery[key]);

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    show(0);
  }

  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    frame.innerHTML = "";
    index = 0;
  }

  // Click handlers for category cards
  document.querySelectorAll(".portfolio-link").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-gallery");
      if (key) open(key);
    });
  });

  // Close handlers
  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

  // Arrow handlers
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const imgs = frame.querySelectorAll(".slide-img");
    if (!imgs.length) return;
    show((index - 1 + imgs.length) % imgs.length);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const imgs = frame.querySelectorAll(".slide-img");
    if (!imgs.length) return;
    show((index + 1) % imgs.length);
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });
})();
