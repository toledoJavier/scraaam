import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  body: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment