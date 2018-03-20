const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  no: {
      type: String,
      unique: true,
   },
  title: String,
  author: String,
  replyCount: Number,
  viewCount: Number,
  createDate: String,
  homePage: String,
  avatar: String,
  lastReplyer: String,
  lastReplyTime: Date,
  sort: String,
  light: Number,
  pageSize: Number
})

const detailSchema = new Schema({
  no: {
    type: String,
    unique: true
  },
  content: String,
  replies: String
})

const Models = {
  Post: mongoose.model('Post', postSchema),
  Detail: mongoose.model('Detail', detailSchema)
}

mongoose.connect('mongodb://localhost/hupu')

const db = mongoose.connection;
db.on('error', () => {
  console.log('Database connection error')
})
db.once('open', () => {
  console.log('Connect successfully')
})

module.exports = Models
