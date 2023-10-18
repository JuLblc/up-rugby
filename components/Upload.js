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

    const newData = { ...props.data };

    if (props.uploadFileName === "file") {
      newData.attachments.push({ fileName: fileInput.files[0].name });
    }

    if (props.uploadFileName === "picture") {
      newData.img.fileName = fileInput.files[0].name;
    }

    props.updateStateFromChild(newData);

    event.target.value = null;
  };

  return (
    <div
      className={`${styles.uploadContainer} ${
        props.uploadFileName === "picture"
          ? styles.photoContainer
          : styles.fileContainer
      }`}
      ref={divRef}
    >
      {/* Display exisiting picture */}
      {props.uploadFileName === "picture" && <span>Photo: </span>}

      {props.uploadFileName === "picture" && props.data.img.fileName && (
        <div className={styles.itemContainer}>
          <p>{props.data.img.fileName}</p>
          <button
            className={styles.primatyRemoveBtn}
            type="button"
            disabled={props.disabled}
            onClick={() => props.remove()}
          >
            Supprimer
          </button>
        </div>
      )}

      {/* Display exisiting attachments */}
      {props.uploadFileName === "file" &&
        (props.data.attachments.length === 0 ? (
          <span>Fichier: </span>
        ) : (
          props.data.attachments.map((file, idx) => (
            <div key={file.fileName} className={styles.itemContainer}>
              <span>Fichier: </span>
              <p>{file.fileName}</p>
              <button
                className={styles.primatyRemoveBtn}
                type="button"
                disabled={props.disabled}
                onClick={() => props.remove(idx, file)}
              >
                Supprimer
              </button>
            </div>
          ))
        ))}

      <button
        type="button"
        onClick={onClickHandler}
        disabled={props.disabled}
        className={styles.primaryAddBtn}
      >
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
