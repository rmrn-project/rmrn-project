document.addEventListener("DOMContentLoaded", () => {
    const buttons = [
        { src: "/shared/templatebersama/popup.js", label: "Fitur" },
        { src: "/shared/templatebersama/sharebutton.js", label: "Share" }
    ];

    const bar = document.createElement("div");
    bar.id = "topBar";
    document.body.appendChild(bar);

    const style = document.createElement("style");
    style.innerHTML = `
        #topBar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            display: flex;
            gap: 10px;
            align-items: center;
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
        }
        #topBar button:hover { background: #555; }
        body { padding-top: 60px; }
    `;
    document.head.appendChild(style);

    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.textContent = btn.label;
        b.addEventListener("click", async () => {
            // Load modul dari src
            if (!document.querySelector(`script[src="${btn.src}"]`)) {
                await new Promise((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = btn.src;
                    s.onload = resolve;
                    s.onerror = () => reject(btn.src + " gagal di-load");
                    document.body.appendChild(s);
                });
            }
            // Panggil fungsi modul (misal showPopup atau shareFunction)
            if (btn.label === "Fitur" && typeof showPopup === "function") showPopup();
            if (btn.label === "Share" && typeof shareFunction === "function") shareFunction();
        });
        bar.appendChild(b);
    });
});
