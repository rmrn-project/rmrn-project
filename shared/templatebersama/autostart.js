// ================= AUTOSCROLL MODULAR - V3 (Tema Landing + Main) =================
(function () {
    // Prevent multiple injections
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;

    // ====== Buat tombol auto-scroll ======
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.title = "Auto Scroll (klik untuk start, sentuh/klik untuk stop)";
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
    document.body.appendChild(btnAuto);

    // ====== Fungsi start ======
    function startAutoScroll() {
        // Hanya jalan kalau #main sudah muncul
        const main = document.querySelector("#main");
        if (!main || main.classList.contains("hidden")) return;

        if (isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 2);

            // Stop otomatis jika sampai bawah
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
    stopEvents.forEach(ev => document.addEventListener(ev, stopAutoScroll, { passive: true }));

    // ====== Cleanup sebelum unload ======
    window.addEventListener("beforeunload", stopAutoScroll);

    // ====== Auto-start begitu #main terlihat ======
    function waitMainAndStart() {
        const main = document.querySelector("#main");
        if (!main) return; // fallback kalau #main ga ada

        if (main.classList.contains("hidden")) {
            // cek lagi setiap 300ms
            setTimeout(waitMainAndStart, 300);
        } else {
            // main sudah muncul, mulai auto-scroll
            startAutoScroll();
        }
    }

    // ====== Init ======
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(waitMainAndStart, 500));
    } else {
        setTimeout(waitMainAndStart, 500);
    }

})();