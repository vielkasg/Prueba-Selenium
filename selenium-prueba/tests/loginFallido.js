const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function loginInvalido() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    // Esperar campos
    await driver.wait(until.elementLocated(By.name('email')), 5000);
    await driver.wait(until.elementLocated(By.name('password')), 5000);

    // Ingresar credenciales inválidas
    await driver.findElement(By.name('email')).sendKeys('usuarioFalso');
    await driver.findElement(By.name('password')).sendKeys('7258375', Key.RETURN);

    // Esperar posible mensaje de error
    await driver.sleep(2000);

    // Captura de pantalla del resultado
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/loginInvalido.png', screenshot, 'base64');

    // Buscar mensaje de error
    let bodyText = await driver.findElement(By.tagName('body')).getText();
    if (bodyText.includes('credenciales') || bodyText.includes('error') || bodyText.toLowerCase().includes('incorrecto')) {
      console.log("Mensaje de error detectado correctamente.");
    } else {
      console.warn("No se detectó mensaje de error claro.");
    }

  } catch (error) {
    console.error("Error durante la prueba:", error);
  } finally {
    await driver.quit();
  }
})();
