// Anti scroll sebelum klik
document.body.style.overflow = 'hidden';

// Buka undangan
document.getElementById('openBtn').onclick = () => {
  document.getElementById('landing').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('landing').remove();
    document.body.style.overflow = '';
    document.getElementById('music').play().catch(() => {});
    document.getElementById('musicBtn').textContent = 'Music On';
  }, 1000);
};

// Musik
document.getElementById('musicBtn').onclick = () => {
  const m = document.getElementById('music');
  m.paused ? (m.play(), this.textContent='Music On') : (m.pause(), this.textContent='Music Off');
};

// Countdown
const wedding = new Date("2026-03-14T00:00:00").getTime();
setInterval(() => {
  const diff = wedding - Date.now();
  const d = Math.floor(diff/(1000*60*60*24)).toString().padStart(2,'0');
  const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60)).toString().padStart(2,'0');
  const m = Math.floor((diff%(1000*60*60))/(1000*60)).toString().padStart(2,'0');
  const s = Math.floor((diff%(1000*60))/1000).toString().padStart(2,'0');
  document.getElementById('timer').innerHTML = `
    <div><span>${d}</span><small>Days</small></div>
    <div><span>${h}</span><small>Hours</small></div>
    <div><span>${m}</span><small>Minutes</small></div>
    <div><span>${s}</span><small>Seconds</small></div>
  `;
}, 1000);

// RSVP
document.getElementById('rsvpForm').onsubmit = e => {
  e.preventDefault();
  document.getElementById('thanks').style.display = 'block';
  setTimeout(() => document.getElementById('thanks').style.display = 'none', 6000);
  e.target.reset();
};