/*
  Start playing goggles animation when the section comes into view. Goggles: two circles overlaying slightly, working as see-through objects
*/

const canvas = document.getElementById('gogglesCanvas');
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const duration = 2000;
  let startTime = null;
  let animationStarted = false;
  const targetScaleX = 11;
  const targetScaleY = 11;

  function easeInOutQuad(t) {
    return t * t * (3 - 2 * t);
  }

  function drawBlackScreen() {
    ctx.fillStyle = '#111110';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    const currentScaleX = easedProgress * targetScaleX;
    const currentScaleY = easedProgress * targetScaleY;

    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = '#111110';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.beginPath();

    const leftX = (579.102 - 720) * currentScaleX;
    const leftY = (500.101 - 500) * currentScaleY;
    const radiusX = 155.101 * currentScaleX;
    const radiusY = 155.101 * currentScaleY;
    ctx.ellipse(leftX, leftY, radiusX, radiusY, 0, 0, Math.PI * 2);

    const rightX = (861.897 - 720) * currentScaleX;
    const rightY = (500.101 - 500) * currentScaleY;
    ctx.ellipse(rightX, rightY, radiusX, radiusY, 0, 0, Math.PI * 2);

    ctx.restore();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const overlay = document.querySelector('.my-buy__overlay');
      if (overlay) overlay.style.display = 'none';
    }
  }

  drawBlackScreen();

  const observerOptions = {
    threshold: 0.7,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        requestAnimationFrame(animate);
      }
    });
  }, observerOptions);

  // Additional scroll listener to detect when section goes out of view
  window.addEventListener(
    'scroll',
    () => {
      const myBuySection = document.querySelector('.my-buy');
      if (myBuySection) {
        const sectionRect = myBuySection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (sectionRect.top > viewportHeight && animationStarted) {
          animationStarted = false;
          startTime = null;
          drawBlackScreen();
          const overlay = document.querySelector('.my-buy__overlay');
          if (overlay) overlay.style.display = 'block';
        }
      }
    },
    { passive: true }
  );

  const myBuySection = document.querySelector('.my-buy');
  if (myBuySection) {
    observer.observe(myBuySection);
  }
