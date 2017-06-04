import { setupMocha, createMockData } from "../setup"
import Project from "../../../src/backend/models/Project"
import Milestone from "../../../src/backend/models/Milestone"

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

  describe("Post /proyectos/:proyecto/milestones", () => {
    context("When add milestone in existing project", () => {
      it("Should return the project updated", async() => {
        const response = await request(app)
              .post("/proyectos/" + mockData.project1._id + "/milestones")
              .send({ name: "Milestone3" })
              .expect(200)
        response.body.should.have.property("_id")
        response.body.should.have.property("name", "Project1")
        response.body.should.have.property("milestones").with.lengthOf(2)
      })

      it("Should save the milestone in the database", async() => {
        const response = await request(app)
              .post("/proyectos/" + mockData.project1._id + "/milestones")
              .send({ name: "Milestone3" })
              .expect(200)
        const found = await Milestone.findById(response.body.milestones[1]._id)
        should.exist(found)
        found.should.have.property("_id")
        found.should.have.property("name", "Milestone3")
      })

      it("Should add the milestone to the parent project", async() => {
        const response = await request(app)
              .post("/proyectos/" + mockData.project1._id + "/milestones")
              .send({ name: "Milestone3" })
              .expect(200)

        const found = await Project.findById(mockData.project1._id)
        should.exist(found)

        found.should.have.property("milestones").that.has.lengthOf(2)
      })
    })

    context("When querying an non-existing project id", () => {
      it("Should return an error", () => {
        return request(app)
              .post("/proyectos/590761c5c00daf0caa9b881f/milestones" )
              .expect(500)
      })
    })
  })

  describe("GET /milestones/:milestone", () => {
    context("When querying an existing milestone id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/milestones/" + mockData.milestone2._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name", "Milestone2")
        response.body.should.have.property("epics").with.lengthOf(0)
      })
    })

    context("When querying an non-existing milestone id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/milestones/590761c5c00daf0caa9b881f" )
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