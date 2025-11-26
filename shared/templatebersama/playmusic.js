(function() {

    /* =============================
       CONFIGURASI YANG BISA DIUBAH
    ============================== */

    const config = {
        position: "bottom-right", 
        // pilihan: top-left, top-right, bottom-left, bottom-right

        imgPlay: "icons/play.png",
        imgPause: "icons/pause.png",

        size: 55,
        musicSrc: "music/thousandyears.mp3",

        fallbackColor: "#ffffff",
        fallbackOpacity: 0.85,
        borderRadius: "50%",
        padding: 14
    };


    /* =============================
       DETEKSI KONTRAS WARNA
    ============================== */

    function getPageBg() {
        const bg = window.getComputedStyle(document.body).backgroundColor;
        if (!bg || bg === "rgba(0, 0, 0, 0)") return "#ffffff";
        return bg;
    }

    function getContrastedColor(color) {
        const rgb = color.match(/\d+/g);
        const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
        const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
        return luminance > 0.5 ? "#000000" : "#ffffff";
    }


    /* =============================
       BUAT AUDIO ELEMENT
    ============================== */

    const audio = new Audio(config.musicSrc);
    audio.loop = true;


    /* =============================
       RENDER TOMBOL PLAY
    ============================== */

    const btn = document.createElement("button");
    btn.id = "floatingPlayButton";

    btn.style.position = "fixed";
    btn.style.width = config.size + "px";
    btn.style.height = config.size + "px";
    btn.style.border = "none";
    btn.style.borderRadius = config.borderRadius;
    btn.style.cursor = "pointer";
    btn.style.zIndex = "999999";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.background = "transparent";
    btn.style.padding = "0";

    const pad = config.padding + "px";

    switch(config.position) {
        case "top-left": btn.style.top = pad; btn.style.left = pad; break;
        case "top-right": btn.style.top = pad; btn.style.right = pad; break;
        case "bottom-left": btn.style.bottom = pad; btn.style.left = pad; break;
        default:
        case "bottom-right": btn.style.bottom = pad; btn.style.right = pad; break;
    }


    /* =============================
       GAMBAR IKON
    ============================== */
    let currentState = "pause"; // default: sebelum play = tombol play

    const img = new Image();
    img.src = config.imgPlay;  
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    img.onerror = function() {
        const bg = getPageBg();
        const contrast = getContrastedColor(bg);

        btn.style.background = contrast;
        btn.style.opacity = config.fallbackOpacity;
        btn.textContent = "▶";
        btn.style.color = bg;
    };

    btn.appendChild(img);
    document.body.appendChild(btn);


    /* =============================
       FUNGSI GANTI IKON
    ============================== */
    function updateIcon() {
        if (currentState === "play") {
            img.src = config.imgPause;
        } else {
            img.src = config.imgPlay;
        }
    }


    /* =============================
       EVENT KLIK (PLAY/PAUSE)
    ============================== */

    btn.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            currentState = "play";
        } else {
            audio.pause();
            currentState = "pause";
        }
        updateIcon();
    });

})();