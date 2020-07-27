import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(route: string): Promise<unknown> {
    return browser.get(browser.baseUrl + route) as Promise<unknown>;
  }

  getTextByCss(cssToQuery: string): Promise<string> {
    return element(by.css(cssToQuery))
      .getText() as Promise<string>;
  }

}
