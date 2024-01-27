  // Accepting and passing referral links
  // Will save the new params in local storage and overwrite them if they exist
  // If params don't exist, will get them from local storage
  // Uses current/saved params to fill all buttons with class 'js--fill-link'
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cParamOne = urlParams.get('param-one');
    const cParamTwo = urlParams.get('param-two');
    // Remove params from url except anchors
    const url = window.location.href;
    const urlNoParams = url.split('?')[0];
    window.history.replaceState({}, document.title, urlNoParams);

    let sParamOne, sParamTwo;
    if (cParamOne && cParamTwo) {
      // Store params in local storage if they exist
      localStorage.setItem('param-one', cParamOne);
      localStorage.setItem('param-two', cParamTwo);
      console.log(`cParamOne: ${cParamOne}, cParamTwo: ${cParamTwo}`);
    } else {
      // Get params from local storage if they exist
      sParamOne = localStorage.getItem('param-one');
      sParamTwo = localStorage.getItem('param-two');
      console.log(`sParamOne: ${sParamOne}, sParamTwo: ${sParamTwo}`);
    }
    if ((cParamOne && cParamTwo) || (sParamOne && sParamTwo)) {
      // If params exist, add them to all buttons with class 'js--fill-link'
      const paramOne = cParamOne || sParamOne;
      const paramTwo = cParamTwo || sParamTwo;
      document.querySelectorAll('.js--fill-link').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `${btn.href}refer/${paramTwo}/${paramOne}`;
        });
      });
    }
  });
