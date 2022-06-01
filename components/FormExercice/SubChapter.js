import styles from "../../styles/Formation.module.css";
import FormInput from "../FormInput";
import Lecture from "./Lecture";
import InfraChapter from "./InfraChapter";

const SubChapter = (props) => {
  const onChangeVideoSubChapter = (
    e,
    chapterIdx,
    subchapterIdx,
    lectureIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };
    newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx].lectures[
      lectureIdx
    ][e.target.name] = e.target.value;
    props.updateStateFromChild(newExerciceData);
  };

  const onChangeInfraChapter = (
    e,
    chapterIdx,
    subchapterIdx,
    infrachapterIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };
    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters[infrachapterIdx][e.target.name] = e.target.value;
    props.updateStateFromChild(newExerciceData);
  };

  const removeVideoSubChapter = (chapterIdx, subchapterIdx, videoIdx) => {
    const newExerciceData = { ...props.exerciceData };
    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].lectures.splice(videoIdx, 1);

    props.updateStateFromChild(newExerciceData);
  };

  const removeInfraChapter = (chapterIdx, subchapterIdx, infrachapterIdx) => {
    const newExerciceData = { ...props.exerciceData };
    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters.splice(infrachapterIdx, 1);

    props.updateStateFromChild(newExerciceData);
  };

  const addVideoToInfraChapter = (
    chapterIdx,
    subchapterIdx,
    infrachapterIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };
    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters[infrachapterIdx].lectures.push({
      url: "",
      duration: 0,
      youtubeId: ""
    });
    props.updateStateFromChild(newExerciceData);
  };

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label="Titre Sous-Chap.:"
        type="text"
        name="title"
        value={props.chapter.subchapters[props.subchapterIdx].title || ""}
        onChange={(e) =>
          props.onChangeSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        disabled={props.disableField}
        styles={styles}
      />

      {props.chapter.subchapters[props.subchapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          <Lecture
            key={lectureIdx}
            chapterIdx={props.chapterIdx}
            subchapterIdx={props.subchapterIdx}
            lectureIdx={lectureIdx}
            chapter={props.chapter.subchapters[props.subchapterIdx]}
            onChangeVideoSubChapter={(e) =>
              onChangeVideoSubChapter(
                e,
                props.chapterIdx,
                props.subchapterIdx,
                lectureIdx
              )
            }
            removeVideoSubChapter={() =>
              removeVideoSubChapter(
                props.chapterIdx,
                props.subchapterIdx,
                lectureIdx
              )
            }
            disableField={props.disableField}
            setDuration={props.setDuration}
          />
        )
      )}

      {props.chapter.subchapters[props.subchapterIdx].infrachapters.map(
        (infrachapter, infrachapterIdx) => (
          <InfraChapter
            key={infrachapterIdx}
            chapterIdx={props.chapterIdx}
            subchapterIdx={props.subchapterIdx}
            infrachapterIdx={infrachapterIdx}
            exerciceData={props.exerciceData}
            updateStateFromChild={props.updateStateFromChild}
            subchapter={props.chapter.subchapters[props.subchapterIdx]}
            onChangeInfraChapter={(e) =>
              onChangeInfraChapter(
                e,
                props.chapterIdx,
                props.subchapterIdx,
                infrachapterIdx
              )
            }
            removeInfraChapter={() =>
              removeInfraChapter(
                props.chapterIdx,
                props.subchapterIdx,
                infrachapterIdx
              )
            }
            addVideoToInfraChapter={() =>
              addVideoToInfraChapter(
                props.chapterIdx,
                props.subchapterIdx,
                infrachapterIdx
              )
            }
            setDuration={props.setDuration}
            disableField={props.disableField}
          />
        )
      )}

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type="button"
        onClick={() =>
          props.addInfraChapter(props.chapterIdx, props.subchapterIdx)
        }
        disabled={props.disableField}
      >
        Ajouter infra-chap.
      </button>

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type="button"
        onClick={(e) =>
          props.addVideoToSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        disabled={props.disableField}
      >
        Ajouter Video
      </button>

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type="button"
        onClick={(e) =>
          props.removeSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        disabled={props.disableField}
      >
        Supp. sous-chap.
      </button>
    </div>
  );
};

export default SubChapter;
