const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function perfilUsuario() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    // Login
    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown current-user')), 10000);

    await driver.findElement(By.className('dropdown current-user')).click();

    const perfilLink = await driver.wait(until.elementLocated(By.css('a[href*="/perfil"]')),5000);
  
      //Esperar a que se vea
      await driver.wait(until.elementIsVisible(perfilLink), 5000);
      await driver.wait(until.elementIsEnabled(perfilLink), 5000);
  
      await perfilLink.click();

    await driver.wait(until.urlContains('/perfil'), 5000);

    // Tomar captura
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/perfilUsuario.png', screenshot, 'base64');

    console.log("Acceso a 'Mi Perfil' exitoso.");

  } catch (error) {
    console.error("Error en la prueba de perfil:", error);
  } finally {
    await driver.quit();
  }
})();
