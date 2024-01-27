  const randomNr = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const particles = document.querySelectorAll('.particle');
  particles.forEach((P) => {
    P.setAttribute(
      'style',
      `
		--x: ${randomNr(21, 82)};
		--y: ${randomNr(21, 82)};
		--duration: ${randomNr(6, 21)};
		--delay: ${randomNr(1, 10)};
		--alpha: ${randomNr(40, 90) / 100};
		--origin-x: ${Math.random() > 0.5 ? randomNr(320, 820) * -1 : randomNr(320, 820)}%;
		--origin-y: ${Math.random() > 0.5 ? randomNr(320, 820) * -1 : randomNr(320, 820)}%;
		--size: ${randomNr(40, 90) / 100};
	`
    );
  });
