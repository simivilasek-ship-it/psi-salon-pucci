(function () {
  if (window.__pucciSiteBehavior) return;
  window.__pucciSiteBehavior = true;

  var header = document.querySelector("[data-header]");
  var menu = document.getElementById("nav-toggle");
  if (header && menu) {
    function closeMenu() {
      if (!menu.checked) return;
      menu.checked = false;
    }

    function onScroll() {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.checked) {
        closeMenu();
        menu.focus();
      }
    });

    var links = header.querySelectorAll(".nav-links a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var toggle = document.querySelector("[data-seminars-toggle]");
  var panel = document.querySelector("[data-seminars-panel]");
  var root = document.querySelector("[data-cert-fan]");
  if (!root) return;

  var stage = root.querySelector("[data-cert-stage]");
  var cards = root.querySelectorAll("[data-cert-card]");
  var prev = root.querySelector("[data-cert-prev]");
  var next = root.querySelector("[data-cert-next]");
  var counter = root.querySelector("[data-cert-counter]");
  var lightbox = document.querySelector("[data-cert-lightbox]");
  var lightboxImg = lightbox && lightbox.querySelector("img");
  var lightboxClose = lightbox && lightbox.querySelector("[data-cert-lightbox-close]");
  var total = cards.length;
  if (!stage || !total) return;

  var startIndex = Number(root.getAttribute("data-start") || "0");
  if (isNaN(startIndex) || startIndex < 0 || startIndex >= total) startIndex = 0;
  var index = startIndex;
  var startX = 0;
  var painted = false;

  function tier() {
    var w = window.innerWidth;
    if (w <= 639) return { spread: 52, tilt: 6, rise: 14, scale: 0.12 };
    if (w <= 1023) return { spread: 90, tilt: 7, rise: 16, scale: 0.11 };
    return { spread: 130, tilt: 8, rise: 18, scale: 0.1 };
  }

  function offsetOf(i, active) {
    var diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function paint() {
    var t = tier();
    for (var i = 0; i < cards.length; i++) {
      var diff = offsetOf(i, index);
      var card = cards[i];
      if (Math.abs(diff) > 2) {
        card.hidden = true;
        card.setAttribute("aria-hidden", "true");
        continue;
      }
      card.hidden = false;
      card.removeAttribute("aria-hidden");
      card.setAttribute("aria-current", diff === 0 ? "true" : "false");
      card.style.zIndex = String(10 - Math.abs(diff));
      card.style.opacity = String(1 - Math.abs(diff) * 0.08);
      card.style.transform =
        "translate(-50%, -50%) translateX(" +
        diff * t.spread +
        "px) translateY(" +
        Math.abs(diff) * t.rise +
        "px) rotate(" +
        diff * t.tilt +
        "deg) scale(" +
        (1 - Math.abs(diff) * t.scale) +
        ")";
    }
    if (counter) counter.textContent = index + 1 + " / " + total;
  }

  function step(delta) {
    index = (index + delta + total) % total;
    paint();
  }

  function openLightbox() {
    var card = cards[index];
    var full = card && card.getAttribute("data-full");
    var alt = card && card.getAttribute("data-alt");
    if (!lightbox || !lightboxImg || !full) return;
    lightboxImg.src = full;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  if (prev) prev.addEventListener("click", function () { step(-1); });
  if (next) next.addEventListener("click", function () { step(1); });

  for (var c = 0; c < cards.length; c++) {
    (function (card) {
      card.addEventListener("click", function () {
        var i = Number(card.getAttribute("data-index") || "0");
        if (i === index) openLightbox();
        else {
          index = i;
          paint();
        }
      });
    })(cards[c]);
  }

  stage.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "mouse") return;
    startX = event.clientX;
  });
  stage.addEventListener("pointerup", function (event) {
    if (event.pointerType === "mouse") return;
    var delta = startX - event.clientX;
    if (Math.abs(delta) > 40) step(delta > 0 ? 1 : -1);
  });

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  function ensurePaint() {
    if (painted) {
      paint();
      return;
    }
    painted = true;
    paint();
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Více";
        panel.hidden = true;
      } else {
        toggle.setAttribute("aria-expanded", "true");
        toggle.textContent = "Méně";
        panel.hidden = false;
        ensurePaint();
        root.focus({ preventScroll: true });
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  } else {
    ensurePaint();
  }

  window.addEventListener("resize", function () {
    if (!panel || !panel.hidden) paint();
  });
})();
