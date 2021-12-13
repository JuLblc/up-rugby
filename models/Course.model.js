import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    allowedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    overview: String,
    title: String,
    category: String,
    image: String,
    chapters: [
        {
            title: String,
            lectures: [
                {
                    title: String,
                    description: String,
                    url: String,
                }
            ]
        }
    ],
    reviews: [Number],
    // comments:
    isPublished: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema)