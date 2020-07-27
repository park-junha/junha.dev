import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message on index route', () => {
    page.navigateTo('');
    expect(page.getTextByCss('app-landing h1')).toEqual('Welcome');
  });

  it('should display nothing on home route', () => {
    page.navigateTo('home');
    expect(page.getTextByCss('app-home')).toEqual('');
  });

  it('should display 404 on wildcard route', () => {
    page.navigateTo('xd');
    expect(page.getTextByCss('app-notfound h1')).toEqual('404');
    expect(page.getTextByCss('app-notfound h3'))
      .toEqual('Oops. Something went wrong.');
  });

  it('should display about page on about route', () => {
    page.navigateTo('about');
    expect(page.getTextByCss('app-about mat-card mat-card-content h1'))
      .toEqual('Hi. My name is Junha Park.');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
