import chai from "chai"
import sinon from "sinon"
const should = chai.should()

import { Http } from '@angular/http';
import MilestoneService from "../../../../src/frontend/app/services/milestone.service"

describe("MilestoneService", () => {

  let service;

  beforeEach(async() => {
    const http = sinon.createStubInstance(Http)

    http.get.withArgs("/milestones/590761c5c00daf0caa9b881a").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      name: "Milestone #1",
      epics: [],
      project: "590761c5c00daf0caa9b881p"
    }))

    http.post.withArgs("/milestones/590761c5c00daf0caa9b881a/epics").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      name: "Milestone #1",
      epics: ["5910d4bbd8d34a1f1152a867"],
      project: "590761c5c00daf0caa9b881p"
    }))

    service = new MilestoneService(http)

  })

  describe("getMilestone(id)", () => {
    it("should return the milestone passed by parameter", async() => {
      const milestone = await service.getMilestone("590761c5c00daf0caa9b881a")

      milestone.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      milestone.should.have.property("name").equal("Milestone #1")
      milestone.should.have.property("project").equal("590761c5c00daf0caa9b881p")
      milestone.should.have.property("epics").that.has.lengthOf(0) 

    });
  });

  describe("addEpic(id, epic)", () => {
    it("should add the epic to the milestone", async() => {
      const milestone = await service.addEpic("590761c5c00daf0caa9b881a", {})

      milestone.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      milestone.should.have.property("name").equal("Milestone #1")
      milestone.should.have.property("project").equal("590761c5c00daf0caa9b881p")
      milestone.should.have.property("epics").that.has.lengthOf(1) 
      milestone.epics[0].should.be.equal("5910d4bbd8d34a1f1152a867")

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