const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');


(async function volverInicio() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    await driver.findElement(By.name('usuario')).sendKeys('vsanchez');
    await driver.findElement(By.name('clave')).sendKeys('VSG0515', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('dropdown')), 10000);

    await driver.findElement(By.className('dropdown')).click();

    const perfilLink = await driver.wait(until.elementLocated(By.css('a[href*="/perfil"]')),5000);
  
      //Esperar a que se vea
      await driver.wait(until.elementIsVisible(perfilLink), 5000);
      await driver.wait(until.elementIsEnabled(perfilLink), 5000);
  
      await perfilLink.click();

    await driver.wait(until.urlContains('/perfil'), 5000);
    await driver.sleep(1000); 

    await driver.findElement(By.xpath("//*[contains(text(), 'Inicio')]")).click();
    await driver.sleep(3000); 

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/Inicio.png', screenshot, 'base64');
    
    console.log("Vuelta al inicio exitosa!");
  } catch (error) {
    console.error("Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
})();
