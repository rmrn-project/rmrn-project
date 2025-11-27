<!-- Tempel ini di paling bawah sebelum </body>, atau di file .js lo -->
<script>
// ===== AUTOSCROLL MODULAR - KHUSUS WEB SENDIRI =====
(function() {
    let scrollInterval = null;
    let btn = null;

    // Buat tombol cantik
    function buatTombol() {
        if (btn) return;
        
        btn = document.createElement('div');
        btn.innerHTML = '⏸️';
        btn.title = 'Klik untuk Pause / Play Auto Scroll';
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            cursor: 'pointer',
            zIndex: '999999',
            userSelect: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.3s',
            fontFamily: 'Arial, sans-serif'
        });
        
        btn.onclick = toggleScroll;
        document.body.appendChild(btn);
    }

    function mulaiScroll() {
        if (scrollInterval) return;
        
        buatTombol();
        btn.innerHTML = '⏸️';
        btn.style.background = 'rgba(0, 150, 255, 0.9)';

        scrollInterval = setInterval(() => {
            window.scrollBy(0, 3); // kecepatan (naikin = lebih cepet)

            // Auto stop kalo udah sampe bawah
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100) {
                berhentiScroll();
            }
        }, 20); // 20ms = super smooth
    }

    function berhentiScroll() {
        clearInterval(scrollInterval);
        scrollInterval = null;
        if (btn) {
            btn.innerHTML = '▶️';
            btn.style.background = 'rgba(0,0,0,0.7)';
        }
    }

    function toggleScroll() {
        if (scrollInterval) {
            berhentiScroll();
        } else {
            mulaiScroll();
        }
    }

    // Stop kalo user scroll manual / sentuh layar
    let userAktif = false;
    const resetUserAktif = () => {
        userAktif = true;
        clearTimeout(window.userTimeout);
        window.userTimeout = setTimeout(() => { userAktif = false; }, 3000);
    };

    window.addEventListener('wheel', () => { if(!userAktif) berhentiScroll(); resetUserAktif(); });
    window.addEventListener('touchstart', () => { berhentiScroll(); });
    window.addEventListener('keydown', (e) => {
        if(['ArrowUp','ArrowDown','PageUp','PageDown',' '].includes(e.key)) {
            berhentiScroll();
        }
    });

    // === AUTO START ===
    window.addEventListener('load', () => {
        // Delay 1-2 detik biar halaman bener-bener ready (khususnya kalo ada lazy load)
        setTimeout(mulaiScroll, 1500);
    });

})();
</script>