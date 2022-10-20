   // Open dropdown
   const searchField = document.querySelector('.search-field');
   const results = document.querySelector('.search-results');
   if (searchField) {
      searchField.addEventListener('input', (e) => {
         if (searchField.value === '') results.style.display = 'none';
         else results.style.display = 'block';
      });
   }

   // Close dropdown when clicked outside
   document.addEventListener('click', (e) => {
      const clickedInResluts = e.target.closest('.search-results');
      if (results.style.display === 'block' && !clickedInResluts) {
         results.style.display = 'none';
      }
   });
