// ================= AUTOSTART MODULAR =================
(function() {
    // ====== Variabel ======
    let autoScroll = null;

    // ====== Buat tombol auto-scroll ======
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.style.cssText = `
        position: fixed;
        bottom: 20px;   /* bisa ganti top/bottom */
        left: 20px;     /* bisa ganti left/right */
        width: 40px;
        height: 40px;
        padding: 0;
        border: none;
        background: transparent;
        z-index: 999999;
        cursor: pointer;
    `;
    btnAuto.innerHTML = `<img src="autosroll.png" alt="Auto Scroll" style="width:40px;height:40px;object-fit:contain;">`;
    document.body.appendChild(btnAuto);

    // ====== Fungsi start auto-scroll ======
    function startAutoScroll() {
        if (autoScroll) return; // sudah jalan
        autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
            // berhenti otomatis jika sudah hampir di bawah
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                stopAutoScroll();
            }
        }, 20);
        btnAuto.style.display = "none"; // sembunyikan tombol saat jalan
    }

    // ====== Fungsi stop auto-scroll ======
    function stopAutoScroll() {
        if (!autoScroll) return;
        clearInterval(autoScroll);
        autoScroll = null;
        btnAuto.style.display = "block"; // tampilkan tombol kembali
    }

    // ====== Event tombol ======
    btnAuto.addEventListener("click", startAutoScroll);

    // ====== Sentuh layar / klik halaman stop auto-scroll ======
    document.addEventListener("touchstart", stopAutoScroll);
    document.addEventListener("mousedown", stopAutoScroll);

    // ====== Auto start setelah DOM siap ======
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(startAutoScroll, 1000); // delay 1 detik biar halaman ready
    });
})();