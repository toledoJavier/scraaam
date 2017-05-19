import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("Create and delete a task", () => {

  dropData()

  beforeEach(() => {
    browser.get("http://localhost:3001/#/proyectos")    
    element(by.css("input[name=title]")).sendKeys("Project 1")
  });

  it("Should add a task to an epic", async() => {
    await element(by.css(".createProjectButton")).click()

    await element(by.css("a[class='dropdown-toggle']")).click()
    await element.all(by.css(".project")).last().click()
    
    await element(by.css("input[name=name]")).sendKeys("NewMilestone")
    await element(by.css(".createMilestoneButton")).click()

    await element(by.css(".milestone")).click()

    await element(by.css("input[name=description]")).sendKeys("New Epic")
    await element(by.css(".createEpicButton")).click()

    await element.all(by.css(".epic")).last().click()

    const taskFoundedOriginal = await element.all(by.css(".myList")).count()

    await element(by.css("input[name=description]")).sendKeys("New task")

    await element(by.css(".createTaskButton")).click()

    const taskFounded = await element.all(by.css(".myList")).count()

    taskFounded.should.be.equal(taskFoundedOriginal + 1)
  });
})