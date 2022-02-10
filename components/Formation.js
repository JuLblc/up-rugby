import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/router";

import Chapter from "./Chapter";
import Upload from "./Upload";
import Tiptap from "./Tiptap";

import { toSeoUrl } from "../utils/utilSeoUrl";

import styles from "../styles/Formation.module.css";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const Formation = (props) => {
  // console.log('3. props Formation: ', props)

  const router = useRouter();

  const [courseData, setCourseData] = useState(props.courseContent);
  const [disableField, setDisableField] = useState(props.disable);
  const [fileInput, setFileInput] = useState([]);
  const [pictInput, setPictInput] = useState();

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
      title: "",
      seoUrl: "",
      lectures: [
        {
          title: "",
          seoUrl: "",
          description: "",
          url: "",
          duration: 0
        }
      ]
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
    newCourseData.attachements.splice(idx, 1);
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
      title: "",
      seoUrl: "",
      description: "",
      url: "",
      duration: 0
    });
    setCourseData(newCourseData);
  };

  const onBlurUrlVideo = (chapterIdx, lectureIdx) => {
    let vimeoUrl = "https://player.vimeo.com/video/";
    let vimeoUrlToCheck =
      courseData.chapters[chapterIdx].lectures[lectureIdx].url;
    let vimeoId = vimeoUrlToCheck.substring(31, vimeoUrlToCheck.length);

    if (vimeoUrlToCheck.startsWith(vimeoUrl) && !isNaN(vimeoId)) {
      console.log("url valide");
      axios
        .get(`https://api.vimeo.com/videos/${vimeoId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_TOKEN}`
          }
        })
        .then((response) => console.log("response: ", response.data.duration))
        .catch((err) => console.log(err));
    } else {
      console.log("url vimeo NON valide");
    }
  };

  const deleteCourse = () => {
    axios
      .delete("/api/courses", { data: courseData._id })
      .then((response) => {
        console.log("response: ", response.data);
        router.push("/courses");
      })
      .catch((err) => console.log("err: ", err));
  };

  const updateCourse = () => {
    setDisableField(false);
  };

  const publishCourse = () => {
    const newCourseData = { ...courseData };
    newCourseData.isPublished = true;
    setCourseData(newCourseData);

    axios
      .put("/api/courses", { course: newCourseData })
      .then((response) => {
        console.log("response publish: ", response.data);
        router.push("/courses");
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (courseData.title === "") {
      console.log("Titre ne peut pas être vide");
      return;
    }

    //Set Url for SEO
    const newCourseData = { ...courseData };
    newCourseData.seoUrl = toSeoUrl(courseData.title);
    newCourseData.chapters.map((chapter) => {
      chapter.seoUrl = toSeoUrl(chapter.title);
      chapter.lectures.map((lecture) => {
        lecture.seoUrl = toSeoUrl(lecture.title);
      });
    });

    setDisableField(true);

    // 1. Files upload to Cloudinary & get secure urls
    if (fileInput.length > 0) {
      const formDataFile = new FormData();

      for (const file of fileInput) {
        formDataFile.append("file", file);
      }
      const resUploadFile = await axios.post("/api/uploads", formDataFile, {
        params: {
          folder: "/uprugby-uploads-ppt",
          resource_type: "raw"
        }
      });

      newCourseData.attachements
        .filter((file) => file.url === undefined)
        .map((file, idx) => (file.url = resUploadFile.data.secureUrls[idx]));
    }

    //2. Picture upload to Cloudinary & get secure urls
    if (pictInput) {
      const formDataPict = new FormData();
      formDataPict.append("file", pictInput);

      const resUploadPict = await axios.post("/api/uploads", formDataPict, {
        params: {
          folder: "/uprugby-uploads-pict-formation",
          resource_type: "image"
        }
      });

      newCourseData.img.url = resUploadPict.data.url;
      newCourseData.img.width = resUploadPict.data.width;
      newCourseData.img.height = resUploadPict.data.height;
    }

    //3. Save in DB
    if (!courseData.isPublished) {
      if (props.action === "create") {
        const resCreate = await axios.post("/api/courses", {
          course: newCourseData
        });
        console.log('newCourseFromDB: ', resCreate.data.newCourseFromDB)
        router.push(
          `/courses/update-course/${resCreate.data.newCourseFromDB.seoUrl}`
        );
      }

      if (props.action === "update") {
        const resUpdate = await axios.put("/api/courses", {
          course: newCourseData
        });
        router.push(
          `/courses/update-course/${resUpdate.data.updatedCourseFromDB.seoUrl}`
        );
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label>
          {" "}
          Titre Formation:
          <input
            className={styles.formationTitle}
            type="text"
            name="title"
            value={courseData.title}
            onChange={onChange}
            disabled={disableField}
          />
        </label>

        <div>
          <label>
            {" "}
            Catégorie:
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

          <label>
            {" "}
            Prix:
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={onChange}
              disabled={disableField}
            />
          </label>
        </div>

        <Upload
          label="Ajouter photo"
          courseData={courseData}
          remove={removePict}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadPict}
          uploadFileName="picture"
          disabled={disableField}
          acceptedFileTypes="image/*"
        />

        <label>
          {" "}
          Présentation:
          <Tiptap
            overview={courseData.overview}
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
            onBlurUrlVideo={onBlurUrlVideo}
          />
        ))}

        <button
          className="button-add-chapter"
          type="button"
          onClick={addChapter}
          disabled={disableField}
        >
          Ajouter Chapitre
        </button>

        <Upload
          label="Ajouter fichier"
          courseData={courseData}
          remove={removeAttachement}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadFile}
          uploadFileName="file"
          disabled={disableField}
          acceptedFileTypes=".ppt, .pptx, .pdf"
        />

        {/*  Display 'save' button until course is save in DB*/}
        {props.action === "create" && (
          <button type="submit" className={styles.saveBtn}>
            Enregistrer
          </button>
        )}

        {props.action === "update" && (
          <>
            {disableField ? (
              <>
                {/* Fields are disabled and buttons are displayed */}
                <button type="button" onClick={publishCourse}>
                  Publier
                </button>

                <button type="button" onClick={updateCourse}>
                  Modifier
                </button>
              </>
            ) : (
              <>
                {/* Fields are enabled and buttons are displayed */}
                <button type="submit" className={styles.saveBtn}>
                  Enregistrer
                </button>
              </>
            )}

            <button
              className="button-delete"
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
