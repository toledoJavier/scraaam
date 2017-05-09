import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Milestone from "../../../src/backend/models/Milestone"
import Project from "../../../src/backend/models/Project"

describe("Project model object", () => {
	let parentProject

	setupMocha()

	beforeEach(async() => {
		const project = new Project({
			name: "A name",
			milestones : []
		})
		parentProject= await project.save()
	})
	
	it("should store all fields", async() => {
		const epic = new Milestone({
			name: "A name",
			epics: [],
			project: parentProject
		})

		const saved = await epic.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("name").equal("A name")
		saved.should.have.property("project").that.has.property("_id").equal(parentProject._id)
        saved.should.have.property("epics").that.has.lengthOf(0) 
	})

})