// ================= BAR.JS FLOATING NAVBAR =================
document.addEventListener("DOMContentLoaded", () => {
    const buttons = [
        { src: "/shared/templatebersama/popup.js", label: "Fitur", funcName: "showPopup" },
        { src: "/shared/templatebersama/sharebutton.js", label: "Share", funcName: "shareFunction", type: "share" } 
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
            background: #1e1e1e;
            z-index: 999999;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        #topBar button {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            background: #333;
            color: #fff;
            cursor: pointer;
            transition: background .3s;
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

    // ======= Tambah tombol ke bar =======
    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.textContent = btn.label;
        b.addEventListener("click", async () => {
            try {
                await loadScript(btn.src); // load modul jika belum
                if (typeof window[btn.funcName] === "function") {
                    if (btn.funcName === "showPopup") {
                        window.showPopup({ position: { bottom: "70px", right: "20px" } });
                    } else if (btn.funcName === "shareFunction") {
                        // panggil shareFunction di share.js dengan type
                        window.shareFunction(btn.type || "wa");
                    } else {
                        window[btn.funcName]();
                    }
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