const stepsWrap = document.querySelector('.steps-wrap');
const steps = document.querySelectorAll('.steps-wrap .steps__step');
const stepImages = document.querySelectorAll('.steps__left__image');
const startAtPercentage = 25;
const endAtPercentage = 100;

window.addEventListener('scroll', () => {
  const rect = stepsWrap.getBoundingClientRect();
  const totalHeight = stepsWrap.offsetHeight;
  const distanceScrolled = window.innerHeight - rect.top;
  const percentageScrolled = Math.min(Math.max((distanceScrolled / totalHeight) * endAtPercentage, 0), endAtPercentage).toFixed(2);

  // Add is--active class to the current step and image
  if (percentageScrolled >= startAtPercentage) {
    steps.forEach((step) => step.classList.remove('is--active'));
    stepImages.forEach((stepImg) => stepImg.classList.remove('is--active'));

    const currentStep = Math.min(
      Math.floor((percentageScrolled - startAtPercentage) / ((endAtPercentage - startAtPercentage) / steps.length)),
      steps.length - 1
    );
    console.log(`Current step: ${currentStep}`);
    steps[currentStep].classList.add('is--active');
    stepImages[currentStep].classList.add('is--active');
  } else if (percentageScrolled < startAtPercentage) {
    // Above scroll section: show first step
    steps.forEach((step) => step.classList.remove('is--active'));
    stepImages.forEach((stepImg) => stepImg.classList.remove('is--active'));
    steps[0].classList.add('is--active');
    stepImages[0].classList.add('is--active');
  } else if (percentageScrolled >= 99) {
    // Below scroll section: show last step
    steps.forEach((step) => step.classList.remove('is--active'));
    stepImages.forEach((stepImg) => stepImg.classList.remove('is--active'));
    steps[steps.length - 1].classList.add('is--active');
    stepImages[stepImages.length - 1].classList.add('is--active');
  }

  console.log(`Scrolled: ${percentageScrolled}`);
});

const scrollToStep = (index) => {
  const stepsRect = stepsWrap.getBoundingClientRect();
  const totalHeight = stepsWrap.offsetHeight;
  const stepHeight = totalHeight / steps.length;

  let targetPosition;

  if (index === 0) {
    targetPosition = (startAtPercentage / 100) * totalHeight;
  } else {
    targetPosition = ((index * stepHeight) / totalHeight) * (endAtPercentage - startAtPercentage) + startAtPercentage;
    targetPosition = (targetPosition / 100) * totalHeight;
  }

  const scrollPosition = window.scrollY + stepsRect.top + targetPosition - window.innerHeight * (startAtPercentage / 100);

  window.scrollTo({
    top: Math.max(0, scrollPosition),
    behavior: 'smooth',
  });
};

// On step click
steps.forEach((step, index) => {
  step.addEventListener('click', () => {
    scrollToStep(index);
  });
});
