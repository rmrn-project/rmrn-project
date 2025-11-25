// floating-share.js

// 1. Buat container tombol share
const shareBtnContainer = document.createElement('div');
shareBtnContainer.className = 'floating-share-single';
shareBtnContainer.innerHTML = `
  <img src="image/share-icon.png" alt="Share" width="40">
  <div class="share-popup">
    <a href="#" class="share-wa" target="_blank">WhatsApp</a>
    <a href="#" class="share-fb" target="_blank">Facebook</a>
    <a href="#" class="share-twitter" target="_blank">Twitter</a>
  </div>
`;
document.body.appendChild(shareBtnContainer);

// 2. Tambahkan CSS via JS
const style = document.createElement('style');
style.textContent = `
.floating-share-single {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999999;
}
.floating-share-single img {
  cursor: pointer;
  transition: transform 0.2s;
}
.floating-share-single img:hover {
  transform: scale(1.2);
}

/* popup */
.share-popup {
  display: none;
  flex-direction: column;
  background: var(--putih);
  color: var(--hitam);
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}
.share-popup a {
  margin: 5px 0;
  text-decoration: none;
  color: inherit;
}
.floating-share-single.show .share-popup {
  display: flex;
}
`;
document.head.appendChild(style);

// 3. Toggle popup saat tombol diklik
const shareBtn = shareBtnContainer.querySelector('img');
shareBtn.addEventListener('click', () => {
  shareBtnContainer.classList.toggle('show');
});

// 4. Set link share otomatis
const url = encodeURIComponent(window.location.href);
shareBtnContainer.querySelector('.share-wa').href = `https://wa.me/?text=${url}`;
shareBtnContainer.querySelector('.share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
shareBtnContainer.querySelector('.share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=Check+this+out`;

// 5. Tutup popup kalau klik di luar
document.addEventListener('click', (e) => {
  if (!shareBtnContainer.contains(e.target)) {
    shareBtnContainer.classList.remove('show');
  }
});