  // Scroll to anchor after inactivity
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 992) return;
    let userInterrupted = false;
    const interuptionHandle = () => {
      userInterrupted = true;
      window.removeEventListener('wheel', interuptionHandle);
    };

    setTimeout(() => {
      const heroAnchor = document.querySelector('.scrollto-anchor');
      const targetOffset = heroAnchor.offsetTop;
      const duration = 13000;
      const framesPerSecond = 90;
      const scrollStep = (targetOffset - window.pageYOffset) / ((duration / 1000) * framesPerSecond);

      const animateScroll = () => {
        if (!userInterrupted) {
          window.scrollBy(0, scrollStep);

          if (window.pageYOffset < targetOffset) requestAnimationFrame(animateScroll);
          else window.scrollTo(0, targetOffset);
        }
      };
      animateScroll();
    }, 10000);

    ['wheel', 'touchstart', 'keydown'].forEach((event) => window.addEventListener(event, interuptionHandle));
    window.addEventListener('wheel', interuptionHandle);
  });
