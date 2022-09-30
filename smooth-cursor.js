     <script>
         // Create element
         const circle = document.createElement('div');
         circle.setAttribute('id', 'circle');
         document.body.append(circle);

         // Initial
         let mouseX = 0,
            mouseY = 0,
            circleX = 0,
            circleY = 0;
         let speed = 0.15;

         function animate() {
            let distX = mouseX - circleX;
            let distY = mouseY - circleY;

            circleX = circleX + distX * speed;
            circleY = circleY + distY * speed;

            circle.style.left = circleX + 'px';
            circle.style.top = circleY + 'px';

            requestAnimationFrame(animate);
         }
         animate();

         function getParentClr(element, level = 1) {
            let retClr;
            while (level-- > 0 && element) {
               element = element.parentElement;
               if (!element) {
                  retClr = 'rgba(0, 0, 0, 0)';
               } else {
                  // console.log('element: ', element, element.nodeName);
                  retClr = getComputedStyle(element).backgroundColor;
               }
            }
            return retClr;
         }

         window.addEventListener('mousemove', function (e) {
            if (window.innerWidth < 1000) {
               // Dont show on small screens
               circle.style.display = 'none';
               return;
            }
            let avg;
            const tgt = e.target;
            const maxRight = window.innerWidth - 25; // prevent overflow on X
            let bgColor = getComputedStyle(tgt).backgroundColor;
            const currCursor = window.getComputedStyle(tgt)['cursor'];

            // check parent elements for BG color
            let i = 1;
            while (i < 8 && bgColor === 'rgba(0, 0, 0, 0)') {
               bgColor = getParentClr(tgt, i);
               // console.log('i: ', i, 'bgClr: ', bgColor);
               i++;
            }

            // Check BG color
            if (bgColor) {
               const color = bgColor.match(
                  /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
               );
               r = Number(color[1]);
               g = Number(color[2]);
               b = Number(color[3]);
               avg = (r + g + b) / 3;
               //Pure black BG dont exist on site
               if (avg === 0) avg = 255;
            } else avg = 255;

            // Enlarge circle for links
            const circleSize = currCursor === 'pointer' ? '22px' : '14px';
            circle.style.height = circleSize;
            circle.style.width = circleSize;

            // Change color, either white or primary clr
            const borderClr = avg > 120 ? 'rgb(44, 56, 66)' : '#fff';
            circle.style.borderColor = borderClr;

            //Move
            mouseX = event.pageX > maxRight ? maxRight : event.pageX;
            mouseY = event.pageY;
         });        
/* #circle {
            border: 1px solid #fff;
            border-radius: 50%;
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            z-index: 100;
            overflow: hidden;
         } */
