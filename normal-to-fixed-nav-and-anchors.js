// Only fixed nav
document.addEventListener('DOMContentLoaded',  () => {
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

// Fixed nav + active anchor links
document.addEventListener('DOMContentLoaded', () => {
  // Secondary nav
  const whyNav = document.querySelector('.why-nav');
  const container = document.querySelector('.container.is--why');

  // Anchor classes
  const anchorClass = 'scroll-anchor';
  const activeClass = 'is--active';
  const tocItemClass = 'why-nav__item';

  // Only on desktop
  if (window.innerWidth > 991) {
    if (whyNav && container) {
      const handleScroll = () => {
        // Check position and apply 'is--fixed' class to secondary nav
        const containerRect = container.getBoundingClientRect();
        const topOffset = containerRect.top;
        const bottomOffset = containerRect.bottom;

        const topCondition = topOffset <= 140;
        const bottomCondition = bottomOffset >= 200;

        if (topCondition && bottomCondition) whyNav.classList.add('is--fixed');
        else {
          whyNav.classList.remove('is--fixed');
          // Also remove all active classes
          document.querySelectorAll(`.${activeClass}`).forEach((el) => el.classList.remove(activeClass));
        }

        // Anchor active classes
        const anchors = document.querySelectorAll(`.${anchorClass}`);
        const scrollY = window.scrollY;

        anchors.forEach((anchor) => {
          const anchorRect = anchor.getBoundingClientRect();
          const distanceFromTop = anchorRect.top + scrollY;

          if (distanceFromTop <= scrollY + 180 && distanceFromTop > scrollY) {
            document.querySelectorAll(`.${activeClass}`).forEach((el) => el.classList.remove(activeClass));
            const id = anchor.getAttribute('id');
            const activeLink = document.querySelector(`.${tocItemClass}[href="#${id}"]`);

            if (activeLink) activeLink.classList.add(activeClass);
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      // Initial
      handleScroll();
    }
  }
});
