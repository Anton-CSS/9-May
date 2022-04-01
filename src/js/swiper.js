import Swiper from 'swiper/bundle';

const swiper = new Swiper(".image-swiper", {
    loop:true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets:true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
    }
});

const newSwiper = new Swiper('.history__slider',{
    loop:true,
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false
    }
})