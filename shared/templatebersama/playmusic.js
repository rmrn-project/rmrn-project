(function () {

    /* =============================
       CONFIG
    ============================== */
    const config = {
        position: "bottom-right",         // top-left, top-right, bottom-left, bottom-right
        imgPlay: "/icons/play.png",
        imgPause: "/icons/pause.png",
        size: 60,
        padding: 25,
        musicSrc: "/music/thousandyears.mp3",
    };


    /* =============================
       DETECT PAGE THEME (for fallback color)
    ============================== */
    function detectTheme() {
        const bg = window.getComputedStyle(document.body).backgroundColor;
        const rgb = bg.match(/\d+/g).map(Number);
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness > 150 ? "light" : "dark";
    }

    const pageTheme = detectTheme();
    const fallbackColor = pageTheme === "light" ? "#000000" : "#ffffff";


    /* =============================
       AUDIO SETUP
    ============================== */
    const audio = new Audio(config.musicSrc);
    audio.loop = true;
    audio.preload = "auto";


    /* =============================
       CREATE BUTTON CONTAINER
    ============================== */

    const btn = document.createElement("div");

    // Fallback style FIX sesuai request
    Object.assign(btn.style, {
        position: "fixed",
        width: config.size + "px",
        height: config.size + "px",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(15px)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        transform: "translateZ(0)",
        willChange: "transform, left, top",
    });

    const pad = config.padding + "px";
    switch (config.position) {
        case "top-left": btn.style.top = pad; btn.style.left = pad; break;
        case "top-right": btn.style.top = pad; btn.style.right = pad; break;
        case "bottom-left": btn.style.bottom = pad; btn.style.left = pad; break;
        default:
        case "bottom-right": btn.style.bottom = pad; btn.style.right = pad; break;
    }

    document.body.appendChild(btn);


    /* =============================
       ICON ELEMENT
    ============================== */

    const icon = new Image();
    icon.style.width = "60%";
    icon.style.height = "60%";
    icon.style.objectFit = "contain";

    let useImageIcons = false;
    let isPlaying = false;


    /* =============================
       FALLBACK ICONS (centered perfectly)
    ============================== */

    function showPlayFallback() {
        btn.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
            ">
                <div style="
                    width:0;
                    height:0;
                    border-left:20px solid ${fallbackColor};
                    border-top:14px solid transparent;
                    border-bottom:14px solid transparent;
                    transform:translateX(3px);
                "></div>
            </div>
        `;
    }

    function showPauseFallback() {
        btn.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                gap:8px;
            ">
                <div style="
                    width:8px;
                    height:26px;
                    background:${fallbackColor};
                    border-radius:2px;
                "></div>
                <div style="
                    width:8px;
                    height:26px;
                    background:${fallbackColor};
                    border-radius:2px;
                "></div>
            </div>
        `;
    }


    /* =============================
       IMAGE CHECK
    ============================== */

    function checkImage(url) {
        return new Promise(resolve => {
            const test = new Image();
            test.onload = () => resolve(true);
            test.onerror = () => resolve(false);
            test.src = url;
        });
    }

    Promise.all([
        checkImage(config.imgPlay),
        checkImage(config.imgPause)
    ]).then(([playOK, pauseOK]) => {

        if (playOK && pauseOK) {
            useImageIcons = true;
            icon.src = config.imgPlay;
            btn.innerHTML = "";
            btn.appendChild(icon);

        } else {
            useImageIcons = false;
            showPlayFallback();
        }

    });


    /* =============================
       CLICK HANDLER (musik pasti nyala)
    ============================== */

    btn.addEventListener("click", async () => {

        if (!isPlaying) {

            try {
                await audio.play();
                isPlaying = true;

                if (useImageIcons) {
                    icon.src = config.imgPause;
                    btn.innerHTML = "";
                    if (!btn.contains(icon)) btn.appendChild(icon);
                } else {
                    showPauseFallback();
                }

            } catch (err) {
                console.log("Audio gagal play:", err);
            }

        } else {

            audio.pause();
            isPlaying = false;

            if (useImageIcons) {
                icon.src = config.imgPlay;
                btn.innerHTML = "";
                if (!btn.contains(icon)) btn.appendChild(icon);
            } else {
                showPlayFallback();
            }
        }

    });

})();