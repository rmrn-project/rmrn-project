document.addEventListener("DOMContentLoaded", () => {
    // ========== BAR.JS FLOATING NAVBAR ==========
    const bar = document.createElement("div");
    bar.id = "topBar";
    bar.innerHTML = `
        <button id="openPopup">Popup</button>
        <button id="shareBtn">Share</button>
    `;
    document.body.appendChild(bar);

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

    // Tombol buka popup
    document.getElementById("openPopup").addEventListener("click", () => {
        if (typeof showPopup === "function") {
            showPopup();
        } else {
            console.warn("popup.js belum di-load");
        }
    });

    // Tombol share
    document.getElementById("shareBtn").addEventListener("click", () => {
        if (typeof shareFunction === "function") {
            shareFunction();
        } else {
            console.warn("sharebutton.js belum di-load");
        }
    });
});
