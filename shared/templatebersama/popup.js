// =============== POPUP OTOMATIS RMRN ==================
(function () {

    // --- Buat elemen popup ---
    const popup = document.createElement("div");
    popup.id = "rmrnPopup";
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Fitur Harga 25K</h2>

            <ul>
                <li>Ganti foto</li>
                <li>Ganti teks</li>
                <li>Ganti font couple</li>
                <li>Ganti musik</li>
            </ul>

            <p style="margin-top: 15px; font-weight:600;">Mau tambah fitur lain?</p>

            <ul>
<li>fitur autoscroll: <b>+25K</b></li>
                <li>Standar service setting database Google pribadi: <b>+50K</b></li>
                <li>Standar database RMRN <b>100K / tahun</b></li>
            </ul>

            <a class="popup-wa" href="https://wa.me/6281255721597" target="_blank">
                Pertanyaan Hubungi WA Kami
            </a>

            <button id="closePopup">Tutup</button>
        </div>
    `;

    // --- Style popup langsung dari JS ---
    const style = document.createElement("style");
    style.innerHTML = `
        #rmrnPopup {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity .4s ease;
            z-index: 99999;
        }

        #rmrnPopup.show {
            opacity: 1;
            pointer-events: auto;
        }

        #rmrnPopup .popup-content {
            width: 90%;
            max-width: 360px;
            background: #fff;
            border-radius: 16px;
            padding: 22px;
            text-align: center;
            font-family: 'Poppins', sans-serif;
            transform: translateY(30px);
            opacity: 0;
            transition: all .4s ease;
        }

        #rmrnPopup.show .popup-content {
            opacity: 1;
            transform: translateY(0);
        }

        #rmrnPopup h2 {
            margin-bottom: 12px;
            font-size: 1.25rem;
            color: #d4af37;
        }

        #rmrnPopup ul {
            text-align: left;
            margin: 10px 0;
            padding-left: 18px;
            color: #333;
            font-size: 0.93rem;
        }

        #rmrnPopup p {
            color: #222;
        }

        #rmrnPopup .popup-wa {
            display: block;
            margin: 18px auto 10px;
            background: #25d366;
            color: #fff;
            padding: 10px 14px;
            border-radius: 10px;
            font-weight: 600;
            text-decoration: none;
            font-size: 0.95rem;
            transition: .3s;
        }
        #rmrnPopup .popup-wa:hover {
            background: #1eb857;
        }

        #closePopup {
            margin-top: 10px;
            padding: 8px 14px;
            background: #ccc;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: .3s;
        }
        #closePopup:hover {
            background: #bbb;
        }
    `;

    // Tambah ke dokumen
    document.body.appendChild(popup);
    document.head.appendChild(style);

    // === LOGIKA POPUP ===
    function showPopup() {
        popup.classList.add("show");
    }

    function hidePopup() {
        popup.classList.remove("show");

        // Muncul lagi setelah 15 detik
        setTimeout(showPopup, 15000);
    }

    // Tombol close
    document.getElementById("closePopup").addEventListener("click", hidePopup);

    // Muncul pertama kali setelah 10 detik
    setTimeout(showPopup, 10000);

})();