import { setupMocha, createMockData } from "../setup"

import chai from "chai"
const should = chai.should()

import Project from "../../../src/backend/models/Project"
import Comment from "../../../src/backend/models/Comment"
import Epic from "../../../src/backend/models/Epic"
import Milestone from "../../../src/backend/models/Milestone"
import Task from "../../../src/backend/models/Task"

import request from "supertest"
import app from "../../../src/backend/app.js"

describe("routes", () => {

  setupMocha()

  let mockData = {}

  beforeEach("Add mockdata to mockgoose", async() => {
    mockData = await createMockData()
  })

  describe("Post /epics/:epic/tasks", () => {
    context("When add task in existing epic", () => {
      it("Should return the epic updated", async() => {
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/tasks")
              .send({ description: "task3 description" })
              .expect(200)
        response.body.should.have.property("_id")
        response.body.should.have.property("description", "epic1 description")
        response.body.should.have.property("tasks").with.lengthOf(1)
      })

      it("Should save the task in the database", async() => {
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/tasks")
              .send({ description: "task3 description" })
              .expect(200)
        const found = await Task.findById(response.body.tasks[0]._id)
        should.exist(found)
        found.should.have.property("_id")
        found.should.have.property("description", "task3 description")
      })

      it("Should add the task to the parent epic", async() => {
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/tasks")
              .send({ description: "task3 description" })
              .expect(200)

        const found = await Epic.findById(mockData.epic1._id)
        should.exist(found)

        found.should.have.property("tasks").that.has.lengthOf(1)
      })
    })

    context("When querying an non-existing epic id", () => {
      it("Should return an error", () => {
        return request(app)
              .post("/epics/590761c5c00daf0caa9b881f/tasks" )
              .expect(500)
      })
    })  
  })
})

app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})