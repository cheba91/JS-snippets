document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 991) {
    const pointerScroll = (elem) => {
      const dragStart = (ev) => elem.setPointerCapture(ev.pointerId);
      const dragEnd = (ev) => elem.releasePointerCapture(ev.pointerId);
      const drag = (ev) => elem.hasPointerCapture(ev.pointerId) && (elem.scrollLeft -= ev.movementX);
      
      elem.addEventListener("pointerdown", dragStart);
      elem.addEventListener("pointerup", dragEnd);
      elem.addEventListener("pointermove", drag);
    };

    document.querySelectorAll(".roadmap").forEach(pointerScroll);
  }
});
// With links and variable width
document.addEventListener("DOMContentLoaded", () => {
  (function () {
    const container = document.querySelector('.scroll-container');
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    container.addEventListener('mousedown', (e) => {
      // Only activate if horizontal scroll is possible
      if (container.scrollWidth <= container.clientWidth) return;

      isDown = true;
      startX = e.pageX;
      scrollStart = container.scrollLeft;
      hasDragged = false;

      container.classList.add('drag-active');
      e.preventDefault(); // prevent text selection
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;

      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) hasDragged = true;

      container.scrollLeft = scrollStart - dx;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('drag-active');
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('drag-active');
    });

    container.addEventListener('click', (e) => {
      // Prevent clicking on links if user dragged
      if (hasDragged && e.target.closest('a')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  })();
});
