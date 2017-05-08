import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }
})

const Epic = mongoose.model('Epic', commentSchema)

export default Epic