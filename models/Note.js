const mongoose = require('mongoose');
const slugify = require('slugify');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      video_number: {
        type: String,
      },
      description: {
        type: String
      },
      instructor_name: {
        type: String
      },
      instructor_pfp: {
        type: String
      },
      video_link: {
        type: String,
        required: true
      },
      category:{
        type: String,
        required:true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      previous_les:{
        type: String,
        required: true
      },
      next_les:{
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      }
})

NoteSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
  })

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);