// ================= AUTOSCROLL MODULAR V4 =================
(function () {
    // Cegah load ganda
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;
    const SCROLL_SPEED = 2; // pixel per tick
    const INTERVAL_MS = 16; // ~60fps

    // ====== Buat tombol ======
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.title = "Auto Scroll (klik untuk start/stop)";
    btnAuto.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 48px;
        height: 48px;
        padding: 0;
        border: none;
        background: rgba(0,0,0,0.6);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999999;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0.8;
    `;
    btnAuto.innerHTML = `<img src="https://i.ibb.co/0jW1m7B/autosroll.png" alt="Auto Scroll" style="width:32px;height:32px;object-fit:contain;filter:drop-shadow(0 0 4px white);">`;

    // ====== Fungsi start/stop ======
    function startAutoScroll() {
        if (isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";
        autoScroll = setInterval(() => {
            window.scrollBy(0, SCROLL_SPEED);
            // stop otomatis jika sudah hampir di bawah
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 50) {
                stopAutoScroll();
            }
        }, INTERVAL_MS);
    }

    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
        btnAuto.style.transform = "scale(1)";
    }

    // ====== Toggle tombol ======
    btnAuto.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isScrolling) stopAutoScroll();
        else startAutoScroll();
    });

    // ====== Stop jika user interaksi ======
    const stopEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    stopEvents.forEach(ev => document.addEventListener(ev, stopAutoScroll, { passive: true }));

    // ====== Observer #main untuk deteksi visibilitas ======
    function initAutoScroll() {
        const main = document.querySelector("#main");
        if (!main) return;

        // jika main sudah visible
        if (!main.classList.contains("hidden")) {
            document.body.appendChild(btnAuto);
            setTimeout(startAutoScroll, 1000); // auto-start setelah main ready
            return;
        }

        // pakai MutationObserver untuk detect ketika class hidden hilang
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                if (m.target === main && !main.classList.contains("hidden")) {
                    if (!btnAuto.parentNode) document.body.appendChild(btnAuto);
                    setTimeout(startAutoScroll, 1000);
                    observer.disconnect();
                }
            });
        });

        observer.observe(main, { attributes: true, attributeFilter: ["class"] });
    }

    // ====== Jalankan setelah DOM ready ======
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAutoScroll);
    } else {
        initAutoScroll();
    }

    // ====== Cleanup ======
    window.addEventListener("beforeunload", stopAutoScroll);
})();