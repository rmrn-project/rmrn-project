// share-horizontal.js

// 1. Buat container tombol share
const shareContainer = document.createElement('div');
shareContainer.className = 'floating-share';
shareContainer.innerHTML = `
  <img src="/image/share.png" alt="Share" width="30">
  <div class="share-popup">
    <a href="#" class="share-wa" title="WhatsApp"><img src="/image/wa.png" alt="WA" width="30"></a>
    <a href="#" class="share-fb" title="Facebook"><img src="/image/fb.png" alt="FB" width="30"></a>
    <a href="#" class="share-tg" title="Telegram"><img src="/image/tg.png" alt="TG" width="30"></a>
    <button class="share-copy" title="Salin Link"><img src="/image/link.png" alt="Copy" width="30"></button>
  </div>
`;
document.body.appendChild(shareContainer);

// 2. Tambahkan CSS
const style = document.createElement('style');
style.textContent = `
.floating-share {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999999;
}
.floating-share img {
  cursor: pointer;
  transition: transform 0.2s;
}
.floating-share img:hover {
  transform: scale(1.2);
}

/* Popup horizontal */
.share-popup {
  display: none;
  flex-direction: row;
  background: var(--popup-bg, #fff);
  padding: 8px 12px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  gap: 8px;
  margin-left: 10px;
  align-items: center;
  animation: slideIn 0.3s ease forwards;
}
.share-popup a, .share-popup button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.share-popup a img, .share-popup button img {
  width: 30px;
  transition: transform 0.2s;
}
.share-popup a img:hover, .share-popup button img:hover {
  transform: scale(1.2);
}

/* Show popup */
.floating-share.show .share-popup {
  display: flex;
}

/* Animasi slide in */
@keyframes slideIn {
  from {opacity:0; transform: translateX(-10px);}
  to {opacity:1; transform: translateX(0);}
}
`;
document.head.appendChild(style);

// 3. Toggle popup saat tombol utama diklik
const shareBtn = shareContainer.querySelector('img');
shareBtn.addEventListener('click', () => {
  shareContainer.classList.toggle('show');
});

// 4. Set link share otomatis
const pageUrl = encodeURIComponent(window.location.href);
shareContainer.querySelector('.share-wa').href = `https://wa.me/?text=${pageUrl}`;

// Tombol FB: buka popup share biasa
shareContainer.querySelector('.share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
shareContainer.querySelector('.share-fb').target = "_blank"; // buka di tab baru
shareContainer.querySelector('.share-fb').title = "Share ke Facebook (pilih sendiri)";

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