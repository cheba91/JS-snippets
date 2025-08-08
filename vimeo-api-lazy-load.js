  document.addEventListener('DOMContentLoaded', () => {
    const vimeoPlaceholders = document.querySelectorAll('[vimeo-id]');
    if (!vimeoPlaceholders.length) return;

    let loaded = false;
    const firstVideo = vimeoPlaceholders[0];

    const loadAllVideos = () => {
      if (loaded) return;
      loaded = true;

      // Create script
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      document.body.appendChild(script);
      console.log('Vimeo API script loaded');

      // Create players
      vimeoPlaceholders.forEach((placeholder) => {
        const videoId = placeholder.getAttribute('vimeo-id');
        const hasAutoplay = placeholder.hasAttribute('vimeo-autoplay');

        let src = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

        if (hasAutoplay) src += '&autoplay=1&muted=1&controls=0';

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.title = 'Vimeo video player';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        placeholder.innerHTML = '';
        placeholder.style.background = 'linear-gradient(135deg, #2B2B2B 0%, #755FC4 100%)';
        placeholder.appendChild(iframe);
      });

      window.removeEventListener('scroll', onScroll);
    };

    const onScroll = () => {
      if (loaded) return;
      const rect = firstVideo.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh * 3 && rect.bottom > -vh * 3) loadAllVideos();
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
  });
