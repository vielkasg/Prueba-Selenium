const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');


(async function logout() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');


    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown')), 10000);
    await driver.findElement(By.className('dropdown')).click();

    await driver.findElement(By.className('clip-exit')).click();
    await driver.sleep(3000); 
 

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/LogOut.png', screenshot, 'base64');
    
    console.log("LogOut exitoso!");
  } catch (error) {
    console.error("Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
})();