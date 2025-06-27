  const sections = document.querySelectorAll('[nav-change]');
  const nav = document.querySelector('.nav');
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      if (visibleSections.length > 0) {
        const topSection = visibleSections.reduce((top, current) => {
          return current.boundingClientRect.top < top.boundingClientRect.top ? current : top;
        });
        const colorTheme = topSection.target.getAttribute('nav-change');
        if (colorTheme === 'dark') {
          nav.setAttribute('color-theme', 'dark');
          nav.classList.remove('hidden');
        } else if (colorTheme === 'light') {
          nav.setAttribute('color-theme', 'light');
          nav.classList.remove('hidden');
        } else if (colorTheme === 'mixed') {
          nav.setAttribute('color-theme', 'mixed');
          nav.classList.remove('hidden');
        } else if (colorTheme === 'hidden') {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
      }
    },
    {
      rootMargin: '0px 0px -99% 0px',
      threshold: 0,
    }
  );
  sections.forEach((section) => observer.observe(section));
