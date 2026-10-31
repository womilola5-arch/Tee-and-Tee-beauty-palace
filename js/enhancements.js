/*
 * Small progressive enhancements. No framework, no dependencies.
 * Loaded before app.js so the reveal observer is ready when the page renders.
 */

/* 1. External links open in a new tab, safely --------------------------------- */
(function () {
  function secure(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    try {
      var url = new URL(href, document.baseURI);
      var isWeb = url.protocol === "http:" || url.protocol === "https:";
      var isExternal = isWeb && url.host !== location.host;
      var isContact = ["mailto:", "tel:", "sms:"].indexOf(url.protocol) !== -1;
      if (isExternal || isContact) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } catch (e) {}
  }

  function secureAll() {
    document.querySelectorAll("a[href]").forEach(secure);
  }

  if (document.readyState !== "loading") secureAll();
  else document.addEventListener("DOMContentLoaded", secureAll);

  document.addEventListener(
    "click",
    function (event) {
      var link = event.target && event.target.closest && event.target.closest("a[href]");
      if (link) secure(link);
    },
    true
  );
})();

/* 2. Hero "scroll" cue fades out as the visitor scrolls ------------------------ */
(function () {
  var queued = false;

  function update() {
    queued = false;
    var cue = document.querySelector(".scroll-cue");
    if (!cue) return;
    var opacity = Math.max(0, 1 - (window.scrollY || 0) / 140);
    cue.style.opacity = opacity;
    cue.style.pointerEvents = opacity < 0.05 ? "none" : "";
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener("load", update);
  setTimeout(update, 500);
})();

/* 3. Scroll reveal: sections fade and rise when they enter the screen ---------- */
(function () {
  if (!("IntersectionObserver" in window) || !("MutationObserver" in window)) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Elements to reveal. State lives in the data-rv attribute: 0 hidden, 1 animating, 2 done.
  var TARGETS = [
    "#home > div > div:nth-child(2) > *",
    "#home > div > div:nth-child(3) > div:first-child",
    "#home > div > div:nth-child(3) > div:nth-child(2) > *",
    "#first-floor > div > div:nth-child(1)",
    "#first-floor > div > div:nth-child(2) > div:first-child",
    "#first-floor > div > div:nth-child(2) > div:nth-child(2) > *",
    "#second-floor > div > div:nth-child(1)",
    "#second-floor > div > div:nth-child(2) > *",
    "#second-floor > div > div:nth-child(3) > *",
    "#gallery > div > div:nth-child(1)",
    "#gallery > div > div:nth-child(2) > *",
    "#gallery > div > div:nth-child(3) > *",
    "#gallery > div > div:nth-child(4)",
    "#booking > div > div:nth-child(1) > *",
    "#booking > div > div:nth-child(2) > div:first-child",
    "#booking > div > div:nth-child(2) > div:nth-child(2) > *",
    "#booking footer > *"
  ].join(",");

  document.documentElement.classList.add("rv");

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          var ra = a.target.getBoundingClientRect();
          var rb = b.target.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        });

      visible.forEach(function (entry, index) {
        var el = entry.target;
        var delay = Math.min(index, 6) * 70; // stagger items that appear together
        observer.unobserve(el);
        el.style.setProperty("--rv-d", delay + "ms");
        el.setAttribute("data-rv", "1");
        setTimeout(function () {
          el.setAttribute("data-rv", "2");
          el.style.removeProperty("--rv-d");
        }, delay + 800);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );

  function mark() {
    document.querySelectorAll(TARGETS).forEach(function (el) {
      if (el.hasAttribute("data-rv")) return;
      el.setAttribute("data-rv", "0");
      observer.observe(el);
    });
  }

  // The page is rendered by app.js, so keep marking new elements as they appear.
  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      mark();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  mark();
})();

/* 4. Ambient corner glows drift slightly as the page scrolls ------------------- */
(function () {
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var left, right;
  var queued = false;

  function update() {
    queued = false;
    if (!left) {
      left = document.querySelector(".glow-l");
      right = document.querySelector(".glow-r");
      if (!left) return;
    }
    var scrollable = document.documentElement.scrollHeight - innerHeight;
    var progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
    left.style.transform = "translate3d(" + (progress * 8).toFixed(2) + "vw," + (-progress * 18).toFixed(2) + "vh,0)";
    right.style.transform = "translate3d(" + (-progress * 8).toFixed(2) + "vw," + (-progress * 10).toFixed(2) + "vh,0)";
  }

  addEventListener(
    "scroll",
    function () {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  addEventListener("load", update);
  setTimeout(update, 600);
})();
