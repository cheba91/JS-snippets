  const openMenu = (el) => {
    el.querySelector('.w-dropdown-list').classList.add('w--open');
    el.querySelector('.w-dropdown-toggle').classList.add('w--open');
    el.querySelector('.w-dropdown-toggle').setAttribute('aria-expanded', 'true');
  };
  const closeMenu = (el) => {
    el.querySelector('.w-dropdown-list').classList.remove('w--open');
    el.querySelector('.w-dropdown-toggle').classList.remove('w--open');
    el.querySelector('.w-dropdown-toggle').setAttribute('aria-expanded', 'false');
  };
  let menuTimeout = [];
  let menuDelay = 500;
  const menuItems = document.querySelectorAll('nav .w-dropdown');
  menuItems.forEach((menuItem) =>
    menuItem.addEventListener('mouseover', () => {
      const elId = menuItem.querySelector('.w-dropdown-toggle').getAttribute('id');
      if (menuTimeout[elId]) clearTimeout(menuTimeout[elId]);
      menuTimeout[elId] = setTimeout(() => openMenu(menuItem), menuDelay);
    })
  );
  menuItems.forEach((menuItem) =>
    menuItem.addEventListener('mouseout', () => {
      const elId = menuItem.querySelector('.w-dropdown-toggle').getAttribute('id');
      if (menuTimeout[elId]) clearTimeout(menuTimeout[elId]);
      menuTimeout[elId] = setTimeout(() => closeMenu(menuItem), menuDelay);
    })
  );
