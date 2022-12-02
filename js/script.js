'use strict'

// mobile menu
  const hamburger = document.querySelector('.headline__hamburger'),
        sidepanel = document.querySelector('.sidepanel'),
        closeSidepanel = document.querySelector('.sidepanel__close');

  function openMenu() {
    sidepanel.classList.add('sidepanel_active');
  }

  function closeMenu() {
    sidepanel.classList.remove('sidepanel_active');
  }

  hamburger.addEventListener('click', openMenu);
  closeSidepanel.addEventListener('click', closeMenu);

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



  function moveSliderNext() {
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
  }

  function moveSliderPrev() {
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
  }

  btnNext.addEventListener('click', moveSliderNext);
  btnPrev.addEventListener('click', moveSliderPrev);

// projects slider
  const sliderSection = document.querySelector('.projects'),
        sliderStickyWrapper = sliderSection.querySelector('.projects__sticky-wrapper'),
        sliderHiddenWrapper = sliderStickyWrapper.querySelector('.projects__hidden-wrapper'),
        sliderInner = sliderHiddenWrapper.querySelector('.projects__inner'),
        sliderItems = sliderInner.querySelectorAll('.project'),
        sliderHiddenWidth = (sliderItems[0].offsetWidth * sliderItems.length) - sliderHiddenWrapper.offsetWidth,
        sliderSectionOffsetTop = window.pageYOffset + sliderSection.getBoundingClientRect().top,
        sliderSectionOffsetWindow = ((window.innerHeight - sliderStickyWrapper.offsetHeight) / 2),
        sliderOffset= 100;

  sliderItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.querySelector('.project__link').classList.add('project__link_show');
    })

    item.addEventListener('mouseout', () => {
      item.querySelector('.project__link').classList.remove('project__link_show');
    })
  })

  function addSliderSizes() {
    if (sliderHiddenWidth > 0) {
      sliderSection.style.height = `${sliderHiddenWidth + sliderStickyWrapper.offsetHeight + (sliderOffset * 2)}px`;
    } else {
      sliderHiddenWrapper.style.margin = '0'
      sliderInner.style.justifyContent = 'center'
    }

    sliderStickyWrapper.style.top = `${(sliderSectionOffsetWindow)}px`;
  }

  function moveSliderInner() {
    let scroll = window.scrollY;

    if (sliderHiddenWidth > 0 && scroll > sliderSectionOffsetTop - sliderSectionOffsetWindow + sliderOffset && scroll < (sliderSectionOffsetTop - sliderSectionOffsetWindow) + (sliderHiddenWidth + (sliderOffset))) {
      sliderInner.style.transform = `translateX(-${scroll - (sliderSectionOffsetTop - sliderSectionOffsetWindow + sliderOffset)}px)`
    } else if (scroll < sliderSectionOffsetTop - sliderSectionOffsetWindow + sliderOffset) {
      sliderInner.style.transform = `translateX(0px)`
    };
  }

  document.addEventListener('scroll', moveSliderInner);

  addSliderSizes();

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

      checkboundary();
    } else {
      slider.style.cursor = 'auto';
    }
  }

  function checkboundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
  }

  sliderPartners();

  window.addEventListener('resize', sliderPartners);
