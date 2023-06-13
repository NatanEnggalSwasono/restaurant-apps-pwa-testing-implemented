import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';

class App {
  constructor({
    menuHamburger,
    navList,
    mainElement,
    content,
  }) {
    this._menuHamburger = menuHamburger;
    this._navList = navList;
    this._mainElement = mainElement;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      menuHamburger: this._menuHamburger,
      navList: this._navList,
      mainElement: this._mainElement,
      content: this._content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
