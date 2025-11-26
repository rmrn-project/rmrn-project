(function () {

    /* =============================
       CONFIG
    ============================== */

    const config = {
        position: "bottom-right",   // top-left, top-right, bottom-left, bottom-right
        imgPlay: "icons/play.png",
        imgPause: "icons/pause.png",
        size: 60,
        padding: 25,
        musicSrc: "/music/thousandyears.mp3"
    };


    /* =============================
       AUDIO ELEMENT
    ============================== */
    const audio = new Audio(config.musicSrc);
    audio.loop = true;


    /* =============================
       CREATE BUTTON
    ============================== */

    const btn = document.createElement("div");
    btn.id = "musicBtn-auto";

    // Default button style (will also be fallback if images fail)
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
       ICON (IMAGE OR FALLBACK)
    ============================== */

    const icon = new Image();
    icon.style.width = "60%";
    icon.style.height = "60%";
    icon.style.objectFit = "contain";

    let useImageIcons = false;
    let isPlaying = false;

    function switchToPlayImg() {
        icon.src = config.imgPlay;
        btn.textContent = "";
        if (!btn.contains(icon)) btn.appendChild(icon);
    }

    function switchToPauseImg() {
        icon.src = config.imgPause;
        if (!btn.contains(icon)) btn.appendChild(icon);
    }

    function switchToPlayFallback() {
        btn.textContent = "▶";
        btn.style.fontSize = "26px";
        icon.remove();
    }

    function switchToPauseFallback() {
        btn.textContent = "⏸";
        btn.style.fontSize = "26px";
        icon.remove();
    }


    /* =============================
       CHECK IMAGE EXISTENCE
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
            switchToPlayImg();
        } else {
            useImageIcons = false;
            switchToPlayFallback();
        }
    });


    /* =============================
       CLICK TOGGLE
    ============================== */

    btn.addEventListener("click", () => {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;

            if (useImageIcons) switchToPauseImg();
            else switchToPauseFallback();

        } else {
            audio.pause();
            isPlaying = false;

            if (useImageIcons) switchToPlayImg();
            else switchToPlayFallback();
        }
    });

})();