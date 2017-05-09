import chai from "chai"
import sinon from "sinon"
const should = chai.should()

import { Http } from '@angular/http';
import EpicService from "../../../../src/frontend/app/services/epic.service"

describe("EpicService", () => {

  let service;

  beforeEach(async() => {
    const http = sinon.createStubInstance(Http)

    http.get.withArgs("/epics/590761c5c00daf0caa9b881a").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      description: "Epic #1",
      comments: [],
      tasks: [],
      milestone: "590761c5c00daf0caa9b881m"
    }))

    http.post.withArgs("/epics/590761c5c00daf0caa9b881a/comments").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      description: "Epic #1",
      comments: ["Comment #1"],
      tasks: [],
      milestone: "590761c5c00daf0caa9b881m"
    }))

    http.post.withArgs("/epics/590761c5c00daf0caa9b881a/tasks").callsFake(() => createResponse({
      _id: "590761c5c00daf0caa9b881a",
      description: "Epic #1",
      comments: [],
      tasks: ["Task #1"],
      milestone: "590761c5c00daf0caa9b881m"
    }))

    service = new EpicService(http)

  })

  describe("getEpic(id)", () => {
    it("should return the epic passed by parameter", async() => {
      const epic = await service.getEpic("590761c5c00daf0caa9b881a")

      epic.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      epic.should.have.property("description").equal("Epic #1")
      epic.should.have.property("comments").that.has.lengthOf(0) 
      epic.should.have.property("tasks").that.has.lengthOf(0) 
      epic.should.have.property("milestone").equal("590761c5c00daf0caa9b881m")

    });
  });

  describe("addComment(id, comment)", () => {
    it("should add the epic to the milestone", async() => {
      const epic = await service.addComment("590761c5c00daf0caa9b881a", {})

      epic.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      epic.should.have.property("description").equal("Epic #1")
      epic.should.have.property("comments").that.has.lengthOf(1) 
      epic.comments[0].should.be.equal("Comment #1")
      epic.should.have.property("tasks").that.has.lengthOf(0) 
      epic.should.have.property("milestone").equal("590761c5c00daf0caa9b881m")

    });
  })

  describe("addTask(id, task)", () => {
    it("should add the epic to the milestone", async() => {
      const epic = await service.addTask("590761c5c00daf0caa9b881a", {})

      epic.should.have.property("_id").equal("590761c5c00daf0caa9b881a")
      epic.should.have.property("description").equal("Epic #1")
      epic.should.have.property("comments").that.has.lengthOf(0) 
      epic.should.have.property("tasks").that.has.lengthOf(1)
      epic.tasks[0].should.be.equal("Task #1") 
      epic.should.have.property("milestone").equal("590761c5c00daf0caa9b881m")

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