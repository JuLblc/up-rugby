import { useRef } from "react";

import styles from "../styles/Upload.module.css";

const Upload = (props) => {
  const fileInputRef = useRef(null);
  const divRef = useRef(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = async (event) => {
    if (!event.target.files?.length) {
      return;
    }

    const fileInput = event.currentTarget;

    props.onChange(fileInput.files[0]);

    const newCourseData = { ...props.courseData };

    if (props.uploadFileName === "file") {
      newCourseData.attachements.push({ fileName: fileInput.files[0].name });
    }

    if (props.uploadFileName === "picture") {
      newCourseData.img.fileName = fileInput.files[0].name;
    }

    props.updateStateFromChild(newCourseData);

    event.target.value = null;
  };

  return (
    <div className={styles.uploadContainer} ref={divRef}>
      {/* Display exisiting picture */}
      {props.uploadFileName === "picture" && props.courseData.img.fileName && (
        <div>
          <p>{props.courseData.img.fileName}</p>
          <button
            type="button"
            disabled={props.disabled}
            onClick={() => props.remove()}
          >
            Supp photo!
          </button>
        </div>
      )}

      {/* Display exisiting attachements */}
      {props.uploadFileName === "file" &&
        props.courseData.attachements.map((file, idx) => (
          <div key={file.fileName}>
            <p>{file.fileName}</p>
            <button
              type="button"
              disabled={props.disabled}
              onClick={() => props.remove(idx, file)}
            >
              Supp fichier!
            </button>
          </div>
        ))}

      <button type="button" onClick={onClickHandler} disabled={props.disabled}>
        {props.label}
      </button>
      <input
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        type="file"
        accept={props.acceptedFileTypes}
      />
      
    </div>
  );
};

export default Upload;
