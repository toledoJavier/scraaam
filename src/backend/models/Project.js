import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
})

const Project = mongoose.model('Project', commentSchema)

export default Project