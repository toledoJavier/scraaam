import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { By } from "@angular/platform-browser"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"

import NavbarComponent from "../../../../src/frontend/app/components/navbar.component"

import ProjectService from "../../../../src/frontend/app/services/project.service"

describe("NavbarComponent", () => {

  let fixture;

  beforeEach(() => {
    const projectServiceMock = {
      projects: [{
        "_id": "id1",
        "name": "Projecto1",
        "milestones": []
      }, {
        "_id": "id2",
        "name": "Projecto2",
        "milestones": []
      }]
    }

    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [RouterTestingModule],
      providers: [{
        provide: ProjectService,
        useValue: projectServiceMock
      }]
    });

    fixture = TestBed.createComponent(NavbarComponent);
  })

  it("the dropdown should have two projects", () => {
    fixture.detectChanges();

    const projectElements = fixture.debugElement.queryAll(By.css(".project"))
    projectElements.should.have.lengthOf(2)
  })

 it("when new element is added to the service it should be rendered", () => {
    const projectServiceQueEstaUsandoAngular = TestBed.get(ProjectService)
    projectServiceQueEstaUsandoAngular.projects.push({
      "_id": "id3",
        "name": "Projecto3",
        "milestones": []
    })
    fixture.detectChanges();

    const projectElements = fixture.debugElement.queryAll(By.css(".project"))
    projectElements.should.have.lengthOf(3)
  })

  xit("when user click on any project it should navigate", () => {
    const router = TestBed.get(Router)
    sinon.stub(router, "navigateByUrl")

    fixture.detectChanges();

    const projectElements = fixture.debugElement.queryAll(By.css(".project"))
    projectElements[0].triggerEventHandler("click", { button: 0 })

    router.navigateByUrl.should.have.been.called.once
  })

  afterEach(() => {
    const router = TestBed.get(Router)
    router.navigateByUrl.restore && router.navigateByUrl.restore()
  });

})