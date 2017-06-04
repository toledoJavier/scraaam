import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Project from "../../../src/backend/models/Project"

describe("Project model object", () => {

	setupMocha()
	
	it("should store all fields", async() => {
		const project = new Project({
			name: "A name",
			milestones: []
		})

		const saved = await project.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("name").equal("A name")
        saved.should.have.property("milestones").that.has.lengthOf(0) 
	})

})