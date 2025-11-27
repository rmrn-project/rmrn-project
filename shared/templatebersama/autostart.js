// ================= AUTOSTART.JS MODULAR =================
(function() {
    // ==== Buat tombol auto scroll ====
    const btnAuto = document.createElement('button');
    btnAuto.id = 'btnAutoScroll';
    btnAuto.innerHTML = `<img src="autosroll.png" alt="Auto Scroll" />`;
    document.body.appendChild(btnAuto);

    // ==== Tambahkan style ====
    const style = document.createElement('style');
    style.textContent = `
    /* ===== AUTO SCROLL BUTTON ===== */
    #btnAutoScroll {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        background: transparent;
        color: white;
        font-size: 16px;
        z-index: 999999;
        cursor: pointer;
        box-shadow: none;
    }
    #btnAutoScroll img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }
    `;
    document.head.appendChild(style);

    // ==== Logic Auto Scroll ====
    let autoScroll = null;

    const startAutoScroll = () => {
        if (autoScroll) return;
        autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                stopAutoScroll();
            }
        }, 20);
        btnAuto.style.display = 'none';
    };

    const stopAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = null;
        btnAuto.style.display = 'block';
    };

    // ==== Event tombol klik ====
    btnAuto.addEventListener('click', startAutoScroll);

    // ==== Sentuh layar stop auto scroll ====
    document.addEventListener('touchstart', stopAutoScroll);

    // ==== Auto start setelah 3 detik ====
    setTimeout(startAutoScroll, 3000);
})();