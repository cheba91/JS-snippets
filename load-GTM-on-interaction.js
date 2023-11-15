const loadScriptsOnInteract = () => {
  if (window.scriptsCreated) return;
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
  console.log('GTM script created');
  window.scriptsCreated = true;
  // Other scripts that need to be loaded on interact
};

window.addEventListener('load', () => {
  ['mousemove', 'touchstart'].forEach((ev) => window.addEventListener(ev, loadScriptsOnInteract));
  // Other script that need only "load" event
});
