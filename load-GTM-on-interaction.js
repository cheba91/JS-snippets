window.pageIsLoaded = false;
const createGTMscript = () => {
  if (window.scriptCreated) return;
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
  window.scriptCreated = true;
};

window.addEventListener('load', () => (window.pageIsLoaded = true));
['mousemove', 'touchstart'].forEach((e) => {
  window.addEventListener(e, () => {
    if (window.pageIsLoaded) createGTMscript();
  });
});
