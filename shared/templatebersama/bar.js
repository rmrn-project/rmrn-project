document.addEventListener("DOMContentLoaded", () => {
    // ======= DAFTAR TOMBOL BAR =======
    const buttons = [
        {
            src: "/shared/templatebersama/popup.js",
            label: "Fitur",
            onClick: async (btn) => {
                // Load popup.js dari src
                if (!window.showPopup) {
                    await new Promise((resolve, reject) => {
                        const s = document.createElement("script");
                        s.src = btn.src; // pakai src dari tombol
                        s.onload = resolve;
                        s.onerror = () => reject(btn.src + " gagal di-load");
                        document.body.appendChild(s);
                    });
                }
                if (typeof showPopup === "function") showPopup();
                else console.warn("showPopup() tidak ditemukan");
            }
        },
        {
            src: "/shared/templatebersama/sharebutton.js",
            label: "Share",
            onClick: async (btn) => {
                if (!window.shareFunction) {
                    await new Promise((resolve, reject) => {
                        const s = document.createElement("script");
                        s.src = btn.src;
                        s.onload = resolve;
                        s.onerror = () => reject(btn.src + " gagal di-load");
                        document.body.appendChild(s);
                    });
                }
                if (typeof shareFunction === "function") shareFunction();
                else console.warn("shareFunction() tidak ditemukan");
            }
        }
        // Tambah tombol baru tinggal push object baru di array
    ];

    // ======= BUAT BAR DI ATAS =======
    const bar = document.createElement("div");
    bar.id = "topBar";
    document.body.appendChild(bar);

    // ======= STYLE BAR =======
    const style = document.createElement("style");
    style.innerHTML = `
        #topBar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: #1e1e1e;
            display: flex;
            align-items: center;
            padding: 0 20px;
            gap: 10px;
            z-index: 999999;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        #topBar button {
            padding: 6px 12px;
            font-size: 14px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            color: #fff;
            background: #333;
            transition: background .3s;
        }
        #topBar button:hover { background: #555; }
        body { padding-top: 60px; }
    `;
    document.head.appendChild(style);

    // ======= BIKIN TOMBOL DARI ARRAY =======
    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.textContent = btn.label;
        b.addEventListener("click", () => btn.onClick(btn));
        bar.appendChild(b);
    });

});
