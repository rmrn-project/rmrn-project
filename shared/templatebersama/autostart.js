// ================= AUTOSCROLL MODULAR V5 =================
(function () {
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;
    const SCROLL_SPEED = 2;
    const INTERVAL_MS = 16;

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
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(ev =>
        document.addEventListener(ev, stopAutoScroll, { passive: true })
    );

    // ====== Observasi DOM untuk #main ======
    function observeMain() {
        const observer = new MutationObserver(() => {
            const main = document.querySelector("#main");
            if (main && !main.classList.contains("hidden")) {
                if (!btnAuto.parentNode) document.body.appendChild(btnAuto);
                setTimeout(startAutoScroll, 1000);
                observer.disconnect(); // selesai observe
            }
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    // ====== Tunggu DOM siap ======
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", observeMain);
    } else {
        observeMain();
    }

    window.addEventListener("beforeunload", stopAutoScroll);
})();