import { useState } from "react";
import Lecture from "./Lecture";

const Chapter = (props) => {

    //console.log('props Chapter: ', props)

    const onChangeVideo = (e, chapterIdx, lectureIdx) => {

        const newCourseData = { ...props.courseData };
        newCourseData.chapters[chapterIdx].lectures[lectureIdx][e.target.name] = e.target.value;
        props.updateStateFromChild(newCourseData)
    }

    const removeVideo = (chapterIdx, lectureIdx) => {

        const newCourseData = { ...props.courseData };
        newCourseData.chapters[chapterIdx].lectures.splice(lectureIdx, 1)
        props.updateStateFromChild(newCourseData)
    }

    return (
        <div className="chapter-container">
            <label> Titre Chapitre:
                <input type='text' name='title' value={props.courseData.chapters[props.chapterIdx].title || ""} onChange={e => props.onChangeChapter(e, props.chapterIdx)} />
            </label>
            {props.courseData.chapters[props.chapterIdx].lectures.map((lecture, lectureIdx) => (
                <Lecture
                    key={lectureIdx}
                    chapterIdx={props.chapterIdx}
                    lectureIdx={lectureIdx}
                    chapter={props.courseData.chapters[props.chapterIdx]}
                    onChangeVideo={(e) => onChangeVideo(e, props.chapterIdx, lectureIdx)}
                    removeVideo={() => removeVideo(props.chapterIdx, lectureIdx)} />
            ))}
            <button className="button-add-lecture" type="button" onClick={() => props.addVideo(props.chapterIdx)}>Ajouter Leçon</button>
            {props.chapterIdx ? <button className="button-supp" type="button" onClick={() => props.removeChapter(props.chapterIdx) }>Supp chapitre</button> :null}
        </div>
    );
}

export default Chapter;