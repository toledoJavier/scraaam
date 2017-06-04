import { setupMocha, createMockData } from "../setup"
import Project from "../../../src/backend/models/Project"
import Milestone from "../../../src/backend/models/Milestone"
import Epic from "../../../src/backend/models/Epic"
import Comment from "../../../src/backend/models/Comment"

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

  describe("Post /epics/:epic/comments", () => {
    context("When add comment in existing epic", () => {
      it("Should return the epic updated", async() => {
        const now = new Date()
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/comments")
              .send({ body: "A body", author: "Author3", createdAt: now })
              .expect(200)
        response.body.should.have.property("_id")
        response.body.should.have.property("description", "epic1 description")
        response.body.should.have.property("comments").with.lengthOf(1)
      })

      it("Should save the comment in the database", async() => {
        const now = new Date()
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/comments")
              .send({ body: "A body", author: "Author3", createdAt: now })
              .expect(200)
        const found = await Comment.findById(response.body.comments[0]._id)
        should.exist(found)
        found.should.have.property("_id")
        found.should.have.property("body", "A body")
        found.should.have.property("author", "Author3")
        found.createdAt.getYear().should.equal(now.getYear())
        found.createdAt.getMonth().should.equal(now.getMonth())
        found.createdAt.getDate().should.equal(now.getDate())
      })

      it("Should add the comment to the parent epic", async() => {
        const now = new Date()
        const response = await request(app)
              .post("/epics/" + mockData.epic1._id + "/comments")
              .send({ body: "A body", author: "Author3", createdAt: now })
              .expect(200)

        const found = await Epic.findById(mockData.epic1._id)
        should.exist(found)

        found.should.have.property("comments").that.has.lengthOf(1)
      })
    })

    context("When querying an non-existing epic id", () => {
      it("Should return an error", () => {
        return request(app)
              .post("/epics/590761c5c00daf0caa9b881f/comments" )
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
