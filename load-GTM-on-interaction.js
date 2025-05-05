const scriptsToLoad = [];
// Load on interect
const loadScriptsOnInteract = () => {
  if (window.scriptsCreated) return;
  // load GTM
  var w = window,
    d = document,
    s = 'script',
    l = 'dataLayer',
    i = 'GTM-0000000';
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);

  // Load other scripts
  scriptsToLoad.forEach((src) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  });

  window.scriptsCreated = true;
  console.log('interaction scripts created');
};

window.addEventListener('load', () => {
  ['mousemove', 'touchstart'].forEach((ev) => window.addEventListener(ev, loadScriptsOnInteract));
  // Other script that need only "load" event
});

// Load just HS script
window.addEventListener('load', () => {
  ['mousemove', 'touchstart'].forEach((e) =>
    window.addEventListener(e, () => {
      if (window.hsScriptsCreated) return;
      // Create the script
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
      // Create the form
      script.onload = () => {
        hbspt.forms.create({
          region: 'na1',
          portalId: '',
          formId: '',
        });
      };
      window.hsScriptsCreated = true;
    })
  );
});
