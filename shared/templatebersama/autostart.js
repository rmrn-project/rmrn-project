// ================= AUTOSCROLL MODULAR BERULANG =================
(function() {
    let autoScroll = null;
    let isScrolling = false;
    let btnAuto = null;

    function startAutoScroll() {
        if (isScrolling) return; // sudah jalan
        isScrolling = true;
        btnAuto.style.opacity = "0.4";
        btnAuto.style.transform = "scale(0.9)";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 2);
            // stop otomatis kalau sudah di bawah
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
                stopAutoScroll();
            }
        }, 16);
    }

    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
        btnAuto.style.transform = "scale(1)";
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

        // stop otomatis kalau user interaksi
        ["wheel","touchstart","keydown","mousedown"].forEach(ev => {
            document.addEventListener(ev, stopAutoScroll, { passive:true });
        });
    }

    // Trigger pas user klik openBtn
    const openBtn = document.getElementById("openBtn");
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            setTimeout(() => {
                createAutoScrollButton(); // buat tombol setelah main muncul
                startAutoScroll();        // auto start
            }, 1000); // sesuai fade-out landing
        });
    }
})();