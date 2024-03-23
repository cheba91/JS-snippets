  // Add active state on anchor link when section is intersecting
  const sectionIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const linkToSection = document.querySelector('#section-link');
        if (entry.intersectionRatio >= 0.5) linkToSection.classList.add('w--current');
        else linkToSection.classList.remove('w--current');
      }
    });
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.05, 0.5],
  };

  const sectionObserver = new IntersectionObserver(sectionIntersection, options);
  const observedSection = document.querySelector('#section-id');
  sectionObserver.observe(roadmap);
