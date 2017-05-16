import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()
dropData()

describe("Create and select a proyect", () => {

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

describe("Create a milestone", () => {

  it("Should add a milestone to a project", async() => {
    browser.get("http://localhost:3001/#/proyectos")

    element(by.css("input[name=title]")).sendKeys("Project 1")
    await element(by.css(".createProjectButton")).click()

    await element(by.css("a[class='dropdown-toggle']")).click()
    await element.all(by.css(".project")).last().click()

    const milestonesFoundAux = await element.all(by.css(".milestone")).count()
    
    await element(by.css("input[name=name]")).sendKeys("NewMilestone")
    await element(by.css(".createMilestoneButton")).click()
    const milestonesFound = await element.all(by.css(".milestone")).count()
    milestonesFound.should.be.equal(milestonesFoundAux + 1)

    const panelEpicsAux = await element(by.css(".panel-epics")).isPresent()
    panelEpicsAux.should.be.equal(false)

    await element(by.css(".milestone")).click()
    const panelEpics = await element(by.css(".panel-epics")).isPresent()
    panelEpics.should.be.equal(true)

  });
})