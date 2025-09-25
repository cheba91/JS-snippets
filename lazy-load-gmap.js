  window.addEventListener('load', () => {
    const mapContainer = document.querySelector('.location__map-embed');
    const loadMap = () => {
      const iframe = document.createElement('iframe');
      iframe.src = '';
      iframe.title = '';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';

      mapContainer.innerHTML = '';
      mapContainer.appendChild(iframe);
    };

    const handleScroll = () => {
      const rect = mapContainer.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        loadMap();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
  });
