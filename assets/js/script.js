'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

// our cars


        const carouselStates = {
            carousel1: { currentIndex: 0, cardsVisible: 4 },
            carousel2: { currentIndex: 0, cardsVisible: 4 }
        };

        function updateCardsVisible() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 576) {
                carouselStates.carousel1.cardsVisible = 1;
                carouselStates.carousel2.cardsVisible = 1;
            } else if (screenWidth < 768) {
                carouselStates.carousel1.cardsVisible = 1;
                carouselStates.carousel2.cardsVisible = 1;
            } else if (screenWidth < 992) {
                carouselStates.carousel1.cardsVisible = 2;
                carouselStates.carousel2.cardsVisible = 2;
            } else if (screenWidth < 1200) {
                carouselStates.carousel1.cardsVisible = 3;
                carouselStates.carousel2.cardsVisible = 3;
            } else if (screenWidth < 1400) {
                carouselStates.carousel1.cardsVisible = 4;
                carouselStates.carousel2.cardsVisible = 4;
            } else {
                carouselStates.carousel1.cardsVisible = 4;
                carouselStates.carousel2.cardsVisible = 4;
            }
        }

        function scrollCarousel(carouselId, direction) {
            const carousel = document.getElementById(carouselId);
            const cards = carousel.children;
            const state = carouselStates[carouselId];
            
            state.currentIndex += direction;
            
            const maxIndex = Math.max(0, cards.length - state.cardsVisible);
            state.currentIndex = Math.max(0, Math.min(state.currentIndex, maxIndex));
            
            const cardWidth = cards[0].offsetWidth + 20; // including gap
            const translateX = -state.currentIndex * cardWidth;
            
            carousel.style.transform = `translateX(${translateX}px)`;
            
            updateNavigationButtons(carouselId);
        }

        function updateNavigationButtons(carouselId) {
            const carousel = document.getElementById(carouselId);
            const cards = carousel.children;
            const state = carouselStates[carouselId];
            const controls = carousel.closest('.carousel-container').querySelector('.carousel-controls');
            const prevBtn = controls.children[0];
            const nextBtn = controls.children[1];
            
            prevBtn.disabled = state.currentIndex === 0;
            nextBtn.disabled = state.currentIndex >= cards.length - state.cardsVisible;
            
            updateScrollIndicator(carouselId);
        }

        function updateScrollIndicator(carouselId) {
            const carousel = document.getElementById(carouselId);
            const cards = carousel.children;
            const state = carouselStates[carouselId];
            const progressBar = document.getElementById(carouselId === 'carousel1' ? 'progress1' : 'progress2');
            
            const maxIndex = Math.max(0, cards.length - state.cardsVisible);
            const progressPercentage = maxIndex > 0 ? (state.currentIndex / maxIndex) * 100 : 100;
            
            progressBar.style.width = progressPercentage + '%';
        }

        // Initialize
        window.addEventListener('load', () => {
            updateCardsVisible();
            updateNavigationButtons('carousel1');
            updateNavigationButtons('carousel2');
            updateScrollIndicator('carousel1');
            updateScrollIndicator('carousel2');
        });

        window.addEventListener('resize', () => {
            updateCardsVisible();
            // Reset positions on resize
            carouselStates.carousel1.currentIndex = 0;
            carouselStates.carousel2.currentIndex = 0;
            document.getElementById('carousel1').style.transform = 'translateX(0)';
            document.getElementById('carousel2').style.transform = 'translateX(0)';
            updateNavigationButtons('carousel1');
            updateNavigationButtons('carousel2');
        });

        // Add smooth scrolling for mobile and touch events
        const carousels = document.querySelectorAll('.carousel-wrapper');
        carousels.forEach((wrapper, index) => {
            let isDown = false;
            let startX;
            let scrollLeft;
            let startTime;
            let velocity = 0;
            const carouselId = index === 0 ? 'carousel1' : 'carousel2';

            // Function to update scroll indicator based on actual scroll position
            function updateScrollIndicatorFromScroll() {
                const track = wrapper.querySelector('.carousel-track');
                const cards = track.children;
                const cardWidth = cards[0].offsetWidth + 20; // including gap
                const currentIndex = Math.round(Math.abs(getTranslateX(track)) / cardWidth);
                const state = carouselStates[carouselId];
                
                // Update the state to match current position
                state.currentIndex = Math.max(0, Math.min(currentIndex, cards.length - state.cardsVisible));
                
                // Update scroll indicator
                updateScrollIndicator(carouselId);
                updateNavigationButtons(carouselId);
            }

            // Helper function to get translateX value
            function getTranslateX(element) {
                const style = window.getComputedStyle(element);
                const matrix = style.transform || style.webkitTransform || style.mozTransform;
                if (matrix === 'none' || typeof matrix === 'undefined') {
                    return 0;
                }
                const matrixType = matrix.includes('3d') ? 'matrix3d' : 'matrix';
                const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                return matrixType === 'matrix3d' ? parseFloat(matrixValues[12]) : parseFloat(matrixValues[4]);
            }

            // Mouse events for desktop
            wrapper.addEventListener('mousedown', (e) => {
                if (window.innerWidth > 768) {
                    isDown = true;
                    startX = e.pageX - wrapper.offsetLeft;
                    const track = wrapper.querySelector('.carousel-track');
                    scrollLeft = getTranslateX(track);
                    startTime = Date.now();
                    wrapper.style.cursor = 'grabbing';
                    e.preventDefault();
                }
            });

            wrapper.addEventListener('mouseleave', () => {
                if (isDown) {
                    updateScrollIndicatorFromScroll();
                }
                isDown = false;
                wrapper.style.cursor = 'grab';
            });

            wrapper.addEventListener('mouseup', () => {
                if (isDown) {
                    updateScrollIndicatorFromScroll();
                }
                isDown = false;
                wrapper.style.cursor = 'grab';
            });

            wrapper.addEventListener('mousemove', (e) => {
                if (!isDown || window.innerWidth <= 768) return;
                e.preventDefault();
                const x = e.pageX - wrapper.offsetLeft;
                const walk = (x - startX);
                const track = wrapper.querySelector('.carousel-track');
                const cards = track.children;
                const cardWidth = cards[0].offsetWidth + 20;
                const maxTranslate = -(cards.length - carouselStates[carouselId].cardsVisible) * cardWidth;
                
                const newTranslate = Math.max(maxTranslate, Math.min(0, scrollLeft + walk));
                track.style.transform = `translateX(${newTranslate}px)`;
                
                // Update scroll indicator in real-time
                const currentIndex = Math.round(Math.abs(newTranslate) / cardWidth);
                const state = carouselStates[carouselId];
                const maxIndex = Math.max(0, cards.length - state.cardsVisible);
                const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;
                const progressBar = document.getElementById(index === 0 ? 'progress1' : 'progress2');
                progressBar.style.width = Math.min(100, Math.max(0, progressPercentage)) + '%';
                
                // Calculate velocity for momentum
                const currentTime = Date.now();
                velocity = walk / (currentTime - startTime);
                startTime = currentTime;
            });

            // Touch events for mobile
            wrapper.addEventListener('touchstart', (e) => {
                const track = wrapper.querySelector('.carousel-track');
                startX = e.touches[0].clientX;
                scrollLeft = getTranslateX(track);
                startTime = Date.now();
            }, { passive: true });

            wrapper.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].clientX;
                const walk = x - startX;
                const track = wrapper.querySelector('.carousel-track');
                const cards = track.children;
                const cardWidth = cards[0].offsetWidth + 20;
                const maxTranslate = -(cards.length - carouselStates[carouselId].cardsVisible) * cardWidth;
                
                const newTranslate = Math.max(maxTranslate, Math.min(0, scrollLeft + walk));
                track.style.transform = `translateX(${newTranslate}px)`;
                
                // Update scroll indicator in real-time
                const currentIndex = Math.round(Math.abs(newTranslate) / cardWidth);
                const state = carouselStates[carouselId];
                const maxIndex = Math.max(0, cards.length - state.cardsVisible);
                const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;
                const progressBar = document.getElementById(index === 0 ? 'progress1' : 'progress2');
                progressBar.style.width = Math.min(100, Math.max(0, progressPercentage)) + '%';
                
                const currentTime = Date.now();
                velocity = walk / (currentTime - startTime);
                startTime = currentTime;
            }, { passive: true });

            wrapper.addEventListener('touchend', () => {
                if (startX !== null) {
                    updateScrollIndicatorFromScroll();
                }
                startX = null;
                
                // Add momentum scrolling
                if (Math.abs(velocity) > 0.5) {
                    const track = wrapper.querySelector('.carousel-track');
                    const currentTranslate = getTranslateX(track);
                    const momentum = velocity * 50;
                    const cards = track.children;
                    const cardWidth = cards[0].offsetWidth + 20;
                    const maxTranslate = -(cards.length - carouselStates[carouselId].cardsVisible) * cardWidth;
                    
                    const newTranslate = Math.max(maxTranslate, Math.min(0, currentTranslate + momentum));
                    track.style.transform = `translateX(${newTranslate}px)`;
                    
                    setTimeout(() => {
                        updateScrollIndicatorFromScroll();
                    }, 300);
                }
            }, { passive: true });

            // Update scroll indicator on scroll for native scrolling
            wrapper.addEventListener('scroll', () => {
                if (window.innerWidth <= 768) {
                    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
                    const scrollPercentage = maxScroll > 0 ? (wrapper.scrollLeft / maxScroll) * 100 : 0;
                    const progressBar = document.getElementById(index === 0 ? 'progress1' : 'progress2');
                    progressBar.style.width = scrollPercentage + '%';
                }
            });

            // Set initial cursor
            if (window.innerWidth > 768) {
                wrapper.style.cursor = 'grab';
            }
        });

// Simple slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testi-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Initialize
  showSlide(0);
});