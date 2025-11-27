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

    // =======================================================
    //                 START AUTO SCROLL (FIX)
    // =======================================================
    function startAutoScroll() {
        if (isScrolling) return;

        isScrolling = true;
        userStopped = false;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {

            // ambil ulang elemen main tiap tick
            const main = document.getElementById("main");

            if (main) {
                main.scrollTop += 2; // <<< GERAK UTAMA

                // Stop otomatis jika sudah mentok
                if (main.scrollTop + main.clientHeight >= main.scrollHeight - 10) {
                    stopAutoScroll();
                    if (!userStopped) {
                        setTimeout(() => {
                            if (!userStopped) startAutoScroll();
                        }, 1000);
                    }
                }
            }

        }, 16);
    }

    // =======================================================
    //                     STOP AUTO SCROLL
    // =======================================================
    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
        btnAuto.style.transform = "scale(1)";
    }

    // =======================================================
    //                    BUTTON TOGGLE
    // =======================================================
    btnAuto.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isScrolling) {
            stopAutoScroll();
            userStopped = true;
        } else {
            startAutoScroll();
        }
    });

    // =======================================================
    //                  STOP SAAT USER INTERAKSI
    // =======================================================
    const stopEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    stopEvents.forEach(ev => {
        document.addEventListener(ev, () => {
            stopAutoScroll();
            userStopped = true;
        }, { passive: true });
    });

    // =======================================================
    //                TRIGGER DARI tombol openBtn
    // =======================================================
    function attachTriggerToOpenBtn() {
        const openBtn = document.getElementById("openBtn");
        if (!openBtn) return;

        openBtn.addEventListener("click", () => {
            setTimeout(() => {
                if (!document.body.contains(btnAuto)) {
                    document.body.appendChild(btnAuto);
                }
            }, 300);
        });
    }

    // =======================================================
    //                 DOM READY CHECK
    // =======================================================
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attachTriggerToOpenBtn);
    } else {
        attachTriggerToOpenBtn();
    }

})();