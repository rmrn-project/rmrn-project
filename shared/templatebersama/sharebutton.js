// ================= SHAREBUTTON.JS MODULAR =================
(function() {

const shareContainer = document.createElement('div');  
shareContainer.className = 'floating-share';  
shareContainer.innerHTML = `  
  <div class="share-popup">  
    <a href="#" class="share-wa" title="WhatsApp"><img src="/image/wa.png" alt="WA" width="30"></a>  
    <a href="#" class="share-fb" title="Facebook"><img src="/image/fb.png" alt="FB" width="30"></a>  
    <a href="#" class="share-tg" title="Telegram"><img src="/image/tg.png" alt="TG" width="30"></a>  
    <button class="share-copy" title="Salin Link"><img src="/image/link.png" alt="Copy" width="30"></button>  
  </div>  
`;  
document.body.appendChild(shareContainer);  

const style = document.createElement('style');  
style.textContent = `  
.floating-share {  
  position: fixed;  
  top: 20px;  
  left: 20px;  
  z-index: 999999;  
}  
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
  justify-content: center;  
}  
.share-popup a, .share-popup button {  
  background: transparent;  
  border: none;  
  cursor: pointer;  
  padding: 0;  
  display: flex;  
  align-items: center;  
  justify-content: center;  
}  
.share-popup a img, .share-popup button img {  
  width: 30px;  
  height: 30px;  
  transition: transform 0.2s;  
}  
.share-popup a img:hover, .share-popup button img:hover { transform: scale(1.2); }  
.floating-share.show .share-popup { display: flex; }  
`;  
document.head.appendChild(style);  

const pageUrl = encodeURIComponent(window.location.href);  
shareContainer.querySelector('.share-wa').href = `https://wa.me/?text=${pageUrl}`;  
shareContainer.querySelector('.share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;  
shareContainer.querySelector('.share-fb').target = "_blank";  
shareContainer.querySelector('.share-tg').href = `https://t.me/share/url?url=${pageUrl}&text=Check+this+out`;  
shareContainer.querySelector('.share-copy').addEventListener('click', () => {  
  navigator.clipboard.writeText(window.location.href).then(() => alert('Link berhasil disalin!'));  
});  

// Tutup popup kalau klik di luar  
document.addEventListener('click', (e) => {  
  if (!shareContainer.contains(e.target)) {  
    shareContainer.classList.remove('show');  
  }  
});  

// ==== Fungsi toggle share popup ====  
window.shareFunction = function() {  
    // toggle bisa dipanggil berulang dari bar.js  
    shareContainer.classList.toggle('show');  
};

})();