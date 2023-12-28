var stars = new StarRating('.star-rating',);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function openModal() {
    let modal = document.getElementById('myModalLogin');
    const body = document.querySelector('body');

    body.style.overflow = 'hidden';
    modal.style.display = 'block';
}

function closeModal() {
    let modal = document.getElementById('myModalLogin');


    const body = document.querySelector('body');
    modal.style.display = 'none';

    body.style.overflow = 'auto';

}

function openModal1() {
    let modal = document.getElementById('myModal1');
    const body = document.querySelector('body');

    body.style.overflow = 'hidden';
    modal.style.display = 'block';
}

function closeModal1() {
    let modal = document.getElementById('myModal1');


    const body = document.querySelector('body');
    modal.style.display = 'none';

    body.style.overflow = 'auto';

}


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header_menu");
const hamColor = document.querySelectorAll(".bar");
const fixatedBody = document.body;


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    fixatedBody.classList.toggle('body-fixated');
    hamColor.forEach(element => {
        hamColor[0].classList.toggle("active");
        hamColor[2].classList.toggle("active");
    });
})

document.querySelectorAll(".header_menu-item").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    fixatedBody.classList.remove('body-fixated');
    hamColor.forEach(element => {
        hamColor[0].classList.remove("active");
        hamColor[2].classList.remove("active");
    });
}))

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});


var lightbox = new SimpleLightbox('.gallery a', {
    zoom: true,
    alertError: true,
    alertErrorMessage: "",
    swipeClose: false,
});