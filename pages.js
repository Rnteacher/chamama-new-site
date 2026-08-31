/* Chamama content pages — tiny enhancers: mobile nav toggle + FAQ accordion. */
(function () {
  // Mobile nav
  var burger = document.querySelector(".pg-burger");
  var nav = document.querySelector(".pg-nav");
  if (burger && nav) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("pg-no-scroll", isOpen);
    });

    // Close when clicking any nav link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("pg-no-scroll");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("pg-no-scroll");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("pg-no-scroll");
      }
    });

    // Close on window resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("pg-no-scroll");
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll(".pg-faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".pg-faq__item");
      var open = item.classList.contains("is-open");
      // close siblings within the same .pg-faq group
      var group = item.closest(".pg-faq");
      if (group) group.querySelectorAll(".pg-faq__item.is-open").forEach(function (el) {
        if (el !== item) { el.classList.remove("is-open"); var q = el.querySelector(".pg-faq__q"); if (q) q.setAttribute("aria-expanded", "false"); }
      });
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  // Simple form acknowledgement (no backend)
  document.querySelectorAll("form[data-ack]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-ack-note]");
      if (note) { note.hidden = false; }
      form.querySelectorAll("input,select,textarea,button").forEach(function (el) { el.disabled = true; });
    });
  });
})();
