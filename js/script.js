'use strict'

// mobile menu
const hamburger = document.querySelector('.headline__hamburger'),
      sidepanel = document.querySelector('.sidepanel'),
      closeSidepanel = document.querySelector('.sidepanel__close');

hamburger.addEventListener('click', () => {
  sidepanel.classList.add('sidepanel_active');
});

closeSidepanel.addEventListener('click', () => {
  sidepanel.classList.remove('sidepanel_active');
});

// slider
let slideIndex = 1,
    offset = 0;

const slides = document.querySelectorAll('.slider__img'),
      btnPrev = document.querySelector('#btn-prev'),
      btnNext = document.querySelector('#btn-next'),
      slidesWrapper = document.querySelector('.slider__wrapper'),
      slidesField = document.querySelector('.slider__items'),
      slideItem = document.querySelector('.slider__item'),
      widthSlide = 450;

slidesField.style.width = widthSlide * slides.length + 'px';
slidesField.style.transition = '0.8s all ease-in-out';

slides.forEach(slide => {
  let imgSlide = slide.src;
  slideItem.style.backgroundImage = imgSlide;
})

btnNext.addEventListener('click', () => {
  if (offset == widthSlide * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += widthSlide;
  }

  slidesField.style.transform = `translateX(-${offset}px)`

  if (slideIndex == slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }
});

btnPrev.addEventListener('click', () => {
  if (offset == 0) {
    offset = widthSlide * (slides.length - 1);
  } else {
    offset -= widthSlide;
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }
});
