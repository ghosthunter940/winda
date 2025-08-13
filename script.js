document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Durasi animasi
        once: true, // Animasi hanya berjalan sekali
        offset: 50, // Trigger animasi sedikit sebelum elemen terlihat
    });

    // Navigasi Mobile (Burger Menu)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animasi Link
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animasi Burger
        burger.classList.toggle('toggle');
    });

    // Animasi Ketik untuk Teks Selamat Datang
    const welcomeTextElement = document.querySelector('.welcome-text');
    const textToType = "Hi, Saya Wiwinda Sitinjak"; // Teks yang ingin ditampilkan
    let i = 0;
    let isDeleting = false;
    let speed = 150; // Kecepatan ketik

    function typeWriter() {
        if (i < textToType.length && !isDeleting) {
            welcomeTextElement.innerHTML += textToType.charAt(i);
            i++;
            speed = 150;
        } else {
            // Tidak ada efek menghapus di contoh ini, hanya tampilkan
            return; 
        }
        setTimeout(typeWriter, speed);
    }

    // Mulai animasi ketik setelah sedikit delay agar AOS beranda selesai
    setTimeout(typeWriter, 700); // Sesuaikan delay jika perlu

    // Smooth scroll untuk link internal & active link (opsional)
    const internalNavLinks = document.querySelectorAll('nav a[href^="#"]');
    internalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Menutup nav mobile jika terbuka saat link di klik
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => link.style.animation = '');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 70 adalah tinggi header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll (opsional)
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // 80 sedikit lebih dari tinggi header
                current = section.getAttribute('id');
            }
        });

        internalNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});