// js/main.js – Versi FINAL (copy-paste ini aja, langsung jalan!)

document.addEventListener("DOMContentLoaded", function () {

    // ==== AOS Animation ====
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ==== Swiper – Undangan Online ====
    const undanganSwiper = new Swiper('.undanganSwiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true   // pause saat hover (enak di desktop)
        },
        pagination: {
            el: '.undanganSwiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.undanganSwiper .swiper-button-next',
            prevEl: '.undanganSwiper .swiper-button-prev',
        },
        breakpoints: {
            576:  { slidesPerView: 2 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1400: { slidesPerView: 5 }
        }
    });

    // ==== Swiper – Souvenir Korek Custom ====
    const souvenirSwiper = new Swiper('.souvenirSwiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.souvenirSwiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.souvenirSwiper .swiper-button-next',
            prevEl: '.souvenirSwiper .swiper-button-prev',
        },
        breakpoints: {
            576:  { slidesPerView: 2 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1400: { slidesPerView: 5 }
        }
    });

    // ==== Smooth Scroll untuk Navbar Anchor ====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // tinggi navbar fixed
                    behavior: 'smooth'
                });
            }
        });
    });

});