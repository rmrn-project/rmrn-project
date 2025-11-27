// ================= AUTOSCROLL MODULAR V3 =================
(function () {
    // Cegah load berkali-kali
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;
    let userStopped = false; // flag user stop manual

    // ====== Cek apakah halaman cukup panjang ======
    function shouldShowButton() {
        return document.body.scrollHeight > window.innerHeight * 1.5;
    }

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

    // ====== Start Auto Scroll ======
    function startAutoScroll() {
        if (isScrolling) return;

        // FIX: hilangkan batas panjang halaman → auto-scroll selalu bisa start
        // if (!shouldShowButton()) return;

        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            const main = document.getElementById("main");
if (main) main.scrollBy(0, 2);

            // Stop otomatis di bawah halaman
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 50) {
                stopAutoScroll();
                if (!userStopped) {
                    // auto-restart setelah delay 1 detik
                    setTimeout(() => {
                        if (!userStopped) startAutoScroll();
                    }, 1000);
                }
            }
        }, 16);
    }

    // ====== Stop Auto Scroll ======
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
        if (isScrolling) {
            stopAutoScroll();
            userStopped = true;
        } else {
            userStopped = false;
            startAutoScroll();
        }
    });

    // ====== Stop jika user interaksi ======
    const stopEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    stopEvents.forEach(ev => {
        document.addEventListener(ev, () => {
            stopAutoScroll();
            userStopped = true;
        }, { passive: true });
    });

    // ============================
    //     TRIGGER DARI openBtn
    // ============================
    function attachTriggerToOpenBtn() {
        const openBtn = document.getElementById("openBtn");
        if (!openBtn) return;

        openBtn.addEventListener("click", () => {
            // tombol muncul setelah user buka undangan
            setTimeout(() => {
                if (!document.body.contains(btnAuto)) {
                    document.body.appendChild(btnAuto);
                }
            }, 300); // FIX: lebih cepat (dari 2000 → 300ms)
        });
    }

    // ====== Jalankan saat DOM siap ======
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attachTriggerToOpenBtn);
    } else {
        attachTriggerToOpenBtn();
    }

})();