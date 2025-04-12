const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

describe('Prueba de Perfil de Usuario', function () {
  this.timeout(30000); // aumenta el timeout

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe acceder a mi perfil', async () => {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown-toggle')), 10000);
    await driver.findElement(By.className('dropdown-toggle')).click();

    await driver.wait(until.elementLocated(By.className('clip-user-2')), 10000);
    await driver.findElement(By.className('clip-user-2')).click();

    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Nombre')]")), 5000);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshots/perfilUsuario.png', screenshot, 'base64');

    assert.ok(true, "La prueba se completo correctamente");
  });
});