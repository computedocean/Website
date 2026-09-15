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

  /* Visitor counter via GoatCounter.
     Reads the site code from .visits[data-goatcounter]; when it is empty
     nothing is loaded and the line stays hidden. */
  var visits = document.querySelector(".visits");
  var counter = document.getElementById("counter");
  var code = visits && (visits.getAttribute("data-goatcounter") || "").trim();
  if (!visits || !counter || !code) return;

  var base = "https://" + code + ".goatcounter.com";

  /* Record this pageview */
  window.goatcounter = { endpoint: base + "/count" };
  var tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://gc.zgo.at/count.js";
  tag.setAttribute("data-goatcounter", base + "/count");
  document.head.appendChild(tag);

  /* Show the running total. GoatCounter returns {"count": "1 234"} as a
     string with thin spaces; needs "Allow adding visitor counts" enabled. */
  fetch(base + "/counter/TOTAL.json")
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) {
      var raw = data && data.count;
      var n = typeof raw === "number" ? raw : parseInt(String(raw || "").replace(/\D/g, ""), 10);
      if (!isFinite(n)) return;
      counter.textContent = n.toLocaleString();
      visits.hidden = false;
    })
    .catch(function () { /* leave the line hidden */ });
})();
