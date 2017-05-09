import "babel-polyfill"
import mongoose from "mongoose"
import mockgoose from "mockgoose"

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