document.addEventListener("DOMContentLoaded", () => {
  const cover    = document.getElementById("cover");
  const main     = document.getElementById("main");
  const openBtn  = document.getElementById("openBtn");
  const music    = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  openBtn.onclick = () => {
    cover.classList.add("hidden");
    main.classList.remove("hidden");
    document.body.style.overflow = "auto";
    setTimeout(() => { music.play(); musicBtn.classList.add("playing"); }, 900);
  };

  musicBtn.onclick = () => {
    if (music.paused) {
      music.play();
      musicBtn.classList.add("playing");
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
    }
  };

  // Nama tamu dari URL ?to=
  const params = new URLSearchParams(location.search);
  const nama = params.get('to');
  if (nama) document.querySelector('.guest-name').textContent = decodeURIComponent(nama);
});