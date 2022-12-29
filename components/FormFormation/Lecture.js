import FormInput from "../FormInput";
import Tiptap from "../Tiptap";

// import styles from '../../styles/Chapter.module.css'
import styles from "../../styles/Formation.module.css";

const Lecture = (props) => {
  const inputs = [
    {
      disabled: props.disableField,
      id: 1,
      label: "Titre leçon:",
      name: "title",
      styles,
      type: "text",
    },
    {
      chapterIdx: props.chapterIdx,
      disabled: props.disableField,
      errorMessages: {
        patternMismatch:
          'Le lien doit commencer par "https://player.vimeo.com/video/" et se terminer par l\'id de la vidéo',
        urlMissing: "Veuillez saisir le lien de la vidéo",
        vimeo: "Cette vidéo n'est pas répertoriée sur Vimeo",
      },
      id: 2,
      label: "Video URL:",
      lectureIdx: props.lectureIdx,
      mediaPlatform: "vimeo",
      name: "url",
      pattern: "^https://player.vimeo.com/video/[0-9]+$",
      required: true,
      setDuration: props.setDuration,
      styles,
      type: "text",
    },
  ];

  return (
    <div className={styles.lectureContainer}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={props.chapter.lectures[props.lectureIdx][input.name] || ""}
          onChange={(e) =>
            props.onChangeVideo(e, props.chapterIdx, props.lectureIdx)
          }
        />
      ))}

      <label>
        <span>Description:</span>
        <Tiptap
          content={props.chapter.lectures[props.lectureIdx]["description"]}
          onChangeTipTap={(content) =>
            props.onChangeTipTap(content, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        />
      </label>

      <button
        className={`${styles.button} ${styles.primatyRemoveBtn}`}
        type="button"
        onClick={(e) =>
          props.removeVideo(e, props.chapterIdx, props.lectureIdx)
        }
        disabled={props.disableField}
      >
        Supprimer Leçon
      </button>
    </div>
  );
};

export default Lecture;
