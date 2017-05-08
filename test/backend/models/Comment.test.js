import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Comment from "../../../src/backend/models/Comment"
import Epic from "../../../src/backend/models/Epic"

describe("Comment model object", () => {
	let parentEpic

	setupMocha()

	beforeEach(async() => {
		const epic = new Epic({
			description: "A description"
		})
		parentEpic = await epic.save()
	})
	
	it("should store all fields", async() => {
		const comment = new Comment({
			body: "A body",
			author: "An author",
			createdAt: new Date(2017, 5, 8),
			epic: parentEpic
		})

		const saved = await comment.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("body").equal("A body")
		saved.should.have.property("author").equal("An author")
		saved.should.have.property("epic").that.has.property("_id").equal(parentEpic._id)

		saved.should.have.property("createdAt")
		saved.createdAt.getTime().should.equal(new Date(2017, 5, 8).getTime())
	})

	it("createdAt should be default if it is not assigned a date", async() => {
		const now = new Date()

		const comment = new Comment({
			body: "A body",
			author: "An author",
			epic: parentEpic
		})

		const saved = await comment.save()
		saved.should.have.property("createdAt")

		saved.createdAt.getYear().should.equal(now.getYear())
		saved.createdAt.getMonth().should.equal(now.getMonth())
		saved.createdAt.getDate().should.equal(now.getDate())
	})
})