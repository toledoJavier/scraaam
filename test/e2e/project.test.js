import "babel-polyfill"

import chai from "chai"
chai.should()

describe("Dashboard landing", () => {

  it("Should something", async() => {
    browser.get("http://localhost:3001/#/proyectos")

    const title = await browser.getTitle()
    title.should.be.equal("Scraaam")

   // const cantidadOriginal = await element.all(by.css("postlist post")).count()

  //  await browser.takeScreenshot()

  //  element(by.css("newpost input[name=title]")).sendKeys("Noticia extra extra!")
  //  element(by.css("newpost textarea[name=content]")).sendKeys("Este es el cuerpo de la noticia")
  //  await element(by.css("newpost button")).click()

  //  const cantidad = await element.all(by.css("postlist post")).count()
  // cantidad.should.be.equal(cantidadOriginal + 1)
  });

})