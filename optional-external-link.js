  // Global. Reuse for dynamic content
  /*
  Create link, set link to external, set attribute to external-resource="link"
  set normal link to wrap/button, set attribute to external-resource="wrap", text content is link type = Link || anything else, hide it
  */
  const updateResourceLinks = () => {
    document.querySelectorAll('[external-resource="wrap"]').forEach((wrap) => {
      const link = wrap.parentElement.querySelector('[external-resource="link"]');
      if (!link || link.innerText !== 'Link' || !link.href) return;
      wrap.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link.href, '_blank');
      });
    });
  };
  // Change the resource link if it's external and open it in a new tab
  window.addEventListener('load', updateResourceLinks);
