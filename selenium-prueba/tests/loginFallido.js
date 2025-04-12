const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function loginInvalido() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://municipia.ayuntamiento.tech/cloud/login');

    // Ingresar credenciales inválidas
    await driver.findElement(By.name('usuario')).sendKeys('usuarioFalso');
    await driver.findElement(By.name('clave')).sendKeys('7258375', Key.RETURN);

    // Esperar posible mensaje de error
    await driver.sleep(2000);

    // Captura de pantalla del resultado
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('selenium-prueba/screenshots/loginInvalido.png', screenshot, 'base64');

    // Buscar mensaje de error
    let bodyText = await driver.findElement(By.tagName('body')).getText();
    if (bodyText.includes('credenciales') || bodyText.includes('error') || bodyText.toLowerCase().includes('incorrectos')) {
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
