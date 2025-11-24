import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

  const app = initializeApp({
    apiKey: "AIzaSyCBNM5NpBwHOwyla5LcBZId7SCUIBgthnw",
    authDomain: "ertiawed.firebaseapp.com",
    projectId: "ertiawed",
    storageBucket: "ertiawed.firebasestorage.app",
    messagingSenderId: "580476029012",
    appId: "1:580476029012:web:266389781d60b1bad4c5c1"
  });

  const db = getFirestore(app);
  const col = collection(db, "ucapan");
  const list = document.getElementById("listUcapan");
  const btn = document.getElementById("kirimUcapan");






  // Render ucapan — DIBUAT LEBIH CANTIK & SESUAI SLIDER
  const render = (data) => {
    const d = document.createElement("div");
    d.className = "ucapan-item";
    const t = data.waktu 
      ? new Date(data.waktu.seconds*1000).toLocaleString("id-ID", {
          dateStyle: "long",
          timeStyle: "short"
        }) 
      : "Baru saja";

    d.innerHTML = `
      <strong style="color:#d4af37;font-size:1.15em;display:block;margin-bottom:6px;">${data.nama}</strong>
      <small style="color:#ccc;font-size:0.88em;display:block;margin-bottom:10px;opacity:0.9;">${t}</small>
      <p style="margin:0;line-height:1.75;font-size:0.98em;opacity:0.95;">${data.doa.replace(/\n/g,"<br>")}</p>
    `;
    return d;
  };



  // Real-time listener — DIPERBAIKI BIAR HORIZONTAL & SLIDE SATU-SATU
  onSnapshot(query(col, orderBy("waktu","desc")), snap => {
    const list = document.getElementById("listUcapan");
    const clone = document.getElementById("listUcapanClone");

    list.innerHTML = "";
    clone.innerHTML = "";

    if (snap.empty) {
      const kosong = `<div class="ucapan-item" style="width:300px;text-align:center;color:#aaa;padding:30px 0;font-style:italic;">Belum ada ucapan nih...</div>`;
      list.innerHTML = kosong;
      clone.innerHTML = kosong;
      return;
    }

    snap.forEach(doc => {
      const item = render(doc.data());
      list.appendChild(item);
      clone.appendChild(item.cloneNode(true)); // clone biar loop mulus
    });
  });



  // KIRIM UCAPAN — SUPER CEPET TANPA FOTO
  btn.onclick = async () => {
    if (localStorage.getItem("ucapanSandiErtia2025")) {
      alert("Kamu sudah mengirimkan ucapan sebelumnya. Terima kasih banyak ya ❤️");
      return;
    }

    const nama = document.getElementById("nama").value.trim();
    const doa = document.getElementById("doa").value.trim();

    if (!nama || !doa) {
      alert("Nama dan ucapan wajib diisi ya");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Mengirim...";

    try {
      await addDoc(col, {
        nama: nama,
        doa: doa,
        waktu: serverTimestamp()
      });

      localStorage.setItem("ucapanSandiErtia2025", "yes");

      document.getElementById("nama").value = "";
      document.getElementById("doa").value = "";

      alert("Yeay! Ucapanmu sudah tersimpan ❤️");
      btn.textContent = "Terkirim";
      btn.style.background = "#90ee90";
      btn.style.color = "#000";

      // Langsung muncul di paling atas
      list.prepend(render({ nama, doa, waktu: {seconds: Date.now()/1000} }));

    } catch(e) {
      alert("Gagal kirim ucapan. Coba lagi ya");
      btn.disabled = false;
      btn.textContent = "Kirim Ucapan";
    }
  };

  // Sudah pernah kirim
  if (localStorage.getItem("ucapanSandiErtia2025")) {
    btn.disabled = true;
    btn.textContent = "Terkirim";
    btn.style.background = "#90ee90";
    btn.style.color = "#000";
  }