import "babel-polyfill"
import mongoose from "mongoose"
import mockgoose from "mockgoose"
import Project from "../../src/backend/models/Project"
import Comment from "../../src/backend/models/Comment"
import Epic from "../../src/backend/models/Epic"
import Milestone from "../../src/backend/models/Milestone"
import Task from "../../src/backend/models/Task"

/**
 * @return {Function} a function that when invoked will prepare mockgoose
 *                    mocks
 */
export function setupMocha() {
	before("Mock mongoose", async() => {
		await mockgoose(mongoose)
		mongoose.connect('mongodb://localhost/projects')
	})

	after("Restore mongoose", done => {
  	mongoose.unmock(done);
	})

	afterEach("Reset mock mongo database", done => {
	  mockgoose.reset(done);
	})
}

export async function createMockData() {

		const mockData = {}

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

		return mockData
}