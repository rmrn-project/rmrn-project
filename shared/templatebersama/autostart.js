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
        if (!shouldShowButton()) return;

        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 2);

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
            userStopped = true; // user stop manual
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

    // ====== Append tombol saat halaman siap dan #main muncul ======
    function init() {
        const main = document.getElementById("main");
        if (!main) return;

        const observer = new MutationObserver(() => {
            if (!document.body.contains(btnAuto) && !main.classList.contains("hidden")) {
                document.body.appendChild(btnAuto);
                if (!userStopped) setTimeout(startAutoScroll, 1000);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // fallback: langsung append kalau main sudah visible
        if (!main.classList.contains("hidden")) {
            document.body.appendChild(btnAuto);
            if (!userStopped) setTimeout(startAutoScroll, 1000);
        }
    }

    // ====== Jalankan saat DOM siap ======
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();