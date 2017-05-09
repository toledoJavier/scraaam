import { setupMocha } from "../setup"

import chai from "chai"
const should = chai.should()

import Project from "../../../src/backend/models/Project"
import Comment from "../../../src/backend/models/Comment"
import Epic from "../../../src/backend/models/Epic"
import Milestone from "../../../src/backend/models/Milestone"
import Task from "../../../src/backend/models/Task"

import request from "supertest"
import app from "../../../src/backend/app.js"

app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})

describe("routes", () => {

  setupMocha()

  const mockData = {}

  beforeEach("Add mockdata to mockgoose", async() => {
    mockData.project1 = await new Project({ name: "Project1"}).save()
    mockData.project2 = await new Project({ name: "Project2" }).save()

    mockData.milestone1 = await new Milestone({ name: "Milestone1", project: mockData.project1 }).save()
    mockData.milestone2 = await new Milestone({ name: "Milestone2", project: mockData.project2 }).save()

    mockData.epic1 = await new Epic({ description: "epic1 description" }).save()
    mockData.epic2 = await new Epic({ description: "epic2 description" }).save()

    mockData.task1 = await new Task({ description: "task1 description", epic: mockData.epic1 }).save()
    mockData.task2 = await new Task({ description: "task2 description", epic: mockData.epic2 }).save()

    mockData.comment1 = await new Comment({ body: "Comment #1 on Epic #1", author: "An author", epic: mockData.epic1 }).save()
    mockData.comment2 = await new Comment({ body: "Comment #2 on Epic #2", author: "Another author", epic: mockData.epic2 }).save()

    //Mock project 1
    mockData.epic1.comments.push(mockData.comment1)
    mockData.epic1.tasks.push(mockData.task1)
    mockData.milestone1.epics.push(mockData.epic1)
    mockData.project1.milestones.push(mockData.milestone1)

    //Mock project 2
    mockData.epic2.comments.push(mockData.comment2)
    mockData.epic2.tasks.push(mockData.task2)
    mockData.milestone2.epics.push(mockData.epic2)
    mockData.project2.milestones.push(mockData.milestone2)

    mockData.project1 = await mockData.project1.save()
    mockData.project2 = await mockData.project2.save()
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

  ///////////////////////////////
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

//////////////////////////////////////////////////////////////////
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