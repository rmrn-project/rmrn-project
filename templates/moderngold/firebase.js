import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, onSnapshot,
  query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// === INISIALISASI FIREBASE ===
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
const clone = document.getElementById("listUcapanClone");
const btnUcapan = document.getElementById("kirimUcapan");


// === RENDER ITEM ===
function render(data) {
  const wrap = document.createElement("div");
  wrap.className = "ucapan-item";

  const time = data.waktu
    ? new Date(data.waktu.seconds * 1000).toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short"
      })
    : "Baru saja";

  wrap.innerHTML = `
    <strong style="color:#d4af37;font-size:1.12em;display:block;margin-bottom:6px;">
      ${data.nama}
    </strong>
    <small style="color:#ccc;font-size:0.88em;display:block;margin-bottom:10px;">
      ${time}
    </small>
    <p style="margin:0;line-height:1.7;font-size:0.97em;opacity:0.95;">
      ${data.doa.replace(/\n/g, "<br>")}
    </p>
  `;

  return wrap;
}


// === REALTIME LISTENER ===
onSnapshot(query(col, orderBy("waktu", "desc")), snap => {
  list.innerHTML = "";
  clone.innerHTML = "";

  if (snap.empty) {
    const kosong = `<div class="ucapan-item" style="width:300px;text-align:center;color:#aaa;padding:30px 0;font-style:italic;">Belum ada ucapan...</div>`;
    list.innerHTML = kosong;
    clone.innerHTML = kosong;
    return;
  }

  snap.forEach(doc => {
    const item = render(doc.data());
    list.appendChild(item);
    clone.appendChild(item.cloneNode(true));
  });
});


// === KIRIM UCAPAN ===
btnUcapan.onclick = async () => {
  if (localStorage.getItem("ucapanSandiErtia2025")) {
    alert("Kamu sudah mengirimkan ucapan sebelumnya ❤️");
    return;
  }

  const nama = document.getElementById("nama").value.trim();
  const doa = document.getElementById("doa").value.trim();

  if (!nama || !doa) {
    alert("Nama dan ucapan wajib diisi ya");
    return;
  }

  btnUcapan.disabled = true;
  btnUcapan.textContent = "Mengirim...";

  try {
    await addDoc(col, {
      nama,
      doa,
      waktu: serverTimestamp()
    });

    localStorage.setItem("ucapanSandiErtia2025", "yes");

    document.getElementById("nama").value = "";
    document.getElementById("doa").value = "";

    btnUcapan.textContent = "Terkirim";
    btnUcapan.style.background = "#90ee90";
    btnUcapan.style.color = "#000";
    alert("Yeay! Ucapanmu sudah tersimpan ❤️");

    list.prepend(render({ nama, doa, waktu: { seconds: Date.now() / 1000 } }));
  } 
  catch (err) {
    alert("Gagal mengirim, coba lagi...");
    btnUcapan.disabled = false;
    btnUcapan.textContent = "Kirim Ucapan";
  }
};


// === SUDAH PERNAH KIRIM ===
if (localStorage.getItem("ucapanSandiErtia2025")) {
  btnUcapan.disabled = true;
  btnUcapan.textContent = "Terkirim";
  btnUcapan.style.background = "#90ee90";
  btnUcapan.style.color = "#000";
}
