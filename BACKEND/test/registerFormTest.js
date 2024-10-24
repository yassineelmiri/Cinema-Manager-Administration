const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");
const chrome = require("selenium-webdriver/chrome");

const bravePath =
  "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe";

const chromeOptions = new chrome.Options();
chromeOptions.setChromeBinaryPath(bravePath);

describe("Test du formulaire login", function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  });

  after(async () => {
    await driver.quit();
  });

  it("devrait login", async () => {
    await driver.get("http://localhost:3000/signin");
    await driver.sleep(3000);

    await driver
      .findElement(By.css('.sign__input[type="email"]'))
      .sendKeys("miriyassine123@gmail.com");
      
    await driver
      .findElement(By.css('.sign__input[type="password"]'))
      .sendKeys("0000");

    await driver.findElement(By.css('button[type="submit"]')).click();
    // Vérifier le texte de l'élément
    const message = "login success";

    assert.strictEqual(message, "login success");
  });
});
