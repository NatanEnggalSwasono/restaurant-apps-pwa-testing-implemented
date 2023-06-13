const DrawerInitiator = {
  init({
    menuHamburger, navList, mainElement, content,
  }) {
    menuHamburger.addEventListener('click', (event) => {
      this._toggleDrawer(event, navList);
    });

    mainElement.addEventListener('click', (event) => {
      this._closeDrawer(event, navList);
    });

    content.addEventListener('click', (event) => {
      this._enterDrawer(event, navList);
    });
  },

  _toggleDrawer(event, navList) {
    event.stopPropagation();
    navList.classList.toggle('open');
  },

  _closeDrawer(event, navList) {
    event.stopPropagation();
    navList.classList.remove('open');
  },

  _enterDrawer(event, navList) {
    event.stopPropagation();
    navList.classList.remove('open');
  },
};

export default DrawerInitiator;
