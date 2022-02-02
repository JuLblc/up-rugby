import styles from '../styles/SideCourseChapter.module.css'
import Link from 'next/link'


const SideCourseChapter = (props) => {
  return (
    <div className={styles.sideCourseChapter}>
      {props.course.chapters.map(chapter => {
        return (
          <div className={styles.sectionChapters} key={chapter._id}>
            <h4>{chapter.title}</h4>
            {chapter.lectures.map(lecture => {
              return (
                <Link
                  href={`/courses/${props.course.seoUrl}/lecture/${lecture.seoUrl}?chapter=${chapter.seoUrl}`}
                  key={lecture._id}
                >
                  <a>{lecture.title}</a>
                </Link>
              )
            })}
          </div>
        )
      })}
      {props.course.attachements.length > 0 && (
        <h4>
          <Link href={`/courses/${props.course.seoUrl}/download`}>
            <a>Téléchargement</a>
          </Link>
        </h4>
      )}
    </div>
  )
}

export default SideCourseChapter
