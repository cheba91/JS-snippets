
  window.addEventListener('load', () => {
    const section = document.querySelector('.scroll-section');
    const lastElement = document.querySelector('.card[scroll-element="last"]');

    const sectionRect = section.getBoundingClientRect();
    const lastElementRect = lastElement.getBoundingClientRect();
    const totalMove = lastElementRect.right - sectionRect.right;

    window.addEventListener('scroll', () => {
      const sectionRect = section.getBoundingClientRect();
      const lastElementRect = lastElement.getBoundingClientRect();

      let progress = 0;
      if (sectionRect.top <= 0) {
        const rawProgress = Math.abs(sectionRect.top) / (section.offsetHeight - window.innerHeight);
        progress = Math.min(1, rawProgress);
      }

      const moveX = totalMove * progress;
      lastElement.parentElement.style.transform = `translateX(-${moveX}px)`;
    });
  });

