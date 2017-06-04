import chai from "chai"
import sinon from "sinon"
const should = chai.should()

import { Http } from '@angular/http';
import ProjectService from "../../../../src/frontend/app/services/project.service"

describe("ProjectService", () => {

  let service;

  beforeEach(async() => {
    const http = sinon.createStubInstance(Http)

    http.get.withArgs("/proyectos").callsFake(() => createResponse([{
      _id: "590761c5c00daf0caa9b881a",
      name: "Project #1",
      milestones: []
    }, {
      _id: "590761c5c00daf0caa9b881b",
       name: "Project #2",
       milestones: []
    }]));

    http.get.withArgs("/proyectos/590761c5c00daf0caa9b881a").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      name: "Project #1",
      milestones: []
    }))

    http.post.withArgs("/proyectos/590761c5c00daf0caa9b881a/milestones").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      name: "Project #1",
      milestones: ["5910d4bbd8d34a1f1152a867"]
    }))

    service = new ProjectService(http)
    await http.get("/proyectos").toPromise() //forces to wait for http service to resolve

  })

  describe("projects", () => {
    it("should return the projects fetched from server", () => {
      service.projects.should.have.lengthOf(2)
      service.projects[0].should.have.property("_id").that.equal("590761c5c00daf0caa9b881a")
      service.projects[1].should.have.property("_id").that.equal("590761c5c00daf0caa9b881b")

      service.projects[0].should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      service.projects[0].should.have.property("name").equal("Project #1")
      service.projects[0].should.have.property("milestones").that.has.lengthOf(0) 
    });
  });

  describe("getProject(id)", () => {
    it("should return the project passed by parameter", async() => {
      const project = await service.getProject("590761c5c00daf0caa9b881a")

      project.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      project.should.have.property("name").equal("Project #1")
      project.should.have.property("milestones").that.has.lengthOf(0) 

    });
  });

  describe("addMilestone(id, milestone)", () => {
    it("should add the milestone to the project", async() => {
      const project = await service.addMilestone("590761c5c00daf0caa9b881a", {})

      project.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      project.should.have.property("name").equal("Project #1")
      project.should.have.property("milestones").that.has.lengthOf(1) 
      project.milestones[0].should.be.equal("5910d4bbd8d34a1f1152a867")

    });
  })

})

function createResponse(data) {
  return {
    toPromise() {
      return Promise.resolve({
        json() {
          return data;
        }
      })
    }
  }
}