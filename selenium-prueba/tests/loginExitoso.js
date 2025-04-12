const { Builder, By, Key } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

describe('Login Exitoso', function () {
  this.timeout(30000); // tiempo extra para evitar errores de timeout

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('iniciar sesion exitosamente', async () => {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    const screenshot1 = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/login.png', screenshot1, 'base64');

    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.sleep(3000);

    const screenshot2 = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/loginValido.png', screenshot2, 'base64');

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert.ok(bodyText.toLowerCase().includes('vsanchez') || bodyText.toLowerCase().includes('inicio'), 'Error en el Login.');
  });
});

