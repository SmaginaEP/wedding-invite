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
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }
});

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

// Инструкция в консоли
console.log('🎉 Свадебный сайт готов!');
console.log('📌 Чтобы заменить картинки схем:');
console.log('1. Загрузите ваши изображения в папку images/');
console.log('2. Замените плейсхолдеры на <img src="images/ваша_картинка.jpg">');



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