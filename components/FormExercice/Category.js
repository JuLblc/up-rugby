import { useState } from "react";
import { useRouter } from "next/router";

import { postExercice } from "../../apiCall/exercices";
import { toSeoUrl } from "../../utils/utilSeoUrl";

import Chapter from './Chapter'
import FormInput from "../FormInput";
import Upload from "../Upload";

const styles = {};

const Category = (props) => {
  const router = useRouter();

  const [exerciceData, setExerciceData] = useState(props.exerciceContent);
  const [disableField, setDisableField] = useState(props.disable);

  const onChange = (e) => {
    setExerciceData({ ...exerciceData, [e.target.name]: e.target.value });
  };

  const onChangeChapter= (e, idx) => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters[idx][e.target.name] = e.target.value
    setExerciceData(newExerciceData)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (exerciceData.category === "" || exerciceData.description === "") {
      console.log("Champs titre & description ne peuvent être vide");
      return;
    }

    //Set Url for SEO
    const newExerciceData = { ...exerciceData };
    newExerciceData.seoUrl = toSeoUrl(exerciceData.category);

    if (props.action === "create") {
      const resCreate = await postExercice(newExerciceData);
      console.log("resCreate: ", resCreate);
      // router.push(
      //   `/courses/update-exercice/${resCreate.data.newExerciceFromDB.seoUrl}`
      // );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <FormInput
        label="Titre Catégorie:"
        type="text"
        name="category"
        // errorMessages={errorMessages}
        required={true}
        value={exerciceData.category}
        onChange={onChange}
        disabled={disableField}
        styles={styles}
      />

      <FormInput
        label="Description:"
        type="text"
        name="description"
        // errorMessages={errorMessages}
        required={true}
        value={exerciceData.description}
        onChange={onChange}
        disabled={disableField}
        styles={styles}
      />

      {/* <Upload
        label="Ajouter"
        courseData={exerciceData}
        // remove={removePict}
        // updateStateFromChild={updateStateFromChild}
        // onChange={onChangeUploadPict}
        uploadFileName="picture"
        disabled={disableField}
        acceptedFileTypes="image/*"
      /> */}

      {exerciceData.chapters.map((chapter,chapterIdx) => (
        <Chapter 
        key={chapterIdx}
        chapterIdx={chapterIdx}

        title={chapter.title}
        urls={chapter.seoUrls}
        onChangeChapter={e => onChangeChapter(e, chapterIdx)}/>
        

      ))}

      {props.action === "create" && (
        <button type="submit" className={`${styles.button} ${styles.saveBtn}`}>
          Enregistrer
        </button>
      )}
    </form>
  );
};

export default Category;
