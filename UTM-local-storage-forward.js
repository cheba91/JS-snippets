  //--- Save existing UTM parameters and add them to all Calendly links ---//
  window.addEventListener('load', () => {
    // Get all UTM parameters
    const utms = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams) {
      if (key.startsWith('utm_')) {
        utms[key] = value;
      }
    }

    // Save UTM parameters to localStorage
    if (Object.keys(utms).length > 0) localStorage.setItem('utms', JSON.stringify(utms));

    // Add UTMs to all Calendly links
    const savedUtms = JSON.parse(localStorage.getItem('utms') || '{}');
    if (Object.keys(utms).length > 0) {
      const utms = JSON.parse(savedUtms);
      const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
      calendlyLinks.forEach((link) => {
        const url = new URL(link.href);
        for (const [key, value] of Object.entries(utms)) url.searchParams.set(key, value);
        link.href = url.toString();
      });
    }
  });
