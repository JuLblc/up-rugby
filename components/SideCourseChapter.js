import Link from 'next/link'

import { convertTime } from '../utils/utilCourses'

const SideCourseChapter = props => {

  const {styles} = props

  return (
    <div className={styles.chaptersSplit}>
      {props.course.chapters.map(chapter => (
        <div key={chapter._id}>
          <h3 className={styles.chapterTitle}>{chapter.title}</h3>
          {chapter.lectures.map(lecture => (
            <Link
              href={`/courses/${props.course.seoUrl}/lecture/${lecture.seoUrl}?chapter=${chapter.seoUrl}`}
              key={lecture._id}
            >
              <a className={styles.link}>
                <div className={styles.linkDetails}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path d='M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z' />
                  </svg>
                  <span className={styles.lectureTitle}>{lecture.title}</span>
                  <span className={styles.lectureDuration}>
                    {convertTime(lecture.duration)}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ))}
      {props.course.attachements.length > 0 && (
        <h3 className={styles.chapterTitle}>Téléchargement</h3>
      )}
      {props.course.attachements.map(file => (
        <div className={styles.download} key={file._id}>
          <span>{file.fileName}</span>
          {props.course.isPurchased ? (
            <Link href={file.url}>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zM14 9h5l-7 7-7-7h5V3h4v6z'
                    fill='rgba(128,128,128,1)'
                  />
                </svg>
              </a>
            </Link>
          ) : (
            <a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  d='M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z'
                  fill='rgba(128,128,128,1)'
                />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default SideCourseChapter
