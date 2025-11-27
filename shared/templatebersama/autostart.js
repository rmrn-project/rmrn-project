// ================= AUTOSCROLL FIX 2025 =================
(function() {
    let autoScroll = null;
    let isScrolling = false;
    let btnAuto = null;

    const scrollEl = () => document.scrollingElement || document.documentElement || document.body;

    function startAutoScroll() {
        if (isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.5";
        btnAuto.style.transform = "scale(0.92)";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 5); // paling ampuh di semua situs

            const el = scrollEl();
            if (el.scrollHeight - el.scrollTop - window.innerHeight < 150) {
                stopAutoScroll();
            }
        }, 20);
    }

    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        if (btnAuto) {
            btnAuto.style.opacity = "0.9";
            btnAuto.style.transform = "scale(1)";
        }
    }

    function createButton() {
        if (btnAuto) return;

        btnAuto = document.createElement("button");
        btnAuto.id = "btnAutoScroll";
        btnAuto.title = "Auto Scroll (klik = start/stop)";
        btnAuto.style.cssText = `
            position:fixed;bottom:20px;left:20px;width:56px;height:56px;
            border:none;border-radius:50%;background:rgba(0,0,0,0.7);
            backdrop-filter:blur(12px);box-shadow:0 4px 20px rgba(0,0,0,0.4);
            z-index:9999999;cursor:pointer;transition:all .3s;opacity:0.9;
        `;
        btnAuto.innerHTML = `<img src="https://i.ibb.co/0jW1m7B/autosroll.png" style="width:36px;height:36px;">`;
        document.body.appendChild(btnAuto);

        btnAuto.onclick = () => isScrolling ? stopAutoScroll() : startAutoScroll();

        // Stop kalau user gerak
        const stop = () => stopAutoScroll();
        ["wheel","touchmove","keydown"].forEach(e => 
            document.addEventListener(e, stop, {passive:true})
        );
    }

    // Tunggu konten muncul setelah openBtn diklik
    const openBtn = document.getElementById("openBtn");
    if (openBtn) {
        openBtn.addEventListener("click, () => {
            setTimeout(() => {
                document.body.style.overflow = '';
                // Tunggu konten ada
                const wait = setInterval(() => {
                    if (document.body.scrollHeight > innerHeight * 2) {
                        clearInterval(wait);
                        createButton();
                    }
                }, 300);

                setTimeout(() => clearInterval(wait), 12000); // max 12 detik
            }, 1200);
        });
    } else {
        // Kalau ga ada openBtn (langsung inject), langsung bikin
        setTimeout(createButton, 3000);
    }
})();