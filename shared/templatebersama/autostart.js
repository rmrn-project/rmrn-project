// ==UserScript==
// @name         AutoStart Modular Scroll
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Auto scroll + tombol, autostart!
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let autoScroll = null;
    let btnCreated = false;

    // ====== Gambar base64 biar ga 404 ======
    const imgBase64 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAADEtSgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAB3RJTUUH5gICEzM1f3O5HgAAAbhJREFUaN7tmesrBGEcx3HTlsbG0ti4M3Nw54YOzpw4c3DkZMvJkyWwuDcx8xJM2hQb5/1x9iVJIU0KwdN7fn/4j5+fs9/nIaU6eiOf5/UEgFgsFopd13X9vJ7f8yW5iH+/3wOAqVOn8vLyqOuuO4ZhGABw9epV/7uB7/d7ABhbty4AsHnz5vC83gIA9u/fH0C2bNmikfVdANjtdgBQ9/3+6gIwPDycf7FYKBQKhUKhUCh0Xdd1jY+Pt7oACPubm5vt2wBg/fr1AHK73QCAXq8HAEqlUsnlco1Go8Vi8cvl8vS6rjOBgD9//mR3WwBg7ty58LweAHq93gBw7tw5APK73wMAHh4eAJBLly4BYGNjQ6/XG4vF4vF4PB6PR6VSqRQKhUKhUCgUCgAAoK+vD4DBgQEAOp2O3W4HAHvdDgD29vY0XdeRQP1+f3RaLRaLRqPRaDTq9XqTy+W+7v8BCoUCAPb29gQAREdHA4DBgQEAqKqqoNvt2N3dDWBoaEhT7gLg7OwMAJBIJADQarVotVoffv7+APx9fX0AwM/Pj0ql4vF4NEJ7e3t6vV6TyWTC4XA4AOzduxcAOJ/PBwD6+/sDAEilUo0GI4VCodBoNBrN9hIA4Pf7/dV1Xfv7+2u12m63u7qvb2trazabjUql4vF4NEIikQCAd955B4DBgQEAqFQqAOzatQvAZrNisViPx+NpmqbrSKPRqFar1Xq9XqPRaDTq9XqTy2WCweB3+/0BoNfr0Rj8fr/f6/V6ruv1+vp6ANjb2xMAe12X9N1ut9lsNpvNZrPZbDabzWa5XO7r+v1+f39/CeD06dMAoHmeR9L3+/3BYDCYzWaz2Wq1WqPRaL1e7/5+A8BfX1//Q+vpKEmS3wAAAABJRU5ErkJggg==";

    function createButton() {
        if (btnCreated) return;
        
        const btn = document.createElement("button");
        btn.id = "btnAutoScrollBro";
        btn.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            left: 20px !important;
            width: 50px !important;
            height: 50px !important;
            border-radius: 50% !important;
            background: rgba(0,0,0,0.6) url('data:image/png;base64,${imgBase64}') center/35px no-repeat !important;
            border: 3px solid #fff !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5) !important;
            z-index: 999999 !important;
            cursor: pointer !important;
            backdrop-filter: blur(5px) !important;
        `;
        btn.title = "Klik untuk stop | Auto-scroll aktif!";
        document.body.appendChild(btn);
        btnCreated = true;

        btn.addEventListener("click", () => {
            if (autoScroll) stopAutoScroll();
            else startAutoScroll();
        });
    }

    function startAutoScroll() {
        if (autoScroll) return;
        createButton();
        document.getElementById("btnAutoScrollBro").style.opacity = "0.5";

        autoScroll = setInterval(() => {
            window.scrollBy(0, 2); // lebih smooth & keliatan
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 50) {
                stopAutoScroll();
            }
        }, 15);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
        const btn = document.getElementById("btnAutoScrollBro");
        if (btn) btn.style.opacity = "1";
    }

    // Stop kalo user sentuh/klik
    document.addEventListener("touchstart", stopAutoScroll, { passive: true });
    document.addEventListener("wheel", stopAutoScroll, { passive: true });
    document.addEventListener("keydown", stopAutoScroll);

    // ====== AUTO START ======
    // Tunggu sampe bener-bener siap
    function tryStart() {
        if (document.body && document.body.scrollHeight > window.innerHeight * 1.5) {
            createButton();
            setTimeout(startAutoScroll, 1200); // delay biar ga ganggu loading
        } else {
            setTimeout(tryStart, 500);
        }
    }

    // Jalankan setelah halaman bener-bener idle
    if (document.readyState === "complete" || document.readyState === "interactive") {
        tryStart();
    } else {
        window.addEventListener("load", () => setTimeout(tryStart, 1000));
    }

})();