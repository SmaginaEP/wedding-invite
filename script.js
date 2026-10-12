// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Плавная прокрутка для всех ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

// Кнопка "Открыть на карте"
const mapButton = document.getElementById('openMap');
if (mapButton) {
    mapButton.addEventListener('click', function(e) {
        e.preventDefault();
        const address = encodeURIComponent('Санкт-Петербург, территория Сергиево, ул.Свердлова дом 32/1');
        window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
    });
}
const mapButton1 = document.getElementById('openMap1');
if (mapButton1) {
    mapButton1.addEventListener('click', function(e) {
        e.preventDefault();
        const address = encodeURIComponent('Санкт-Петербург, ул. Доблести, 36');
        window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
    });
}

// Эффект при скролле для навигации
// Auto-hide navbar при скролле
let lastScrollY = window.scrollY;
let ticking = false;
const navbar = document.querySelector('.navbar');
const SCROLL_THRESHOLD = 10; // минимальная дистанция для срабатывания

function updateNavbar() {
  const currentScrollY = window.scrollY;

  if (navbar) {
    // Не скрываем шапку, если открыто мобильное меню
    const menuOpen = navMenu && navMenu.classList.contains('active');

    if (menuOpen) {
      navbar.classList.remove('hidden');
    } else if (currentScrollY < 80) {
      // В самом верху страницы — шапка всегда видна
      navbar.classList.remove('hidden');
    } else if (currentScrollY > lastScrollY + SCROLL_THRESHOLD) {
      // Скроллим вниз — прячем
      navbar.classList.add('hidden');
    } else if (currentScrollY < lastScrollY - SCROLL_THRESHOLD) {
      // Скроллим вверх — показываем
      navbar.classList.remove('hidden');
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// Анимация появления элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за новыми элементами
document.querySelectorAll('.detail-card, .schedule-day, .map-card').forEach(el => {
    observer.observe(el);
});




document.addEventListener('DOMContentLoaded', function() {
        // Функция для синхронизации подсветки
        function highlightRoom(roomName, isActive) {
            // Находим все оверлеи с таким названием комнаты
            const overlays = document.querySelectorAll(`.room-overlay[data-room="${roomName}"]`);
            overlays.forEach(overlay => {
                if (isActive) {
                    overlay.classList.add('active');
                } else {
                    overlay.classList.remove('active');
                }
            });

            // Находим все строки в списках с таким названием комнаты
            const listItems = document.querySelectorAll(`.residents-list li[data-room-target="${roomName}"]`);
            listItems.forEach(item => {
                if (isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // 1. Наведение на оверлей (картинку)
        const overlays = document.querySelectorAll('.room-overlay');
        overlays.forEach(overlay => {
            overlay.addEventListener('mouseenter', function() {
                const roomName = this.getAttribute('data-room');
                highlightRoom(roomName, true);
            });
            overlay.addEventListener('mouseleave', function() {
                const roomName = this.getAttribute('data-room');
                highlightRoom(roomName, false);
            });
        });

        // 2. Наведение на строку в списке
        const listItems = document.querySelectorAll('.residents-list li');
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const roomName = this.getAttribute('data-room-target');
                if (roomName) {
                    highlightRoom(roomName, true);
                }
            });
            item.addEventListener('mouseleave', function() {
                const roomName = this.getAttribute('data-room-target');
                if (roomName) {
                    highlightRoom(roomName, false);
                }
            });
        });
    });
    // Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active')) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  }
});

// Закрытие меню при изменении ориентации / ресайзе
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu) {
    navMenu.classList.remove('active');
  }
});