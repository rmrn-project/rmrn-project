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
       AUDIO SETUP
    ============================== */
    const audio = new Audio(config.musicSrc);
    audio.loop = true;
    audio.preload = "auto";


    /* =============================
       CREATE BUTTON CONTAINER
    ============================== */

    const btn = document.createElement("div");

    // Fallback style FIX 100% sesuai request
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
        zIndex: "9999999",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        transform: "translateZ(0)",
        willChange: "transform, left, top",
        fontSize: "28px",
        color: "#d4af37",   // biar mirip gold wedding
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
       FALLBACK ICON
    ============================== */

    function showPlayFallback() {
        btn.textContent = "▶";
        icon.remove();
    }

    function showPauseFallback() {
        btn.textContent = "⏸";
        icon.remove();
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
            btn.textContent = "";
            btn.appendChild(icon);
        } else {
            useImageIcons = false;
            showPlayFallback();
        }

    });


    /* =============================
       CLICK HANDLER (FIX: MUSIC PASTI PLAY)
    ============================== */

    btn.addEventListener("click", async () => {

        if (!isPlaying) {
            try {
                await audio.play();      // ← musik HARUS nyala setelah klik
                isPlaying = true;

                if (useImageIcons) {
                    icon.src = config.imgPause;
                    btn.textContent = "";
                    if (!btn.contains(icon)) btn.appendChild(icon);
                } else {
                    showPauseFallback();
                }

            } catch (e) {
                console.log("Audio nggak bisa play:", e);
            }

        } else {
            audio.pause();
            isPlaying = false;

            if (useImageIcons) {
                icon.src = config.imgPlay;
                btn.textContent = "";
                if (!btn.contains(icon)) btn.appendChild(icon);
            } else {
                showPlayFallback();
            }
        }

    });

})();