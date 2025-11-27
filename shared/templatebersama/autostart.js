// ================= AUTOSCROLL MODULAR - LANDING DETECTION =================
(function(){
    if(window.autoScrollInjected) return;
    window.autoScrollInjected = true;

    let autoScroll = null;
    let isScrolling = false;

    // Tombol
    const btnAuto = document.createElement("button");
    btnAuto.id = "btnAutoScroll";
    btnAuto.title = "Auto Scroll";
    btnAuto.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 48px;
        height: 48px;
        border: none;
        background: rgba(0,0,0,0.6);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        z-index: 999999;
        cursor: pointer;
        opacity: 0.8;
    `;
    btnAuto.innerHTML = `<img src="autosroll.png" alt="Auto Scroll" style="width:32px;height:32px;object-fit:contain;">`;

    // Fungsi start
    function startAutoScroll(){
        if(isScrolling) return;
        isScrolling = true;
        btnAuto.style.opacity = "0.4";

        autoScroll = setInterval(()=>{
            window.scrollBy(0,2);
            if((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 50){
                stopAutoScroll();
            }
        },16);
    }

    function stopAutoScroll(){
        if(!isScrolling) return;
        clearInterval(autoScroll);
        autoScroll = null;
        isScrolling = false;
        btnAuto.style.opacity = "0.8";
    }

    btnAuto.addEventListener("click", (e)=>{
        e.stopPropagation();
        if(isScrolling) stopAutoScroll();
        else startAutoScroll();
    });

    ["wheel","touchstart","keydown","mousedown"].forEach(ev=>{
        document.addEventListener(ev, stopAutoScroll, {passive:true});
    });

    // --- Init tombol hanya setelah #landing hilang ---
    function init(){
        const main = document.getElementById("main");
        const landing = document.getElementById("landing");

        // Tunggu landing dihapus / opacity 0 + main muncul
        const observer = new MutationObserver(()=>{
            if(!landing && main && window.getComputedStyle(main).display !== "none"){
                document.body.appendChild(btnAuto);
                startAutoScroll(); // auto-start
                observer.disconnect();
            }
        });

        observer.observe(document.body, {childList:true, subtree:true});

        // fallback: kalau #landing sudah hilang
        if(!landing && main && window.getComputedStyle(main).display !== "none"){
            document.body.appendChild(btnAuto);
            startAutoScroll();
        }
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", init);
    } else init();

})();