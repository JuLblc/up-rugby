import { useState } from "react";
import { useRouter } from "next/router";

import Chapter from "./Chapter";
import Upload from "../Upload";
import Tiptap from "../Tiptap";
import FormInput from "../FormInput";

import { toSeoUrl } from "../../utils/utilSeoUrl";
import { postCourse, putCourse, removeCourse } from "../../apiCall/courses";
import { postUpload } from "../../apiCall/uploads";

import styles from "../../styles/Formation.module.css";

const Formation = (props) => {
  const router = useRouter();

  const [courseData, setCourseData] = useState(props.courseContent);
  const [disableField, setDisableField] = useState(props.disable);
  const [fileInput, setFileInput] = useState([]);
  const [pictInput, setPictInput] = useState();

  const errorMessages = {
    descriptionMissing: "Veuillez saisir la description",
    titleMissing: "Veuillez saisir le titre",
  };

  const onChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const updateStateFromChild = (newCourseData) => {
    setCourseData(newCourseData);
  };

  const onChangeTipTap = (newOverview) => {
    const newCourseData = { ...courseData };

    newCourseData.overview = newOverview;
    setCourseData(newCourseData);
  };

  const onChangeChapter = (e, idx) => {
    const newCourseData = { ...courseData };

    newCourseData.chapters[idx][e.target.name] = e.target.value;
    setCourseData(newCourseData);
  };

  const onChangeUploadPict = (picture) => {
    setPictInput(picture);
  };

  const onChangeUploadFile = (file) => {
    const newFileInputs = [...fileInput];

    newFileInputs.push(file);
    setFileInput(newFileInputs);
  };

  const addChapter = () => {
    const newCourseData = { ...courseData };

    newCourseData.chapters.push({
      lectures: [
        {
          description: "",
          duration: 0,
          seoUrl: "",
          title: "",
          url: "",
        },
      ],
      seoUrl: "",
      title: "",
    });
    setCourseData(newCourseData);
  };

  const removeChapter = (idx) => {
    const newCourseData = { ...courseData };

    newCourseData.chapters.splice(idx, 1);
    setCourseData(newCourseData);
  };

  const removeAttachement = (idx, fileToRemove) => {
    //Remove from courseData
    const newCourseData = { ...courseData };

    newCourseData.attachments.splice(idx, 1);
    setCourseData(newCourseData);

    //Remove from fileInput
    const newFileInputs = [...fileInput];
    const index = newFileInputs
      .map((file) => file.name)
      .indexOf(fileToRemove.fileName);

    if (index !== -1) {
      newFileInputs.splice(index, 1);
      setFileInput(newFileInputs);
    }
  };

  const removePict = () => {
    //Remove from courseData
    const newCourseData = { ...courseData };

    newCourseData.img = {};
    setCourseData(newCourseData);

    setPictInput(undefined);
  };

  const addVideo = (idx) => {
    const newCourseData = { ...courseData };

    newCourseData.chapters[idx].lectures.push({
      description: "",
      duration: 0,
      seoUrl: "",
      title: "",
      url: "",
    });
    setCourseData(newCourseData);
  };

  const deleteCourse = async () => {
    await removeCourse(courseData);
    router.push("/courses");
  };

  const updateCourse = () => {
    setDisableField(false);
  };

  const publishCourse = async () => {
    const newCourseData = { ...courseData };

    newCourseData.isPublished = true;
    setCourseData(newCourseData);

    await putCourse(newCourseData);
    router.push("/courses");
  };

  const generateSeoUrls = (courseData) => {
    const newCourseData = { ...courseData };

    newCourseData.seoUrl = toSeoUrl(courseData.title);
    newCourseData.chapters.map((chapter) => {
      chapter.seoUrl = toSeoUrl(chapter.title);
      chapter.lectures.map((lecture) => {
        lecture.seoUrl = toSeoUrl(lecture.title);
      });
    });

    return newCourseData;
  };

  const uploadFilesToCloudinary = async (fileInput, courseData) => {
    if (fileInput.length > 0) {
      const formDataFile = new FormData();

      for (const file of fileInput) {
        formDataFile.append("file", file);
      }

      const resUploadFile = await postUpload(
        formDataFile,
        "/uprugby-uploads-ppt",
        "raw"
      );

      return courseData.attachments
        .filter((file) => file.url === undefined)
        .map((file, idx) => (file.url = resUploadFile.data.secureUrls[idx]));
    }

    return courseData;
  };

  const uploadPictureToCloudinary = async (pictInput, courseData) => {
    if (pictInput) {
      const formDataPict = new FormData();

      formDataPict.append("file", pictInput);

      const resUploadPict = await postUpload(
        formDataPict,
        "/uprugby-uploads-pict-formation",
        "image"
      );

      courseData.img.url = resUploadPict.data.url;
      courseData.img.width = resUploadPict.data.width;
      courseData.img.height = resUploadPict.data.height;
    }

    return courseData;
  };

  const saveCourseData = async (action, courseData) => {
    if (action === "create") {
      const resCreate = await postCourse(courseData);

      router.push(
        `/courses/update-course/${resCreate.data.newCourseFromDB.seoUrl}`
      );
    }

    if (action === "update") {
      const resUpdate = await putCourse(courseData);

      router.push(
        `/courses/update-course/${resUpdate.data.updatedCourseFromDB.seoUrl}`
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const courseDataWithSeoUrl = generateSeoUrls(courseData);

    setDisableField(true);

    const courseDataWithAttachement = await uploadFilesToCloudinary(
      fileInput,
      courseDataWithSeoUrl
    );

    const courseDataWithPicture = await uploadPictureToCloudinary(
      pictInput,
      courseDataWithAttachement
    );

    await saveCourseData(props.action, courseDataWithPicture);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <FormInput
          label="Titre Formation:"
          type="text"
          name="title"
          errorMessages={errorMessages}
          required={true}
          value={courseData.title}
          onChange={onChange}
          disabled={disableField}
          styles={styles}
        />

        <FormInput
          label="Description:"
          type="text"
          name="description"
          errorMessages={errorMessages}
          required={true}
          value={courseData.description}
          onChange={onChange}
          disabled={disableField}
          styles={styles}
        />

        <div>
          <label>
            <span>Catégorie:</span>
            <select
              name="category"
              value={courseData.category}
              onChange={onChange}
              disabled={disableField}
            >
              <option value="Attaque">Attaque</option>
              <option value="Défense">Défense</option>
              <option value="Principe">Principe</option>
              <option value="Système de jeu">Système de jeu</option>
            </select>
          </label>

          <FormInput
            label="Prix:"
            type="number"
            name="price"
            value={courseData.price}
            onChange={onChange}
            disabled={disableField}
            styles={styles}
          />
        </div>

        <Upload
          label="Ajouter"
          data={courseData}
          remove={removePict}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadPict}
          uploadFileName="picture"
          disabled={disableField}
          acceptedFileTypes="image/*"
        />

        <label>
          <span>Présentation:</span>
          <Tiptap
            content={courseData.overview}
            onChangeTipTap={onChangeTipTap}
            disabled={disableField}
          />
        </label>

        {courseData.chapters.map((chapter, chapterIdx) => (
          <Chapter
            key={chapter._id ? chapter._id : chapterIdx}
            chapterIdx={chapterIdx}
            courseData={courseData}
            updateStateFromChild={updateStateFromChild}
            onChangeChapter={(e) => onChangeChapter(e, chapterIdx)}
            removeChapter={() => removeChapter(chapterIdx)}
            addVideo={() => addVideo(chapterIdx)}
            disableField={disableField}
          />
        ))}

        <button
          className={`${styles.button} ${styles.addBtn}`}
          type="button"
          onClick={addChapter}
          disabled={disableField}
        >
          Ajouter Chapitre
        </button>

        <Upload
          label="Ajouter"
          data={courseData}
          remove={removeAttachement}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadFile}
          uploadFileName="file"
          disabled={disableField}
          acceptedFileTypes=".ppt, .pptx, .pdf"
        />

        {/*  Display 'save' button until course is save in DB*/}
        {props.action === "create" && (
          <button
            type="submit"
            className={`${styles.button} ${styles.saveBtn}`}
          >
            Enregistrer
          </button>
        )}

        {props.action === "update" && (
          <>
            {disableField ? (
              <span>
                {/* Fields are disabled and buttons are displayed */}
                {!courseData.isPublished && (
                  <button
                    type="button"
                    className={`${styles.button} ${styles.publishBtn}`}
                    onClick={publishCourse}
                  >
                    Publier
                  </button>
                )}

                <button
                  type="button"
                  className={`${styles.button} ${styles.modifyBtn}`}
                  onClick={updateCourse}
                >
                  Modifier
                </button>
              </span>
            ) : (
              <>
                {/* Fields are enabled and buttons are displayed */}
                <button
                  type="submit"
                  className={`${styles.button} ${styles.saveBtn}`}
                >
                  Enregistrer
                </button>
              </>
            )}

            <button
              className={`${styles.button} ${styles.removeBtn}`}
              type="button"
              onClick={deleteCourse}
            >
              Supprimer formation
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Formation;
