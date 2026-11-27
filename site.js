(function () {
  "use strict";
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var drops = document.querySelectorAll(".navdrop");
  function closeDrops(except) {
    drops.forEach(function (li) {
      if (li !== except) {
        li.classList.remove("is-open");
        var b = li.querySelector(".nav-link");
        if (b) { b.setAttribute("aria-expanded", "false"); }
      }
    });
  }
  drops.forEach(function (li) {
    var b = li.querySelector(".nav-link");
    if (!b) { return; }
    b.addEventListener("click", function () {
      closeDrops(li);
      var open = li.classList.toggle("is-open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".navdrop")) { closeDrops(null); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrops(null);
      if (menu && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
      }
    }
  });
  var fab = document.querySelector(".callfab");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      fab.classList.toggle("is-hidden", entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(foot);
  }
})();
