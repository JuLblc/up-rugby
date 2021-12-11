import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    allowedUsers: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    title: String,
    category:String,
    image:String,
    overview:String,
    chapter:[
        {
            title: String,
            subtitle: String,
            lectures:[
                {
                    title: String,
                    description:String,
                    video:String,
                }
            ]
        }
    ],
    reviews:[Number],
    // comments:
})

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema)