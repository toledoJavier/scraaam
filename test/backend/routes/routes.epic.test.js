import { setupMocha, createMockData } from "../setup"
import Project from "../../../src/backend/models/Project"
import Milestone from "../../../src/backend/models/Milestone"
import Epic from "../../../src/backend/models/Epic"

import chai from "chai"
const should = chai.should()

import request from "supertest"
import app from "../../../src/backend/app.js"

describe("routes", () => {

  setupMocha()

  let mockData = {}

  beforeEach("Add mockdata to mockgoose", async() => {
    mockData = await createMockData()
  })

  describe("Post /milestones/:milestone/epic", () => {
    context("When add epic in existing milestone", () => {
      it("Should return the milestone updated", async() => {
        const response = await request(app)
              .post("/milestones/" + mockData.milestone1._id + "/epics")
              .send({ description: "Epic3 description" })
              .expect(200)
        response.body.should.have.property("_id")
        response.body.should.have.property("name", "Milestone1")
        response.body.should.have.property("epics").with.lengthOf(1)
      })

      it("Should save the epic in the database", async() => {
        const response = await request(app)
              .post("/milestones/" + mockData.milestone1._id + "/epics")
              .send({ description: "Epic3 description" })
              .expect(200)
        const found = await Epic.findById(response.body.epics[0]._id)
        should.exist(found)
        found.should.have.property("_id")
        found.should.have.property("description", "Epic3 description")
        found.should.have.property("tasks").with.lengthOf(0)
      })

      it("Should add the epic to the parent milestone", async() => {
        const response = await request(app)
              .post("/milestones/" + mockData.milestone1._id + "/epics")
              .send({ description: "Epic3 description" })
              .expect(200)

        const found = await Milestone.findById(mockData.milestone1._id)
        should.exist(found)

        found.should.have.property("epics").that.has.lengthOf(1)
      })
    })

    context("When querying an non-existing milestone id", () => {
      it("Should return an error", () => {
        return request(app)
              .post("/milestones/590761c5c00daf0caa9b881f/epics" )
              .expect(500)
      })
    })
  })

  describe("GET /epics/:epic", () => {
    context("When querying an existing epic id", () => {
      it("Should return the existing epic", async() => {
        const response = await request(app)
              .get("/epics/" + mockData.epic1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("description", "epic1 description")
        response.body.should.have.property("comments").with.lengthOf(0)
        response.body.should.have.property("tasks").with.lengthOf(0)
      })
    })

    context("When querying an non-existing epic id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/epics/590761c5c00daf0caa9b881f" )
              .expect(500) //should be 404
      })
    })
  })
})

app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})