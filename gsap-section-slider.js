gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let panels = gsap.utils.toArray('.wrapper--100vh'),
  observer = ScrollTrigger.normalizeScroll(true),
  scrollTween;

document.addEventListener(
  'touchstart',
  (e) => {
    if (scrollTween) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  { capture: true, passive: false }
);

function goToSection(panel, i, from) {
  if (!panels[i]) return;
  console.log('goto:', i, from);
  scrollTween = gsap.to(window, {
    duration: 1,
    onStart: () => {
      observer.disable();
      observer.enable();
    },
    scrollTo: { y: panels[i].offsetTop, autoKill: false },
    onComplete: () => (scrollTween = null),
    overwrite: true,
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'bottom-=90% bottom',
    end: 'bottom bottom',
    onEnter: (self) => self.isActive && !scrollTween && goToSection(panel, i, 'on enter'),
  });
});
panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'bottom+=90% bottom',
    end: 'bottom bottom',
    onEnterBack: (self) => !self.isActive && !scrollTween && goToSection(panel, i, 'on back'),
  });
});
