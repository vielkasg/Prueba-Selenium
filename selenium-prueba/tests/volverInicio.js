const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

describe('Volver al inicio desde el perfil', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');
  });

  after(async function () {
    await driver.quit();
  });

  it('Debe volver al inicio correctamente', async function () {
    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown')), 10000);
    await driver.findElement(By.className('dropdown')).click();

    const perfilLink = await driver.wait(until.elementLocated(By.css('a[href*="/perfil"]')), 5000);
    await driver.wait(until.elementIsVisible(perfilLink), 5000);
    await perfilLink.click();

    await driver.wait(until.urlContains('/perfil'), 5000);

    await driver.findElement(By.xpath("//*[contains(text(), 'Inicio')]")).click();
    await driver.sleep(3000);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/volverInicio.png', screenshot, 'base64');

    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('inicio'), 'No se pudo volver correctamente al inicio');
  });
});
