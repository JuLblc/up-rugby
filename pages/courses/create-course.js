import { useState } from "react";
import Chapter from "../../components/Chapter";
import Lecture from "../../components/Lecture";

const NewCourse = () => {
    /*To Do*/
    /*
    0. Protéger la route pour admin seulement
    */

    const emptyCourse = {
        
        title: '',
        overview: '',
        category: '',
        //image: '',
        chapters: [
            {
                title: "",
                lectures: [{
                    title: '',
                    description: '',
                    url: '',
                }],
            }
        ],
    }

    const [courseData, SetCourseData] = useState(emptyCourse)

    const onChange = (e) => {
        SetCourseData({ ...courseData, [e.target.name]: e.target.value })
    }

    const updateStateFromChild = (newCourseData) => {
        SetCourseData(newCourseData)
    }

    const onChangeChapter = (e, idx) => {

        const newCourseData = { ...courseData };
        newCourseData.chapters[idx][e.target.name] = e.target.value;
        SetCourseData(newCourseData);
    }

    const addChapter = () => {
        console.log('addChapter')
        const newCourseData = { ...courseData };
        newCourseData.chapters.push({
            title: "",
            lectures: [{
                title: '',
                description: '',
                url: '',
            }],
        })
        SetCourseData(newCourseData);
    }
    const removeChapter = (idx) => {

        const newCourseData = { ...courseData };
        newCourseData.chapters.splice(idx, 1)
        SetCourseData(newCourseData);
    }

    const addVideo = (idx) => {

        const newCourseData = { ...courseData };
        newCourseData.chapters[idx].lectures.push({
            title: '',
            description: '',
            url: '',
        })
        SetCourseData(newCourseData);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(courseData));
        //ToDo: send to Database
    }

    return (
        <>
            <h1>Ajouter formation</h1>

            <form onSubmit={handleFormSubmit}>
                <label> Titre Formation:
                    <input type='text' name='title' value={courseData.title} onChange={onChange} />
                </label>

                <label> Catégorie:
                    <input type='text' name='category' value={courseData.category} onChange={onChange} />
                </label>

                <label> Présentation:
                    <input type='text' name='overview' value={courseData.overview} onChange={onChange} />
                </label>

                <label> Prix:
                    <input type='text' name='price' value={courseData.price} onChange={onChange} />
                </label>                   

                {courseData.chapters.map((chapter, chapterIdx) => (

                    <Chapter
                        key={chapterIdx}
                        chapterIdx={chapterIdx}
                        courseData={courseData}
                        updateStateFromChild={updateStateFromChild}
                        onChangeChapter={(e) => onChangeChapter(e, chapterIdx)}
                        removeChapter={() => removeChapter(chapterIdx)}
                        addVideo={() => addVideo(chapterIdx)} />
                ))}
                <button className="button-add-chapter" type="button" onClick={addChapter} >Ajouter Chapitre</button>

                <button type="submit">Submit</button>
                {/**
                 * 1. Bouton save -> Enregistre en base avec status isPublished = false
                 *    Champs ne sont plus modifiables
                 *    Save isHidden / Modifier apparait
                 *    Redirection sur la page update course
                 *            
                 * 2. Publier -> isPublished = true
                 *    Redirection vers la page all formation    
                 *  
                 * 
                 * 
                 */}
                
            </form>
        </>
    );
}

export default NewCourse;