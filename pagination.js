  const createPagination = (currentPage, nrOfPages) => {
    const pageNumberTemplate = paginationWrap.querySelector('.pagination__button.is--template');
    // Remove all previous page numbers
    paginationWrap.querySelectorAll('.pagination__button[page]').forEach((pageBtn) => pageBtn.remove());
    paginationWrap.querySelectorAll('.pagination__dots').forEach((dots) => dots.remove());

    if (!nrOfPages || nrOfPages === 1) {
      paginationWrap.classList.add('is--inactive');
    } else {
      paginationWrap.classList.remove('is--inactive');

      if (currentPage === 1) previousButton.classList.add('is--disabled');
      else previousButton.classList.remove('is--disabled');

      if (currentPage === nrOfPages) nextButton.classList.add('is--disabled');
      else nextButton.classList.remove('is--disabled');

      const addPageButton = (page) => {
        const pageNr = pageNumberTemplate.cloneNode(true);
        pageNr.setAttribute('page', page);
        pageNr.classList.remove('is--template');
        pageNr.textContent = page;
        if (page === currentPage) pageNr.classList.add('is--active');
        pageNr.addEventListener('click', () => getTutors(page));
        pageNumberTemplate.insertAdjacentElement('beforebegin', pageNr);
      };

      const addDots = () => {
        const dots = document.createElement('span');
        dots.className = 'pagination__dots';
        dots.textContent = '...';
        pageNumberTemplate.insertAdjacentElement('beforebegin', dots);
      };

      let addedDots = false; // To ensure dots are added only once per gap
      for (let i = 1; i <= nrOfPages; i++) {
        if (
          i === 1 || // Always show the first page
          i === nrOfPages || // Always show the last page
          i === currentPage || // Always show the current page
          i === currentPage - 1 || // One page before the current page
          i === currentPage + 1 // One page after the current page
        ) {
          addPageButton(i);
          addedDots = false; // Reset dot flag after showing a number
        } else if (!addedDots) {
          // Add dots for skipped ranges
          addDots();
          addedDots = true;
        }
      }
    }
  };
