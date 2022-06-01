import React from 'react'
import { useRef, useEffect } from 'react'

import YouTube from '@u-wave/react-youtube'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useElementDimensions } from '../../hooks/useElementDimensions'


const ExerciceContent = props => {
  const youtubePlayerDimension = { with: 300, height: 170 }

  const divRef = useRef()
  // console.log('divRef.current: ', divRef.current)

  const { width, height } = useWindowDimensions()
  const { elementWidth, elementHeight } = useElementDimensions(divRef.current)

  // console.log('window dim: ', width, height)
  console.log('element dim: ', elementWidth, elementHeight)

  return (
    <div className={props.styles.exerciceContent}>
      {props.exercices.map(exercice => (
        <React.Fragment key={exercice._id}>
          {exercice.selected &&
            exercice.chapters.map(chapter => (
              <React.Fragment key={chapter._id}>
                {/* Chapter has subchapters */}
                {chapter.selected &&
                  chapter.subchapters.length > 0 &&
                  chapter.subchapters.map(subchapter => (
                    //Subchapter
                    <React.Fragment key={subchapter._id}>
                      <h4>{subchapter.title}</h4>
                      {/* Subchapter has Infrachapter */}
                      {subchapter.infrachapters.length > 0 &&
                        subchapter.infrachapters.map(infrachapter => (
                          <React.Fragment key={infrachapter._id}>
                            <h5>{infrachapter.title}</h5>
                            <div
                              ref={divRef}
                              className={props.styles.videoContainer}
                            >
                              {infrachapter.lectures.map(lecture => (
                                <YouTube
                                  key={lecture._id}
                                  video={lecture.youtubeId}
                                  width={youtubePlayerDimension.with}
                                  height={youtubePlayerDimension.height}
                                />
                              ))}
                            </div>
                          </React.Fragment>
                        ))}
                      {/* Subchapter */}
                      <div ref={divRef} className={props.styles.videoContainer}>
                        {subchapter.lectures.map(lecture => (
                          <YouTube
                            key={lecture._id}
                            video={lecture.youtubeId}
                            width={youtubePlayerDimension.with}
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
                    {chapter.lectures.map(lecture => (
                      <YouTube
                        key={lecture._id}
                        video={lecture.youtubeId}
                        width={youtubePlayerDimension.with}
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
  )
}

export default ExerciceContent
