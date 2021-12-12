import { useState } from "react"

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

    const [videoData, setVideoData] = useState([{
        title: "",
        description: "",
        url: ""
    }]);

    // const handleCourseFormSubmit = (e) => {

    // }

    const onChange = (e, idx) => {
        const newVideoData = [...videoData];
        newVideoData[idx][e.target.name] = e.target.value;
        setVideoData(newVideoData);
    }

    const addVideo = (e) => {
        setVideoData([
            ...videoData,
            { title: "", description: "", url: "" }
        ])
    }

    const removeVideo = (e, idx) => {
        const newVideoData = [...videoData];
        newVideoData.splice(idx, 1)
        setVideoData(newVideoData);
    }

    return (
        <>
            <h1>Ajouter formation</h1>

            {/** Vidéo */}
            {videoData.map((video, idx) => (
                <div className="video-container" key={idx}>
                    <label> Titre vidéo:
                        <input type='text' name='title' value={video.title || ""} onChange={e => onChange(e, idx)} />
                    </label>

                    <label> Description:
                        <input type='text' name='description' value={video.description || ""} onChange={e => onChange(e, idx)} />
                    </label>

                    <label> Video Url:
                        <input type='text' name='url' value={video.url || ""} onChange={e => onChange(e, idx)} />
                    </label>

                    <button className="button-supp" type="button" onClick={removeVideo}>Supp</button>
                </div>
            ))}

            <button className="button-add" type="button" onClick={addVideo}>Ajouter</button>

            {/** Vidéo */}
        </>
    );
}

export default NewCourse;