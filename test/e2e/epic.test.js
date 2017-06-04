import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("Create an epic and add a comment", () => {

  dropData()

  beforeEach(() => {
    browser.get("http://localhost:3001/#/proyectos")    
    element(by.css("input[name=title]")).sendKeys("Project 1")
  });

  it("Should add an epic to milestone", async() => {
    await element(by.css(".createProjectButton")).click()

    await element(by.css("a[class='dropdown-toggle']")).click()
    await element.all(by.css(".project")).last().click()
    
    await element(by.css("input[name=name]")).sendKeys("NewMilestone")
    await element(by.css(".createMilestoneButton")).click()

    await element(by.css(".milestone")).click()

    const epicsFoundedOriginal = await element.all(by.css(".epic")).count()

    await element(by.css("input[name=description]")).sendKeys("New Epic")
    await element(by.css(".createEpicButton")).click()

    const epicsFounded = await element.all(by.css(".epic")).count()

    epicsFounded.should.be.equal(epicsFoundedOriginal + 1)

  });

  it("Should add a comment to an epic", async() => {
    await element(by.css(".createProjectButton")).click()

    await element(by.css("a[class='dropdown-toggle']")).click()
    await element.all(by.css(".project")).last().click()
    
    await element(by.css("input[name=name]")).sendKeys("NewMilestone")
    await element(by.css(".createMilestoneButton")).click()

    await element(by.css(".milestone")).click()


    await element(by.css("input[name=description]")).sendKeys("New Epic")
    await element(by.css(".createEpicButton")).click()

    await element.all(by.css(".epic")).last().click()

    const commentsFoundedOriginal = await element.all(by.css(".myList")).count()

    await element(by.css("input[name=comment]")).sendKeys("New comment")

    await element(by.css(".createCommentButton")).click()

    const commentsFounded = await element.all(by.css(".myList")).count()

    commentsFounded.should.be.equal(commentsFoundedOriginal + 1)

  });
})