document.addEventListener('DOMContentLoaded', () => {
    // Nama tamu dari URL
    const params = new URLSearchParams(location.search);
    const nama = params.get('to');
    if (nama) document.getElementById('guestName').textContent = decodeURIComponent(nama);

    // Buka undangan
    document.getElementById('openBtn').addEventListener('click', () => {
        document.getElementById('cover').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.querySelector('body').style.background = '#f9f5f0';
        startCountdown();
        playMusic();
    });

    // Countdown
    const tanggalNikah = new Date('2026-02-28T00:00:00').getTime();
    const countdown = setInterval(() => {
        const sekarang = new Date().getTime();
        const selisih = tanggalNikah - sekarang;

        const hari = Math.floor(selisih / (1000*60*60*24));
        const jam = Math.floor((selisih % (1000*60*60*24)) / (1000*60*60));
        const menit = Math.floor((selisih % (1000*60*60)) / (1000*60));
        const detik = Math.floor((selisih % (1000*60)) / 1000);

        document.getElementById('days').textContent = hari.toString().padStart(2,'0');
        document.getElementById('hours').textContent = jam.toString().padStart(2,'0');
        document.getElementById('minutes').textContent = menit.toString().padStart(2,'0');
        document.getElementById('seconds').textContent = detik.toString().padStart(2,'0');

        if (selisih < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "<h3 style='color:#8d5524;'>Hari Ini Hari Bahagia Kami! ❤️</h3>";
        }
    }, 1000);

    // Musik
    const lagu = document.getElementById('weddingSong');
    const btn = document.getElementById('musicBtn');
    let playing = false;

    function playMusic() {
        lagu.play();
        playing = true;
        btn.textContent = "♪ Musik ON";
    }

    btn.addEventListener('click', () => {
        if (playing) {
            lagu.pause();
            btn.textContent = "♪ Musik OFF";
        } else {
            lagu.play();
            btn.textContent = "♪ Musik ON";
        }
        playing = !playing;
    });

    // Form
    document.getElementById('rsvpForm').addEventListener('submit', e => {
        e.preventDefault();
        alert('Terima kasih! Konfirmasi kehadiran sudah kami terima ❤️');
        e.target.reset();
    });

    document.getElementById('wishesForm').addEventListener('submit', e => {
        e.preventDefault();
        alert('Ucapanmu sudah terkirim! Terima kasih banyak doa dan harapannya 🥰');
        e.target.reset();
    });
});