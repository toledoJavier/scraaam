import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("Create and select a proyect", () => {

  dropData()

  it("Should add a proyect to the proyect's list", async() => {
    browser.get("http://localhost:3001/#/proyectos")

    const originalCount = await element.all(by.css(".project")).count()

    await browser.takeScreenshot()

    element(by.css("input[name=title]")).sendKeys("A new project")
    await element(by.css(".createProjectButton")).click()

    const newCount = await element.all(by.css(".project")).count()
    newCount.should.be.equal(originalCount + 1)
  
  });


  it("Should change the selected project", async() => {
    browser.get("http://localhost:3001/#/proyectos")

    element(by.css("input[name=title]")).sendKeys("Project 1")
    await element(by.css(".createProjectButton")).click()

    element(by.css("input[name=title]")).sendKeys("Project 2")
    await element(by.css(".createProjectButton")).click()

    await element(by.css("a[class='dropdown-toggle']")).click()

    await element.all(by.css(".project")).last().click()

    const selectedProject = await element(by.css(".selectedSpan")).getText()

    selectedProject.should.contain("Project 2")

  });



})