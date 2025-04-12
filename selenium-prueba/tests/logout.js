const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

describe('Logout de la plataforma', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');
  });

  after(async function () {
    await driver.quit();
  });

  it('Debe cerrar sesion correctamente', async function () {
    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown')), 10000);
    await driver.findElement(By.className('dropdown')).click();

    await driver.findElement(By.className('clip-exit')).click();
    await driver.sleep(3000);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/logout.png', screenshot, 'base64');

    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('login'), 'No volvio al login despues del logout');
  });
});
