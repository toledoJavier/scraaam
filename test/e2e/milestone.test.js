import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("Create a milestone", () => {

  dropData()

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