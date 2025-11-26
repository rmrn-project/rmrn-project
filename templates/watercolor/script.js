// ===========================
// ELEMENT DASAR
// ===========================
const openBtn = document.getElementById('openBtn');
const cover = document.getElementById('cover');
const main = document.getElementById('main-content');


// ===========================
// FUNGSI LOAD SCRIPT TEMPLATE
// ===========================
function loadTemplateScripts() {
  const scripts = [
    "/shared/templatebersama/popup.js",
    "/shared/templatebersama/footer.js",
    "/shared/templatebersama/sharebutton.js",
    "/shared/templatebersama/playmusic.js"
  ];

  scripts.forEach(src => {

    // Cegah duplikat script
    if (document.querySelector(`script[src="${src}"]`)) return;

    const s = document.createElement("script");
    s.src = src;
    s.defer = true;               // tambahan aman
    document.body.appendChild(s);
  });
}


// ===========================
// BUKA LANDING PAGE
// ===========================
openBtn.addEventListener('click', () => {

  // Animasi fade-out
  cover.classList.add('fade-out');

  // Setelah animasi selesai
  setTimeout(() => {
    cover.style.display = 'none';      // sembunyikan landing
    main.classList.remove('hidden');   // tampilkan konten
    main.classList.add('show');        // animasi masuk
    window.scrollTo({ top: 0 });       // pastikan di atas

    // 🔥 Load script template setelah landing hilang
    loadTemplateScripts();

  }, 1000); // waktu fade-out
});

// ===========================
// COUNTDOWN
// ===========================
const weddingDate = new Date("2026-03-14T00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2,"0");
  document.getElementById("hours").textContent = hours.toString().padStart(2,"0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2,"0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2,"0");

  if (distance < 0) {
    document.getElementById("timer").innerHTML =
      "<h2 style='color:#d47a6a;'>Hari Ini Hari Bahagia Kami! ♡</h2>";
  }
}, 1000);


// ===========================
// RSVP FORM
// ===========================
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('thanksMsg').style.display = 'block';
  this.reset();
  setTimeout(() => {
    document.getElementById('thanksMsg').style.display = 'none';
  }, 7000);
});


// ===========================
// PARTICLE ANIMATION
// ===========================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const colors = ['#a0d8ef','#b0e0e6','#ff9a9e','#fad0c4','#ffffff'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
  }
  draw() {
    ctx.fillStyle = this.color + '99';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();