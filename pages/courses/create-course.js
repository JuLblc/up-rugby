import { useState } from "react";
import Video from "../../components/Video";

const NewCourse = () => {
    /*TO DO*/
    /*
    0. Protéger la route pour admin seulement
    1. Créer dynamiquement les différents chapitre au clic sur un bouton

    2. Button sauvegarde en base
    3. Prévoir bouton mofication
    4. Prévoir un état où la formation n'est pas visible par les utilisateurs (save / publish)
    5. 
    */

    const [chapterData, setChapterData] = useState([{
        title: "",
        lectures: [{
            title: '',
            description: '',
            url: '',
        }]
    }])

    const onChange = (e, idx) => {
        const newChapterData = [...chapterData]
        newChapterData[idx][e.target.name] = e.target.value;
        setChapterData(newChapterData)
    }

    const onChangeVideo = (e, chapterIdx, lectureIdx) => {
        const newChapterData = [...chapterData]
        newChapterData[chapterIdx].lectures[lectureIdx][e.target.name] = e.target.value;
        setChapterData(newChapterData)
    }

    const addVideo = (idx) => {

        const newChapterData = [...chapterData]
        newChapterData[idx].lectures.push({
            title: '',
            description: '',
            url: '',
        })
        setChapterData(newChapterData)
    }

    const removeVideo = (chapterIdx, lectureIdx) => {
        console.log('remove')
        const newChapterData = [...chapterData]
        newChapterData[chapterIdx].lectures.splice(lectureIdx, 1)
        setChapterData(newChapterData)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(chapterData));
        //ToDo: send to Database
    }

    return (
        <>
            <h1>Ajouter formation</h1>

            <form onSubmit={handleFormSubmit}>
                {chapterData.map((chapter, chapterIdx) => (
                    <div className="chapter-container" key={chapterIdx}>
                        <label> Titre Chapitre:
                            <input type='text' name='title' value={chapter.title || ""} onChange={e => onChange(e, chapterIdx)} />
                        </label>
                        {chapter.lectures.map((lecture, lectureIdx) => (
                            <>
                                <Video idx={lectureIdx} onChange={(e) => onChangeVideo(e, chapterIdx, lectureIdx)} removeVideo={() => removeVideo(chapterIdx, lectureIdx)} />
                            </>
                        ))}
                        <button className="button-add" type="button" onClick={() => addVideo(chapterIdx)}>Ajouter video</button>
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default NewCourse;