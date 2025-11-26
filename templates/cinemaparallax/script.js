// script.js – FINAL 1000% JALAN + GAMBAR PASTI LOAD + ANTI SCROLL

// 1. Kunci scroll sampai klik "Buka Undangan"
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

// 2. Preload semua gambar background biar langsung muncul pas landing hilang
const imagesToPreload = [
  'https://raw.githubusercontent.com/username/repo/main/assets/sky.jpg',
  'https://raw.githubusercontent.com/username/repo/main/assets/stars.png',
  'https://raw.githubusercontent.com/username/repo/main/assets/clouds.png',
  'https://raw.githubusercontent.com/username/repo/main/assets/moon.png',
  'https://raw.githubusercontent.com/username/repo/main/assets/waves.png'
];



let loadedImages = 0;

// Sembunyikan landing dulu, tampilkan setelah semua gambar siap
const landing = document.getElementById('landing');
landing.style.opacity = '0';
landing.style.transition = 'opacity 0.5s ease';

imagesToPreload.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = checkAllLoaded;
  img.onerror = checkAllLoaded;
});

function checkAllLoaded() {
  loadedImages++;
  if (loadedImages === imagesToPreload.length) {
    // Semua gambar sudah siap
    landing.style.opacity = '1'; // tampilkan landing
    document.body.classList.add('images-loaded'); // optional, bisa buat trigger efek
  }
}



// 3. Tombol buka undangan
document.getElementById('openBtn').addEventListener('click', function () {
  const landing = document.getElementById('landing');

  // Fade out halus
  landing.style.opacity = '0';
  landing.style.transition = 'opacity 1.4s ease-out';

  setTimeout(() => {
    landing.remove();

    // Buka scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // Mainkan musik setelah user interaction (bypass autoplay block)
    const music = document.getElementById('bgmusic');
    music.play().catch(() => console.log('Musik otomatis diblokir, klik tombol musik ya'));

    // Update tombol musik
    document.getElementById('musicBtn').textContent = 'Music On';
  }, 1400);
});

// 4. Toggle musik
document.getElementById('musicBtn').addEventListener('click', function () {
  const music = document.getElementById('bgmusic');
  if (music.paused) {
    music.play();
    this.textContent = 'Music On';
  } else {
    music.pause();
    this.textContent = 'Music Off';
  }
});

// 5. Countdown real-time
const weddingDate = new Date("2026-03-14T00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById('timer').innerHTML = '<h3>Sudah Tiba Hari Bahagia!</h3>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}, 1000);

// 6. RSVP + ucapan terima kasih halus
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const thanks = document.getElementById('thanks');
  
  thanks.style.display = 'block';
  thanks.style.opacity = '0';
  thanks.style.transform = 'translateY(-20px)';
  thanks.style.transition = 'all 0.8s ease';

  setTimeout(() => {
    thanks.style.opacity = '1';
    thanks.style.transform = 'translateY(0)';
  }, 100);

  this.reset();

  setTimeout(() => {
    thanks.style.opacity = '0';
    thanks.style.transform = 'translateY(-20px)';
    setTimeout(() => thanks.style.display = 'none', 800);
  }, 5000);
});

// 7. Efek mouse move parallax ringan (bonus biar lebih hidup)
document.addEventListener('mousemove', (e) => {
  const layers = document.querySelectorAll('.layer');
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    layer.style.transform = `translateZ(${-(index + 1) * 10}px) scale(${1 + index * 0.2}) translate(${x}px, ${y}px)`;
  });
});