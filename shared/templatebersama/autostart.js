// ================= AUTOSTART MODULAR =================
(function() {
    // ===== Buat tombol auto scroll =====
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.innerHTML = `<img src="autosroll.png" alt="Auto Scroll" />`;
    document.body.appendChild(btnAuto);

    // ===== Style tombol =====
    const style = document.createElement("style");
    style.textContent = `
    #btnAutoScroll {
        position: fixed;
        bottom: 20px; /* Ubah sesuai posisi */
        left: 20px;   /* Ubah sesuai posisi */
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        z-index: 999999;
    }
    #btnAutoScroll img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }
    `;
    document.head.appendChild(style);

    // ===== Auto scroll logic =====
    let autoScroll = null;

    const startAutoScroll = () => {
        if (autoScroll) return;
        autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                stopAutoScroll();
            }
        }, 20);
        btnAuto.style.display = "none";
    };

    const stopAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = null;
        btnAuto.style.display = "block";
    };

    // ===== Event listener tombol =====
    btnAuto.addEventListener("click", startAutoScroll);

    // ===== Stop saat layar disentuh =====
    document.addEventListener("touchstart", stopAutoScroll);

    // ===== Auto start setelah 3 detik =====
    setTimeout(startAutoScroll, 3000);
})();