// professional-share.js

// 1. Buat container tombol share
const shareContainer = document.createElement('div');
shareContainer.className = 'floating-share';
shareContainer.innerHTML = `
  <img src="/image/share.png" alt="Share" width="30">
  <div class="share-popup">
    <a href="#" class="share-wa">WhatsApp</a>
    <a href="#" class="share-fb">Facebook</a>
    <a href="#" class="share-tg">Telegram</a>
    <button class="share-copy">Salin Link</button>
  </div>
`;
document.body.appendChild(shareContainer);

// 2. Tambahkan CSS profesional
const style = document.createElement('style');
style.textContent = `
.floating-share {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999999;
  font-family: sans-serif;
}
.floating-share img {
  cursor: pointer;
  transition: transform 0.2s;
}
.floating-share img:hover {
  transform: scale(1.2);
}

/* Popup */
.share-popup {
  display: none;
  flex-direction: column;
  background: var(--popup-bg, #fff);
  color: var(--popup-text, #111);
  border-radius: 12px;
  padding: 12px;
  margin-top: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  min-width: 160px;
  animation: fadeIn 0.3s ease forwards;
}
.share-popup a,
.share-popup button {
  display: block;
  padding: 8px 12px;
  margin: 4px 0;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  transition: background 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}
.share-popup a:hover,
.share-popup button:hover {
  background: rgba(0,0,0,0.05);
}

/* Show popup */
.floating-share.show .share-popup {
  display: flex;
}

/* Animasi */
@keyframes fadeIn {
  from {opacity:0; transform: translateY(-10px);}
  to {opacity:1; transform: translateY(0);}
}
`;
document.head.appendChild(style);

// 3. Toggle popup saat tombol diklik
const shareBtn = shareContainer.querySelector('img');
shareBtn.addEventListener('click', () => {
  shareContainer.classList.toggle('show');
});

// 4. Set link share otomatis
const pageUrl = encodeURIComponent(window.location.href);
shareContainer.querySelector('.share-wa').href = `https://wa.me/?text=${pageUrl}`;
shareContainer.querySelector('.share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
shareContainer.querySelector('.share-tg').href = `https://t.me/share/url?url=${pageUrl}&text=Check+this+out`;

// 5. Salin link
shareContainer.querySelector('.share-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link berhasil disalin!');
  });
});

// 6. Tutup popup kalau klik di luar
document.addEventListener('click', (e) => {
  if (!shareContainer.contains(e.target)) {
    shareContainer.classList.remove('show');
  }
});