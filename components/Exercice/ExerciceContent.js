import React from "react";
import YouTube from "@u-wave/react-youtube";

const ExerciceContent = (props) => {
  return (
    <div className={props.styles.exerciceContent}>
      {props.exercices.map((exercice) => (
        <React.Fragment key={exercice._id}>
          {exercice.selected &&
            exercice.chapters.map((chapter) => (
              <React.Fragment key={chapter._id}>
                {/* Chapter has subchapters */}
                {chapter.selected &&
                  chapter.subchapters.length > 0 &&
                  chapter.subchapters.map((subchapter) => (
                    //Subchapter
                    <React.Fragment key={subchapter._id}>
                      <h4>{subchapter.title}</h4>
                      {/* Subchapter has Infrachapter */}
                      {subchapter.infrachapters.length > 0 &&
                        subchapter.infrachapters.map((infrachapter) => (
                          <React.Fragment key={infrachapter._id}>
                            <h5>{infrachapter.title}</h5>
                            <div className={props.styles.videoContainer}>
                              {infrachapter.lectures.map((lecture) => (
                                <div key={lecture._id}>
                                  <YouTube
                                    video="oYr2IfwdKYw"
                                    width={300}
                                    height={170}
                                  />
                                </div>
                              ))}
                            </div>
                          </React.Fragment>
                        ))}
                      {/* Subchapter */}
                      <div className={props.styles.videoContainer}>
                        {subchapter.lectures.map((lecture) => (
                          <div key={lecture._id}>
                            <YouTube
                              video="oYr2IfwdKYw"
                              width={300}
                              height={170}
                            />
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}

                {/* Chapter has NO subchapters */}
                {chapter.selected && chapter.subchapters.length === 0 && (
                  <div className={props.styles.videoContainer}>
                    {/* <div key={chapter.title}>{chapter.title}</div> */}
                    {chapter.lectures.map((lecture) => (
                      <div key={lecture._id}>
                        <YouTube video="oYr2IfwdKYw" width={300} height={170} />
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExerciceContent;
