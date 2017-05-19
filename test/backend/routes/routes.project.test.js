import { setupMocha, createMockData } from "../setup"
import Project from "../../../src/backend/models/Project"

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

  describe("GET /proyectos", () => {
    it("Should return the two existing project", async() => {
      const response = await request(app)
            .get("/proyectos")
            .expect(200)
      response.body.should.have.lengthOf(2)
    })
  })

  describe("GET /proyectos/:proyecto", () => {
    context("When querying an existing project id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/proyectos/" + mockData.project1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name", "Project1")
        response.body.should.have.property("milestones").with.lengthOf(1)
      })
    })

    context("When querying an non-existing project id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/proyectos/590761c5c00daf0caa9b881f" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /proyectos", () => {

    it("Should return the object of the newly created project", async() => {
      const response = await request(app)
            .post("/proyectos")
            .send({ name: "Project3" })
            .expect(200)
      response.body.should.be.a('object')
    })

    it("Should save the project in the database", async() => {
      const response = await request(app)
            .post("/proyectos")
            .send({ name: "Project3" })
            .expect(200)

      const found = await Project.findById(response.body)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("name", "Project3")
      found.should.have.property("milestones").with.lengthOf(0)
    })

    it("Newer project should be returned on /GET proyectos", async() => {
      const response = await request(app)
            .post("/proyectos")
            .send({ name: "Project3" })
            .expect(200)

      const response2 = await request(app)
            .get("/proyectos")
            .expect(200)

      response2.body.should.have.lengthOf(3)
    })
  })
})

app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})