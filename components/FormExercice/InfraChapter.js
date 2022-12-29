import styles from "../../styles/Formation.module.css";
import FormInput from "../FormInput";
import Lecture from "./Lecture";

const InfraChapter = (props) => {
  const onChangeVideoInfraChapter = (
    e,
    chapterIdx,
    subchapterIdx,
    infrachapterIdx,
    lectureIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters[infrachapterIdx].lectures[lectureIdx][e.target.name] =
      e.target.value;
    props.updateStateFromChild(newExerciceData);
  };

  const removeVideoInfraChapter = (
    chapterIdx,
    subchapterIdx,
    infrachapterIdx,
    videoIdx
  ) => {
    const newExerciceData = { ...props.exerciceData };

    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].infrachapters[infrachapterIdx].lectures.splice(videoIdx, 1);

    props.updateStateFromChild(newExerciceData);
  };

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label="Titre Infra-Chap.:"
        type="text"
        name="title"
        value={
          props.subchapter.infrachapters[props.infrachapterIdx].title || ""
        }
        onChange={(e) =>
          props.onChangeInfraChapter(
            e,
            props.chapterIdx,
            props.subchapterIdx,
            props.infrachapterIdx
          )
        }
        disabled={props.disableField}
        styles={styles}
      />

      {props.subchapter.infrachapters[props.infrachapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          <Lecture
            key={lectureIdx}
            chapterIdx={props.chapterIdx}
            subchapterIdx={props.subchapterIdx}
            infrachapterIdx={props.infrachapterIdx}
            lectureIdx={lectureIdx}
            chapter={props.subchapter.infrachapters[props.infrachapterIdx]}
            onChangeVideoInfraChapter={(e) =>
              onChangeVideoInfraChapter(
                e,
                props.chapterIdx,
                props.subchapterIdx,
                props.infrachapterIdx,
                lectureIdx
              )
            }
            removeVideoInfraChapter={() =>
              removeVideoInfraChapter(
                props.chapterIdx,
                props.subchapterIdx,
                props.infrachapterIdx,
                lectureIdx
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
        onClick={(e) =>
          props.addVideoToInfraChapter(
            e,
            props.chapterIdx,
            props.subchapterIdx,
            props.infrachapterIdx
          )
        }
        disabled={props.disableField}
      >
        Ajouter Video
      </button>

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type="button"
        onClick={(e) =>
          props.removeInfraChapter(
            e,
            props.chapterIdx,
            props.subchapterIdx,
            props.infrachapterIdx
          )
        }
        disabled={props.disableField}
      >
        Supp. infra-chap.
      </button>
    </div>
  );
};

export default InfraChapter;
