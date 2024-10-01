document.addEventListener('DOMContentLoaded', function () {
  // Only on desktop
  if (window.innerWidth > 991) {
    const whyNav = document.querySelector('.why-nav');
    const container = document.querySelector('.container.is--why');

    if (whyNav && container) {
      //  check position and apply 'is--fixed' class
      const handleScroll = () => {
        const containerRect = container.getBoundingClientRect();
        const topOffset = containerRect.top;
        const bottomOffset = containerRect.bottom;
        const viewportHeight = window.innerHeight;

        //  container is at least 100px from both the top and bottom of the viewport
        const topCondition = topOffset <= 140;
        const bottomCondition = bottomOffset >= 200;

        if (topCondition && bottomCondition) whyNav.classList.add('is--fixed');
        else whyNav.classList.remove('is--fixed');
      };

      window.addEventListener('scroll', handleScroll);
      // Initial
      handleScroll();
    }
  }
});
