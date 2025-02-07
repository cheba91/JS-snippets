document.addEventListener('DOMContentLoaded', () => {
  const leftButton = document.querySelector('.plans-nav__arrow.is--left');
  const rightButton = document.querySelector('.plans-nav__arrow.is--right');
  const scrollContainer = document.querySelector('.plans .plans__inner');

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  const getScrollDistance = () => {
    const screenWidth = window.innerWidth;
    // 991 - 768 = 25% of the container width
    if (screenWidth <= 991 && screenWidth >= 768) {
      return scrollContainer.offsetWidth * 0.25;
      // 767 - 480 = 35% of the container width
    } else if (screenWidth <= 767 && screenWidth >= 480) {
      return scrollContainer.offsetWidth * 0.35;
      // <479 = 45% of the container width
    } else if (screenWidth <= 479) {
      return scrollContainer.offsetWidth * 0.45;
    }
  };

  const scrollLeft = () => scrollContainer.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
  const scrollRight = () => scrollContainer.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });

  leftButton?.addEventListener('click', scrollLeft);
  rightButton?.addEventListener('click', scrollRight);

  scrollContainer.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

  scrollContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  scrollContainer.addEventListener(
    'touchmove',
    (e) => {
      touchEndX = e.touches[0].clientX;
      e.preventDefault();
    },
    { passive: false }
  );

  scrollContainer.addEventListener('touchend', () => {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) scrollRight();
      else scrollLeft();
    }
  });
});
