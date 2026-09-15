(function () {
  "use strict";

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Highlight the nav link for the section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var current = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
      });
      links.forEach(function (a) {
        var active = a.getAttribute("href") === "#" + current;
        if (active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* Visitor counter — only shown when an API URL is configured.
     Expects JSON like {"count": 1234}; a bare number also works. */
  var visits = document.querySelector(".visits");
  var counter = document.getElementById("counter");
  var api = visits && visits.getAttribute("data-api");
  if (!visits || !counter || !api) return;

  fetch(api)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) {
      var n = typeof data === "number" ? data : data && data.count;
      if (typeof n !== "number") return;
      counter.textContent = n.toLocaleString();
      visits.hidden = false;
    })
    .catch(function () { /* leave the line hidden */ });
})();
