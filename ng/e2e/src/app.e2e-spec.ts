import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App', () => {
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

  it('should navigate to correct routes on nonmobile navbar clicks', () => {
    browser.manage().window().setSize(900, 700);
    page.navigateTo('');
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/about$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/experience$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/projects$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/about$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/experience$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-contents-left mat-nav-list a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/projects$/);
  });

  it('should navigate to correct routes on mobile navbar clicks', () => {
    browser.manage().window().setSize(500, 700);
    page.navigateTo('');
    page.clickByCss('#app-mobile-navbar a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/about$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/experience$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/projects$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/about$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(1)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/experience$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(2)');
    expect(browser.getCurrentUrl()).toMatch(/\/home$/);
    page.clickByCss('#app-mobile-navbar a:nth-child(3)');
    expect(browser.getCurrentUrl()).toMatch(/\/projects$/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('App Footer', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should open correct urls on footer button clicks', () => {
    browser.manage().window().setSize(900, 700);
    const expectedData = [
      {
        'url': 'https://github.com/park-junha',
        'child': 1
      },
      {
        //  Check base URL only to account for unauthenticated users
        //  TODO: Write a test for authenticated user?
        'url': 'https://www.linkedin.com',
        'child': 2
      },
      {
        'url': 'https://junha-park.s3-us-west-1.amazonaws.com/Resume.pdf',
        'child': 3
      },
      {
        'url': 'https://github.com/park-junha/PersonalWebsite',
        'child': 5
      }
    ];
    page.navigateTo('');
    expectedData.map(item => {
      page.clickByCss(`app-footer mat-toolbar a:nth-child(${item.child})`);
      browser.getAllWindowHandles().then(handles => {
        let newWindowHandle = handles[1];
        browser.switchTo().window(newWindowHandle).then(() => {
          expect(browser.driver.getCurrentUrl())
            .toContain(item.url);
          browser.driver.close().then(() => {
            browser.switchTo().window(handles[0]);
          });
        });
      });
    });
  });

});
