import FormInput from "./FormInput";
import Tiptap from "./Tiptap";

import styles from "../styles/Chapter.module.css";

const Lecture = (props) => {
  const inputs = [
    {
      id: 1,
      label: "Titre leçon:",
      name: "title",
      type: "text",
      disabled: props.disableField,
      styles: styles
    },
    {
      id: 2,
      label: "Video URL:",
      name: "url",
      type: "text",
      errorMessages: {
        valueMissing: "Veuillez saisir le lien de la vidéo",
        patternMismatch: `Le lien doit commencer par "https://player.vimeo.com/video/" et se terminer par l'id de la vidéo`,
        vimeo: "Cette vidéo n'est pas répertoriée sur Vimeo"
      },
      required: true,
      pattern: "^https://player.vimeo.com/video/[0-9]+$",
      disabled: props.disableField,
      chapterIdx: props.chapterIdx,
      lectureIdx: props.lectureIdx,
      getDuration: props.getDuration,
      styles: styles
    }
  ];

  return (
    <div className="video-container">
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

      {props.lectureIdx ? (
        <button
          className="button-supp"
          type="button"
          onClick={(e) =>
            props.removeVideo(e, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        >
          Supprimer Leçon
        </button>
      ) : null}
    </div>
  );
};

export default Lecture;
