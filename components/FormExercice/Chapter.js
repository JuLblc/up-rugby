import FormInput from "../FormInput";
import Lecture from "./Lecture";
import SubChapter from "./SubChapter";

import styles from "../../styles/Formation.module.css";

const Chapter = (props) => {
  const onChangeVideo = (e, chapterIdx, lectureIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].lectures[lectureIdx][e.target.name] =
      e.target.value;
    props.updateStateFromChild(newExerciceData);
  };

  const onChangeSubChapter = (e, chapterIdx, subchapterIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx][
      e.target.name
    ] = e.target.value;
    props.updateStateFromChild(newExerciceData);
  };

  const removeVideo = (chapterIdx, videoIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].lectures.splice(videoIdx, 1);

    props.updateStateFromChild(newExerciceData);
  };

  const removeSubChapter = (chapterIdx, subchapterIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters.splice(subchapterIdx, 1);

    props.updateStateFromChild(newExerciceData);
  };

  const setDuration = (
    duration,
    youtubeId,
    chapterIdx,
    lectureIdx,
    subchapterIdx,
    infrachapterIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };

    if (infrachapterIdx !== undefined) {
      newExerciceData.chapters[chapterIdx].subchapters[
        subchapterIdx
      ].infrachapters[infrachapterIdx].lectures[lectureIdx].duration = duration;

      newExerciceData.chapters[chapterIdx].subchapters[
        subchapterIdx
      ].infrachapters[infrachapterIdx].lectures[lectureIdx].youtubeId =
        youtubeId;

      props.updateStateFromChild(newExerciceData);

      return;
    }

    if (subchapterIdx !== undefined) {
      newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx].lectures[
        lectureIdx
      ].duration = duration;

      newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx].lectures[
        lectureIdx
      ].youtubeId = youtubeId;
      props.updateStateFromChild(newExerciceData);

      return;
    }

    newExerciceData.chapters[chapterIdx].lectures[lectureIdx].duration =
      duration;

    newExerciceData.chapters[chapterIdx].lectures[lectureIdx].youtubeId =
      youtubeId;

    props.updateStateFromChild(newExerciceData);
  };

  const addVideoToSubChapter = (chapterIdx, subchapterIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].lectures.push({ duration: 0, url: "", youtubeId: "" });
    props.updateStateFromChild(newExerciceData);
  };

  const addInfraChapter = (chapterIdx, subchapterIdx) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters.push({
      lectures: [],
      subchapters: [],
      title: "",
    });
    props.updateStateFromChild(newExerciceData);
  };

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label="Titre Chapitre:"
        type="text"
        name="title"
        value={props.exerciceData.chapters[props.chapterIdx].title || ""}
        onChange={(e) => props.onChangeChapter(e, props.chapterIdx)}
        disabled={props.disableField}
        styles={styles}
      />

      {props.exerciceData.chapters[props.chapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          <Lecture
            key={lectureIdx}
            chapterIdx={props.chapterIdx}
            lectureIdx={lectureIdx}
            chapter={props.exerciceData.chapters[props.chapterIdx]}
            onChangeVideo={(e) =>
              onChangeVideo(e, props.chapterIdx, lectureIdx)
            }
            removeVideo={() => removeVideo(props.chapterIdx, lectureIdx)}
            disableField={props.disableField}
            setDuration={setDuration}
          />
        )
      )}

      {props.exerciceData.chapters[props.chapterIdx].subchapters.map(
        (subchapter, subchapterIdx) => (
          <SubChapter
            key={subchapterIdx}
            chapterIdx={props.chapterIdx}
            subchapterIdx={subchapterIdx}
            exerciceData={props.exerciceData}
            chapter={props.exerciceData.chapters[props.chapterIdx]}
            updateStateFromChild={props.updateStateFromChild}
            onChangeSubChapter={(e) =>
              onChangeSubChapter(e, props.chapterIdx, subchapterIdx)
            }
            removeSubChapter={() =>
              removeSubChapter(props.chapterIdx, subchapterIdx)
            }
            addVideoToSubChapter={() =>
              addVideoToSubChapter(props.chapterIdx, subchapterIdx)
            }
            addInfraChapter={() =>
              addInfraChapter(props.chapterIdx, subchapterIdx)
            }
            disableField={props.disableField}
            setDuration={setDuration}
          />
        )
      )}

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type="button"
        onClick={() => props.addSubChapter(props.chapterIdx)}
        disabled={props.disableField}
      >
        Ajouter sous-chap.
      </button>

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type="button"
        onClick={() => props.addVideo(props.chapterIdx)}
        disabled={props.disableField}
      >
        Ajouter Video
      </button>

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type="button"
        onClick={() => props.removeChapter(props.chapterIdx)}
        disabled={props.disableField}
      >
        Supprimer chap.
      </button>
    </div>
  );
};

export default Chapter;
