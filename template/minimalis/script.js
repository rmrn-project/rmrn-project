document.addEventListener('DOMContentLoaded', () => {
    // Ambil nama dari URL (contoh: ?to=Nama%20Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || "Bapak/Ibu/Saudara/i";
    document.getElementById('guestName').textContent = decodeURIComponent(guestName);

    // Buka undangan
    document.getElementById('btnOpen').addEventListener('click', () => {
        document.getElementById('opening').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        startCountdown();
        playMusic();
    });

    // Countdown
    const weddingDate = new Date('2026-02-28T00:00:00').getTime();

    function startCountdown() {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('timer').innerHTML = "<p>Sudah tiba harinya! ❤️</p>";
            }
        }, 1000);
    }

    // Musik
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('toggleMusic');
    let isPlaying = false;

    function playMusic() {
        audio.play();
        isPlaying = true;
        musicBtn.textContent = "♪ Musik ON";
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = "♪ Musik OFF";
        } else {
            audio.play();
            musicBtn.textContent = "♪ Musik ON";
        }
        isPlaying = !isPlaying;
    });

    // Form kirim ucapan (bisa dihubungkan ke Google Form atau Netlify Form)
    document.getElementById('ucapanForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih atas ucapan dan doanya! ❤️');
        this.reset();
    });

    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Konfirmasi kehadiran telah dikirim! Terima kasih 🙏');
        this.reset();
    });
});