(() => {
  const page = document.body.dataset.page;
  const fade = document.getElementById("fade");

  document.querySelectorAll("nav a").forEach((link) => {
    if (link.dataset.p === page) {
      link.classList.add("on");
      link.setAttribute("aria-current", "page");
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download") ||
      !/^(https?|file):$/.test(link.protocol) ||
      link.origin !== location.origin ||
      link.pathname === location.pathname
    ) {
      return;
    }

    if (
      !fade ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    event.preventDefault();
    fade.classList.add("active");

    setTimeout(() => {
      window.location.href = link.href;
    }, 380);
  });

  window.addEventListener("pageshow", () => {
    fade?.classList.remove("active");
  });
})();
