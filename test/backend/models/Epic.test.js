import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Epic from "../../../src/backend/models/Epic"
import Project from "../../../src/backend/models/Project"
import Milestone from "../../../src/backend/models/Milestone"

describe("Epic model object", () => {
	let parentMilestone
	let parentProject

	setupMocha()

	beforeEach(async() => {
		const project = new Project({
			name: "A name",
			milestones : []
		})
		parentProject= await project.save()

		const milestone = new Milestone({
			name: "A name",
			epics: [],
			project: parentProject
		})
		parentMilestone = await milestone.save()
	})
	
	it("should store all fields", async() => {
		const epic = new Epic({
			description: "A description",
			comments: [],
			tasks: [],
			milestone: parentMilestone
		})

		const saved = await epic.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("description").equal("A description")
		saved.should.have.property("milestone").that.has.property("_id").equal(parentMilestone._id)
        saved.should.have.property("comments").that.has.lengthOf(0) 
		saved.should.have.property("tasks").that.has.lengthOf(0)
	})

})