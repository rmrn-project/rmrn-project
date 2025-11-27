// ================= AUTOSTART.JS MODULAR =================
(function() {
    // ==== Buat tombol auto scroll ====
    const btnAuto = document.createElement('button');
    btnAuto.id = 'btnAutoScroll';
    btnAuto.innerHTML = `<img src="/image/autosroll.png" alt="Auto Scroll" />`;
    document.body.appendChild(btnAuto);

    // ==== Tambahkan style ====
    const style = document.createElement('style');
    style.textContent = `
    /* ===== AUTO SCROLL BUTTON ===== */
    #btnAutoScroll {
    position: fixed;
    bottom: 20px;   /* pindah dari top ke bottom */
    left: 20px;     /* pindah dari right ke left */
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
        width: 60px;
        height: 60px;
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