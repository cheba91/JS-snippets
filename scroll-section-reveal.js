// Reveal sections one by one on vertical scroll
  document.addEventListener('DOMContentLoaded', () => {
    const expSection = document.querySelector('.scroll-section');
    const sxpSlides = document.querySelectorAll('.scroll-section .scroll-section__slide');

    const handleScroll = () => {
      const sectionTop = expSection.offsetTop;
      const sectionHeight = expSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const progress = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / sectionHeight));
      const activeIndex = Math.min(Math.floor(progress * sxpSlides.length), sxpSlides.length - 1);

      sxpSlides.forEach((slide, index) => {
        if (index === activeIndex) slide.style.opacity = '1';
        else slide.style.opacity = '0';
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });
