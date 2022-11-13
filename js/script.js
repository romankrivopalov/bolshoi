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
