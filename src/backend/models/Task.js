import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  description: String,
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
})

const Task = mongoose.model('Task', commentSchema)

export default Task