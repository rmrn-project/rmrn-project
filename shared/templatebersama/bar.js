// ================= BAR.JS FLOATING NAVBAR =================
document.addEventListener("DOMContentLoaded", () => {

    // ======= Definisi tombol =======
    const buttons = [
        { src: "/shared/templatebersama/popup.js", label: "", funcName: "showPopup", icon: "/image/fitur.png" },
        { src: "/shared/templatebersama/sharebutton.js", label: "", funcName: "shareFunction", icon: "/image/share.png" },
        // Tambahkan ikon baru di sini nanti cukup tambah object baru
        // { src: "...", label: "...", funcName: "...", icon: "..." }
    ];

    // ======= Buat bar =======
    const bar = document.createElement("div");
    bar.id = "topBar";
    document.body.appendChild(bar);

    // ======= Style bar =======
    const style = document.createElement("style");
    style.innerHTML = `
        #topBar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 10px;
            background: #0d6efd;
            z-index: 999999;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        #topBar button {
            padding: 6px 10px;
            border: none;
            border-radius: 6px;
            background: #333;
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background .3s;
        }
        #topBar button img {
            width: 20px;
            height: 20px;
            object-fit: contain;
        }
        #topBar button:hover { background: #555; }
        body { padding-top: 60px; }
    `;
    document.head.appendChild(style);

    // ======= Fungsi load script modular =======
    async function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement("script");
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject(src + " gagal di-load");
            document.body.appendChild(s);
        });
    }

    // ======= Tambah tombol ke bar otomatis =======
    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.innerHTML = btn.icon ? `<img src="${btn.icon}" alt="${btn.label}"> ${btn.label}` : btn.label;

        b.addEventListener("click", async () => {
            try {
                await loadScript(btn.src); // load modul jika belum

                // ==== Panggil fungsi sesuai funcName ====
                if (typeof window[btn.funcName] === "function") {
                    window[btn.funcName](); // langsung toggle seperti popup.js
                } else {
                    console.warn(btn.funcName + " belum tersedia.");
                }
            } catch (err) {
                console.error(err);
            }
        });

        bar.appendChild(b);
    });
});