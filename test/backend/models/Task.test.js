import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Task from "../../../src/backend/models/Task"
import Epic from "../../../src/backend/models/Epic"

describe("Task model object", () => {
	let parentEpic

	setupMocha()

	beforeEach(async() => {
		const epic = new Epic({
			description: "A description"
		})
		parentEpic = await epic.save()
	})
	
	it("should store all fields", async() => {
		const task = new Task({
			description: "A task",
			epic: parentEpic
		})

		const saved = await task.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("description").equal("A task")
		saved.should.have.property("epic").that.has.property("_id").equal(parentEpic._id)

	})

})