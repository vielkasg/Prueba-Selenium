const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');


(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    const screenshot1 = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/login.png', screenshot1, 'base64');

    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.sleep(3000); 

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/loginValido.png', screenshot, 'base64');
    
    console.log("Login exitoso!");
  } catch (err) {
    console.error("Error en la prueba:", err);
  } finally {
    await driver.quit();
  }
})();
