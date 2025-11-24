// js/moderngold.js — versi robust + debug
(function(){
  // helper debug
  const dbg = (...args) => {
    if (window.location.hostname === "localhost" || window.location.search.includes("debug")) {
      console.log("[MODERNGOLD]", ...args);
    } else {
      // uncomment to always see logs: console.log("[MODERNGOLD]", ...args);
    }
  };

  window.addEventListener("load", () => { // safer: run after everything loaded
    try {
      dbg("script started (window.load)");

      // ==================== TAHUN & FADE ====================
      try {
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        else dbg("year element not found");
      } catch (e) { dbg("year error", e); }

      try {
        const fades = document.querySelectorAll(".fade");
        if (fades.length) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) entry.target.classList.add("show");
            });
          }, { threshold: 0.1 });
          fades.forEach(el => observer.observe(el));
        } else dbg("no .fade elements found");
      } catch (e) { dbg("fade error", e); }

      // ==================== MUSIC (guarded) ====================
      try {
        const audio = document.getElementById("bgm");
        const musicBtn = document.getElementById("musicBtn");
        const playIcon = document.getElementById("playIcon");
        const pauseIcon = document.getElementById("pauseIcon");

        if (audio) {
          audio.volume = 0.3;
          // try/catch for currentTime in some browsers
          try { audio.currentTime = 1; } catch(e) { dbg("audio.currentTime err", e); }
        } else dbg("audio element not found");

        if (musicBtn) {
          musicBtn.style.touchAction = "none"; // helps with dragging on some devices
          musicBtn.addEventListener("click", () => {
            if (!audio) return;
            if (audio.paused) {
              audio.play().catch(() => dbg("audio play rejected"));
              if (playIcon) playIcon.style.display = "none";
              if (pauseIcon) pauseIcon.style.display = "block";
            } else {
              audio.pause();
              if (playIcon) playIcon.style.display = "block";
              if (pauseIcon) pauseIcon.style.display = "none";
            }
          });

          // DRAG (guarded)
          let isDragging = false, offsetX = 0, offsetY = 0;
          const clamp = (x, y) => {
            const r = musicBtn.getBoundingClientRect();
            const maxX = window.innerWidth - r.width;
            const maxY = window.innerHeight - r.height;
            return { x: Math.max(0, Math.min(x, maxX)), y: Math.max(0, Math.min(y, maxY)) };
          };

          musicBtn.addEventListener("mousedown", e => {
            isDragging = true;
            offsetX = e.clientX - musicBtn.getBoundingClientRect().left;
            offsetY = e.clientY - musicBtn.getBoundingClientRect().top;
          });
          musicBtn.addEventListener("touchstart", e => {
            isDragging = true;
            offsetX = e.touches[0].clientX - musicBtn.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - musicBtn.getBoundingClientRect().top;
            e.preventDefault();
          }, { passive: false });

          document.addEventListener("mousemove", e => {
            if (isDragging) {
              const p = clamp(e.clientX - offsetX, e.clientY - offsetY);
              musicBtn.style.left = p.x + "px";
              musicBtn.style.top = p.y + "px";
            }
          });
          document.addEventListener("touchmove", e => {
            if (isDragging) {
              const p = clamp(e.touches[0].clientX - offsetX, e.touches[0].clientY - offsetY);
              musicBtn.style.left = p.x + "px";
              musicBtn.style.top = p.y + "px";
            }
            e.preventDefault();
          }, { passive: false });

          document.addEventListener("mouseup", () => isDragging = false);
          document.addEventListener("touchend", () => isDragging = false);
        } else dbg("musicBtn not found — skipping music UI");
      } catch (e) { dbg("music block error", e); }

      // ==================== COPY REKENING ====================
      try {
        window.copyRek = function(id) {
          const el = document.getElementById(id);
          if (!el) { dbg("copyRek: element", id, "not found"); return; }
          navigator.clipboard.writeText(el.innerText).then(() => {
            const n = document.getElementById("notif" + id.slice(-1));
            if (n) {
              n.style.display = "block";
              setTimeout(() => n.style.display = "none", 1600);
            }
          }).catch(err => dbg("copyRek writeText failed", err));
        };
      } catch (e) { dbg("copyRek error", e); }

      // ==================== AUTO SCROLL (robust) ====================
      try {
        let autoScroll = null;
        let userTouching = false;

        // helper: show/hide any button(s) with id btnAutoScroll
        const showAutoButtons = (show) => {
          const arr = document.querySelectorAll("#btnAutoScroll");
          arr.forEach(b => {
            b.style.display = show ? "block" : "none";
          });
        };

        function startAutoScroll() {
          if (autoScroll) return;
          dbg("startAutoScroll");
          autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
          }, 20);
          showAutoButtons(false);
        }

        function stopAutoScroll() {
          if (!autoScroll) return;
          dbg("stopAutoScroll");
          clearInterval(autoScroll);
          autoScroll = null;
        }

        // stop on touchstart / wheel / keydown (arrow/page)
        document.addEventListener("touchstart", () => {
          userTouching = true;
          stopAutoScroll();
          showAutoButtons(true);
        }, { passive: true });

        document.addEventListener("wheel", () => {
          stopAutoScroll();
          showAutoButtons(true);
        }, { passive: true });

        document.addEventListener("keydown", (e) => {
          const keys = ["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "];
          if (keys.includes(e.key)) {
            stopAutoScroll();
            showAutoButtons(true);
          }
        });

        // Event delegation for clicks on the button (works if button added later)
        document.addEventListener("click", (e) => {
          const btn = e.target.closest && e.target.closest("#btnAutoScroll");
          if (!btn) return;
          dbg("btnAutoScroll clicked (delegated)");
          // ensure image inside doesn't block pointer-events; but we still handle it
          startAutoScroll();
        });

        // If button(s) already exist, ensure image doesn't capture pointer
        document.querySelectorAll("#btnAutoScroll img").forEach(img => {
          img.style.pointerEvents = "none";
        });

        // initial: if there's a button but hidden via CSS, make sure visible
        const firstBtn = document.querySelector("#btnAutoScroll");
        if (firstBtn) {
          // ensure it's clickable and on top
          firstBtn.style.position = firstBtn.style.position || "fixed";
          firstBtn.style.zIndex = firstBtn.style.zIndex || "999999";
          firstBtn.style.display = firstBtn.style.display || "block";
          dbg("auto scroll button present in DOM");
        } else {
          dbg("auto scroll button NOT present at load");
        }

      } catch (e) { dbg("autoscroll block error", e); }

      dbg("script finished init");
    } catch (err) {
      console.error("[MODERNGOLD] uncaught error", err);
    }
  });
})();
