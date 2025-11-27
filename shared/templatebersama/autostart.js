// ================= AUTOSCROLL MODULAR UNTUK OPENBTN =================
(function() {
    let autoScroll = null;
    let isScrolling = false;
    let btnAuto = null;

    function startAutoScroll() {
        if (isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            // Pakai document.scrollingElement agar kompatibel
            const el = document.scrollingElement || document.documentElement || document.body;
            el.scrollTop += 2;

            if ((window.innerHeight + el.scrollTop) >= el.scrollHeight - 50) {
                stopAutoScroll();
            }
        }, 16);
    }

    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        if(btnAuto) {
            btnAuto.style.opacity = "0.8";
            btnAuto.style.transform = "scale(1)";
        }
    }

    function createAutoScrollButton() {
        if (btnAuto) return;
        btnAuto = document.createElement("button");
        btnAuto.id = "btnAutoScroll";
        btnAuto.title = "Auto Scroll (klik untuk start/stop)";
        btnAuto.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 48px;
            height: 48px;
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
        btnAuto.innerHTML = `<img src="https://i.ibb.co/0jW1m7B/autosroll.png" style="width:32px;height:32px;object-fit:contain;">`;
        document.body.appendChild(btnAuto);

        btnAuto.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isScrolling) stopAutoScroll();
            else startAutoScroll();
        });

        ["wheel","touchstart","keydown","mousedown"].forEach(ev => {
            document.addEventListener(ev, stopAutoScroll, { passive:true });
        });
    }

    // Trigger pas openBtn diklik, setelah landing fade out
    const openBtn = document.getElementById("openBtn");
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            setTimeout(() => {
                // pastikan body overflow normal
                document.body.style.overflow = '';
                createAutoScrollButton();
                startAutoScroll();
            }, 1100); // delay sedikit lebih dari fade out landing
        });
    }
})();