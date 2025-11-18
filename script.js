// js/main.js - Final Version (copy-paste ini aja bro)

document.addEventListener("DOMContentLoaded", function () {

    // Inisialisasi AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Swiper Undangan Online
    const undanganSwiper = new Swiper('.undanganSwiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,     // bonus: pause pas hover (enak di desktop)
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576:  { slidesPerView: 2 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1400: { slidesPerView: 5 }
        }
    });

    // Smooth scroll untuk anchor link (navbar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // sesuain sama tinggi navbar fixed
                    behavior: 'smooth'
                });
            }
        });
    });

});