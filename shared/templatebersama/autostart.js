// ================= AUTOSCROLL MODULAR - V3 =================
(function () {
    if (window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;

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

    function stopAutoScroll() {
        if (!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
        btnAuto.style.transform = "scale(1)";
    }

    btnAuto.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isScrolling) stopAutoScroll();
        else startAutoScroll();
    });

    ["wheel", "touchstart", "keydown", "mousedown"].forEach(ev => {
        document.addEventListener(ev, stopAutoScroll, { passive: true });
    });
    window.addEventListener("beforeunload", stopAutoScroll);

    // ====== Tunggu konten utama muncul ======
    function init() {
        const main = document.querySelector("#main"); // sesuaikan selector konten utama
        if (!main) return;

        // Jika konten hidden, tunggu sampai tampil
        const observer = new MutationObserver(() => {
            if (main.offsetHeight > 0) {
                if (!document.body.contains(btnAuto)) document.body.appendChild(btnAuto);
                setTimeout(startAutoScroll, 800);
                observer.disconnect();
            }
        });
        observer.observe(main, { attributes: true, childList: true, subtree: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();