import { useState } from "react";
import Chapter from "../../components/Chapter";
import Lecture from "../../components/Lecture";

const NewCourse = () => {
    /*To Do*/
    /*
    0. Protéger la route pour admin seulement
    1. Créer dynamiquement les différents chapitre au clic sur un bouton

    2. Button sauvegarde en base
    3. Prévoir bouton mofication
    4. Prévoir un état où la formation n'est pas visible par les utilisateurs (save / publish)
    5. 
    */

    const emptyCourse = {
        // overview: '',
        title: '',
        // category: '',
        // image: '',
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

    console.log('courseData: ', courseData)

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

                {courseData.chapters.map((chapter, chapterIdx) => (

                    <Chapter
                        key={chapterIdx}
                        chapterIdx={chapterIdx}
                        courseData={courseData}
                        updateStateFromChild={updateStateFromChild}
                        onChangeChapter={(e) => onChangeChapter(e, chapterIdx)}
                        addVideo={() => addVideo(chapterIdx)} />
                ))}
                <button className="button-add-chapter" type="button" onClick={addChapter} >Ajouter Chapitre</button>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default NewCourse;