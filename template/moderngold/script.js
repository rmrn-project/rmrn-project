
// ═══════════════════════════════════════════════════════════
// JS TERPISAH — MUSIC BUTTON DRAG + PLAY/PAUSE STABIL DI HP
// ═══════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function() {

    // === 1. TAHUN OTOMATIS ===
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // === 2. FADE ON SCROLL ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade").forEach(el => observer.observe(el));

    // === 3. BACKGROUND MUSIC + TOMBOL PLAY/PAUSE ===

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

if (bgm && musicBtn && playIcon && pauseIcon) {

    let isPlaying = false;

    function updateIcons() {
        playIcon.style.display = isPlaying ? "none" : "block";
        pauseIcon.style.display = isPlaying ? "block" : "none";
    }

    musicBtn.addEventListener("click", async () => {
        if (!isPlaying) {
            try {
                await bgm.play();
                isPlaying = true;
            } catch (err) {
                console.log("Autoplay diblokir:", err);
            }
        } else {
            bgm.pause();
            isPlaying = false;
        }
        updateIcons();
    });

    updateIcons();
}



    // === 4. AUTO SCROLL + TOMBOL PANAH BAWAH ===
    let autoScroll = null;
    const btnAuto = document.getElementById("btnAutoScroll");

    const startAutoScroll = () => {
        if (autoScroll) return;
        autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
            // Berhenti otomatis kalau udah sampai bawah
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                stopAutoScroll();
            }
        }, 20);
        if (btnAuto) btnAuto.style.display = "none";
    };

    const stopAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = null;
        if (btnAuto) btnAuto.style.display = "block";
    };

    if (btnAuto) {
        btnAuto.addEventListener("click", startAutoScroll);
    }

    // Sentuh layar = stop auto scroll
    document.addEventListener("touchstart", () => {
        stopAutoScroll();
    });

    // Auto start setelah 3 detik (bisa dihapus kalau ga mau langsung jalan)
    setTimeout(startAutoScroll, 3000);

    // === 5. COPY NOMOR REKENING / HADIAH ===
    window.copyRek = function (id) {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text).then(() => {
            const notif = document.getElementById("notif" + id.slice(-1));
            if (notif) {
                notif.style.opacity = "1";
                setTimeout(() => notif.style.opacity = "0", 2000);
            }
        }).catch(() => {
            // Fallback untuk HP lama
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("Berhasil disalin: " + text);
        });
    };

    // === 6. GALLERY INFINITE LOOP (kalau pakai JS duplikat) ===
    const slidesContainer = document.getElementById("slides");
    if (slidesContainer && slidesContainer.children.length > 0) {
        // Duplikat otomatis biar infinite mulus
        slidesContainer.innerHTML += slidesContainer.innerHTML;
    }

    console.log("Undangan Premium Gold — semua fitur aktif!");
});