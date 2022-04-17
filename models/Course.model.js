import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    overview: String,
    title: String,
    description:String,
    seoUrl:String,
    category: String,
    price:Number,
    img: {
        fileName: String,
        url: String,
        width:Number,
        height:Number
    },
    chapters: [
        {
            title: String,
            seoUrl:String,
            lectures: [
                {
                    title: String,
                    seoUrl:String,
                    description: String,
                    url: String,
                    duration: Number,
                    comments:[
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: 'Comment'
                        }
                      ]
                }
            ]
        }
    ],
    isPublished: {
        type: Boolean,
        default: false
    },
    attachements:[{
        fileName: String,
        url: String
    }]
})

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema)