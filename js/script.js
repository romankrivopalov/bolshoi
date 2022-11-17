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

// drag'n'drop slider in partners block
  let slider = document.querySelector('.partners__wrapper'),
      innerSlider = document.querySelector('.partners__inner');

  function sliderPartners() {
    if (document.documentElement.clientWidth < 1280) {
      let pressed = false, startX, x;

      slider.addEventListener('mousedown', (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider.offsetLeft;
        slider.style.cursor = 'grabbing';
      });

      slider.addEventListener('mouseenter', () => {
        slider.style.cursor = 'grab';
      });

      slider.addEventListener('mouseup', () => {
        slider.style.cursor = 'grab';
      });

      window.addEventListener('mouseup', () => {
        pressed = false;
      });

      slider.addEventListener('mousemove', (e) => {
        if (!pressed) return;
        e.preventDefault();
        x = e.offsetX
        innerSlider.style.left = `${x - startX}px`
        checkboundary();
      });

      function checkboundary() {
        let outer = slider.getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();

        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = '0px';
        } else if (inner.right < outer.right) {
            innerSlider.style.left = `-${inner.width - outer.width}px`;
        }
      }

      checkboundary();
    } else {
      slider.style.cursor = 'auto';
    }
  }

  sliderPartners();

  window.addEventListener('resize', () => {
    sliderPartners();
  })
