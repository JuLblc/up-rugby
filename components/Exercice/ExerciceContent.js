import React from "react";
import { useRef, useState, useEffect } from "react";

import YouTube from "@u-wave/react-youtube";
import { useElementDimensions } from "../../hooks/useElementDimensions";

const ExerciceContent = (props) => {
  const [youtubePlayerDimension, setYoutubePlayerDimension] = useState({
    height: undefined,
    width: undefined,
  });

  const divRef = useRef();

  // Get videoContainer width
  const { elementWidth } = useElementDimensions(divRef.current);

  // Set youtube player according to videoContainer width
  useEffect(() => {
    // eslint-disable-next-line immutable/no-let
    let width;
    // eslint-disable-next-line immutable/no-let
    let height;
    const ratio = 9 / 16; // YouTube Video have a ratio 16:9

    if (elementWidth > 964) {
      width = (elementWidth - 64) / 3;
    }

    if (elementWidth > 665 && elementWidth <= 964) {
      width = (elementWidth - 32) / 2;
    }

    if (elementWidth > 300 && elementWidth <= 665) {
      width = elementWidth;
    }

    // eslint-disable-next-line prefer-const
    height = width * ratio;
    setYoutubePlayerDimension({ height, width });
  }, [elementWidth]);

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
                            <div
                              ref={divRef}
                              className={props.styles.videoContainer}
                            >
                              {infrachapter.lectures.map((lecture) => (
                                <YouTube
                                  key={lecture._id}
                                  video={lecture.youtubeId}
                                  width={youtubePlayerDimension.width}
                                  height={youtubePlayerDimension.height}
                                />
                              ))}
                            </div>
                          </React.Fragment>
                        ))}
                      {/* Subchapter */}
                      <div ref={divRef} className={props.styles.videoContainer}>
                        {subchapter.lectures.map((lecture) => (
                          <YouTube
                            key={lecture._id}
                            video={lecture.youtubeId}
                            width={youtubePlayerDimension.width}
                            height={youtubePlayerDimension.height}
                          />
                        ))}
                      </div>
                    </React.Fragment>
                  ))}

                {/* Chapter has NO subchapters */}
                {chapter.selected && chapter.subchapters.length === 0 && (
                  <div ref={divRef} className={props.styles.videoContainer}>
                    {/* <div key={chapter.title}>{chapter.title}</div> */}
                    {chapter.lectures.map((lecture) => (
                      <YouTube
                        key={lecture._id}
                        video={lecture.youtubeId}
                        width={youtubePlayerDimension.width}
                        height={youtubePlayerDimension.height}
                      />
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
