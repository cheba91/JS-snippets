   // populate links for social media share
   const icons = document.querySelectorAll('.shareicon');
   const currentUrl = window.location.href;
   icons &&
      icons.forEach((icon) => {
         //LinkedIn
         if (icon.classList.contains('sharelinkedin')) {
            icon.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
         }
         //Twitter
         if (icon.classList.contains('sharetwitter')) {
            icon.setAttribute('data-size', 'large');
            icon.href = `https://twitter.com/intent/tweet?text=<TEXT>`;
         }
         //Facebook
         if (icon.classList.contains('sharefacebook')) {
            icon.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
         }
      });
