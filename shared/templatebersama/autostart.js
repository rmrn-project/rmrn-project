// ================= AUTOSCROLL MODULAR - V2 (Improved) =================
(function () {
    // Cek kalau script udah pernah di-load
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;

    // ====== Cek kalau halaman punya scroll panjang (minimal 2x layar) ======
    function shouldShowButton() {
        return document.body.scrollHeight > window.innerHeight * 1.8;
    }

    // ====== Buat tombol ======
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.title = "Auto Scroll (klik untuk start, sentuh/klik lagi untuk stop)";
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

    // ====== Fungsi start ======
    function startAutoScroll() {
        if (isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 2);

            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 50) {
                stopAutoScroll();
            }
        }, 16);
    }

    // ====== Fungsi stop ======
    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
        btnAuto.style.transform = "scale(1)";
    }

    // ====== Toggle pakai tombol ======
    btnAuto.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isScrolling) stopAutoScroll();
        else startAutoScroll();
    });

    // ====== Stop kalau user interaksi ======
    const stopEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    stopEvents.forEach(ev => {
        document.addEventListener(ev, stopAutoScroll, { passive: true });
    });

    // ====== Cleanup sebelum halaman unload ======
    window.addEventListener("beforeunload", stopAutoScroll);

    // ====== Init tombol ======
    function init() {
        if (!shouldShowButton()) return;
        document.body.appendChild(btnAuto);
        setTimeout(startAutoScroll, 1200);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(init, 500));
    } else {
        setTimeout(init, 500);
    }
})();