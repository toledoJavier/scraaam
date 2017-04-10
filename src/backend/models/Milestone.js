import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  epics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
})

const Milestone = mongoose.model('Milestone', commentSchema)

export default Milestone