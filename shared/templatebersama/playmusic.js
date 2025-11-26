(function () {

    /* =============================
       CONFIG
    ============================== */

    const config = {
        position: "bottom-right",
        imgPlay: "icons/play.png",
        imgPause: "icons/pause.png",
        size: 55,
        musicSrc: "music/thousandyears.mp3",
        fallbackOpacity: 0.85,
        padding: 14
    };


    /* =============================
       CONTRAST AUTO DETECT
    ============================== */

    function getBodyBg() {
        const bg = window.getComputedStyle(document.body).backgroundColor;
        return bg || "rgb(255,255,255)";
    }

    function getContrast(color) {
        const rgb = color.match(/\d+/g).map(Number);
        const [r, g, b] = rgb;
        const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
        return luminance > 0.5 ? "#000000" : "#ffffff";
    }


    /* =============================
       AUDIO ELEMENT (AUTO)
    ============================== */

    const audio = new Audio(config.musicSrc);
    audio.loop = true;


    /* =============================
       BUTTON CONTAINER
    ============================== */

    const btn = document.createElement("button");
    btn.style.position = "fixed";
    btn.style.width = config.size + "px";
    btn.style.height = config.size + "px";
    btn.style.border = "none";
    btn.style.borderRadius = "50%";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.background = "transparent";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "999999";
    btn.style.padding = "0";

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
       IMAGE ICON
    ============================== */

    const icon = new Image();
    icon.style.width = "80%";
    icon.style.height = "80%";
    icon.style.objectFit = "contain";

    let iconLoaded = false;

    function checkImage(url, callback) {
        const imgTest = new Image();
        imgTest.onload = () => callback(true);
        imgTest.onerror = () => callback(false);
        imgTest.src = url;
    }

    function useFallbackStyle() {
        const bg = getBodyBg();
        const contrast = getContrast(bg);

        btn.textContent = "▶";      // fallback icon
        btn.style.background = contrast;
        btn.style.opacity = config.fallbackOpacity;
        btn.style.color = bg;
        iconLoaded = false;
    }

    function useImagePlay() {
        icon.src = config.imgPlay;
        btn.textContent = "";
        btn.appendChild(icon);
        iconLoaded = true;
    }

    function useImagePause() {
        icon.src = config.imgPause;
    }


    /* =============================
       INITIAL CHECK (PLAY ICON)
    ============================== */

    checkImage(config.imgPlay, (exists) => {
        if (exists) {
            useImagePlay();
        } else {
            useFallbackStyle();
        }
    });


    /* =============================
       CLICK LOGIC
    ============================== */

    let isPlaying = false;

    btn.addEventListener("click", () => {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;

            if (iconLoaded) useImagePause();
            else btn.textContent = "⏸";  // fallback pause

        } else {
            audio.pause();
            isPlaying = false;

            if (iconLoaded) useImagePlay();
            else btn.textContent = "▶"; // fallback play
        }
    });

})();