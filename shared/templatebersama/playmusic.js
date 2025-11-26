(function() {

    /* =============================
       CONFIGURASI YANG BISA DIUBAH
    ============================== */

    const config = {
        position: "bottom-right", 
        // pilihan: top-left, top-right, bottom-left, bottom-right

        imgSrc: "icons/play.png",     // gambar tombol
        size: 50,                     // ukuran px
        fallbackColor: "#ffffff",     // warna fallback kalau img gagal
        fallbackOpacity: 0.85,        // transparansi fallback
        borderRadius: "50%",          // bentuk bulat
        padding: 10                   // jarak dari tepi
    };


    /* =============================
       AUTO DETECT BACKGROUND COLOR
    ============================== */
    function getPageBg() {
        const bg = window.getComputedStyle(document.body).backgroundColor;

        if (!bg || bg === "rgba(0, 0, 0, 0)") {
            return "#ffffff"; // fallback kalau background body transparan
        }
        return bg;
    }

    function getContrastedColor(color) {
        // convert rgb(x,x,x) → angka
        const rgb = color.match(/\d+/g);
        const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);

        // luminance
        const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;

        return luminance > 0.5 ? "#000000" : "#ffffff";
    }


    /* =============================
       RENDER TOMBOL PLAY
    ============================== */
    const btn = document.createElement("button");
    btn.id = "floatingPlayButton";

    // style dasar
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

    // posisi
    const pad = config.padding + "px";

    switch(config.position) {
        case "top-left":
            btn.style.top = pad;
            btn.style.left = pad;
            break;
        case "top-right":
            btn.style.top = pad;
            btn.style.right = pad;
            break;
        case "bottom-left":
            btn.style.bottom = pad;
            btn.style.left = pad;
            break;
        case "bottom-right":
        default:
            btn.style.bottom = pad;
            btn.style.right = pad;
            break;
    }

    // BIKIN GAMBAR
    const img = new Image();
    img.src = config.imgSrc;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    // fallback kalau gambar gagal
    img.onerror = function() {
        const bg = getPageBg();
        const contrast = getContrastedColor(bg);

        btn.style.background = contrast;
        btn.style.opacity = config.fallbackOpacity;
        btn.textContent = "▶";
        btn.style.color = bg; // warna teks berkebalikan
    };

    btn.appendChild(img);
    document.body.appendChild(btn);


    /* =============================
       EVENT KLIK
    ============================== */
    btn.addEventListener("click", function() {
        console.log("Play clicked!");
        // taruh fungsi play music di sini
        // audio.play();
    });

})();