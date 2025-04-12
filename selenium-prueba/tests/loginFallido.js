const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

describe('Login fallido', function () {
  this.timeout(15000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');
  });

  after(async function () {
    await driver.quit();
  });

  it('Debe mostrar un mensaje de error con credenciales incorrectas', async function () {
    await driver.findElement(By.name('usuario')).sendKeys('usuarioFalso');
    await driver.findElement(By.name('clave')).sendKeys('7258375', Key.RETURN);

    await driver.sleep(2000);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/loginInvalido.png', screenshot, 'base64');

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    const hayError = bodyText.includes('credenciales') || bodyText.includes('error') || bodyText.toLowerCase().includes('incorrectos');

    assert(hayError, 'No se detecto un mensaje de error.');
  });
});
