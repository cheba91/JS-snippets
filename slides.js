
////////////////////////// Slider //////////////////////////
<div class="slider">
   <div class="slide slide--1">
      <div class="slide-inner">
         <h5 class="slide__header">Header 1</h5>
         <blockquote class="slide__text">Content 1</blockquote>
      </div>
   </div>
   <div class="slide slide--2">
      <div class="slide-inner">
         <h5 class="slide__header">Header 2</h5>
         <blockquote class="slide__text">Content 2</blockquote>
      </div>
   </div>
   <div class="slide slide--3">
      <div class="slide-inner">
         <h5 class="slide__header">Header 3</h5>
         <blockquote class="slide__text">Content 3</blockquote>
      </div>
   </div>
   <button class="slider__btn slider__btn--left">&larr;</button>
   <button class="slider__btn slider__btn--right">&rarr;</button>
   <div class="dots"></div>
</div>;
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotCointainer = document.querySelector('.dots');
const maxSlides = slides.length - 1;
let currSlide = 0;
// Create dots bellow slides
const createDots = function () {
   slides.forEach(function (_, i) {
      dotCointainer.insertAdjacentHTML(
         'beforeend',
         `<button class="dots__dot" data-slide="${i}"></button>`
      );
   });
};
createDots();
// Moving the slides
const goToSlide = function (slide) {
   slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
   );
   // Show current dot as active
   document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
   });
   document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
};
// initial arrange of slides
goToSlide(0);
// Next slide
const nextSlide = () => {
   currSlide = currSlide === maxSlides ? 0 : ++currSlide;
   goToSlide(currSlide);
};
// Previous slide
const prevSlide = () => {
   currSlide = currSlide === 0 ? maxSlides : --currSlide;
   goToSlide(currSlide);
};
// move slides using buttons
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// move slides using dots
dotCointainer.addEventListener('click', function (e) {
   if (!e.target.classList.contains('dots__dot')) return;
   const slideNr = e.target.dataset.slide;
   goToSlide(slideNr);
});
////////////////////////// Tabbed component ////////////////////////////
<div class="tabbed">
   <div class="tabbed__tab-container">
      <button
         class="btn tabbed__tab tabbed__tab--1 tabbed__tab--active"
         data-tab="1"
      >
         <span>01</span>Button 1
      </button>
      <button class="btn tabbed__tab tabbed__tab--2" data-tab="2">
         <span>02</span>Button 2
      </button>
      <button class="btn tabbed__tab tabbed__tab--3" data-tab="3">
         <span>03</span>button 3
      </button>
   </div>
   <div class="tabbed__content tabbed__content--1 tabbed__content--active">
      <div class="tabbed__icon tabbed__icon--1">
         <svg>
            <use xlink:href="img/icons.svg#icon-upload"></use>
         </svg>
      </div>
      <h5 class="tabbed__header">Heading 1</h5>
      <p>Content 1</p>
   </div>

   <div class="tabbed__content tabbed__content--2">
      <div class="tabbed__icon tabbed__icon--2">
         <svg>
            <use xlink:href="img/icons.svg#icon-home"></use>
         </svg>
      </div>
      <h5 class="tabbed__header">Header 2</h5>
      <p>Content 2</p>
   </div>
   <div class="tabbed__content tabbed__content--3">
      <div class="tabbed__icon tabbed__icon--3">
         <svg>
            <use xlink:href="img/icons.svg#icon-user-x"></use>
         </svg>
      </div>
      <h5 class="tabbed__header">Header 3</h5>
      <p>Content 3</p>
   </div>
</div>;
const tabs = document.querySelectorAll('.tabbed__tab');
const tabsContainer = document.querySelector('.tabbed__tab-container');
const tabsContent = document.querySelectorAll('.tabbed__content');
// On click of tab buttons
tabsContainer.addEventListener('click', function (e) {
   const clickedEl = e.target.closest('.operations__tab');
   if (!clickedEl) return;
   // Remove all active classes and add it to only current
   tabs.forEach((el) => el.classList.remove('operations__tab--active'));
   clickedEl.classList.add('operations__tab--active');
   // Activate current content area
   const dataTab = clickedEl.dataset.tab;
   // Remove classes
   tabsContent.forEach((el) =>
      el.classList.remove('operations__content--active')
   );
   // Add current class
   document
      .querySelector(`.operations__content--${dataTab}`)
      .classList.add('operations__content--active');
   console.log(dataTab);
});
