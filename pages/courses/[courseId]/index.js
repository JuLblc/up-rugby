import axios from 'axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

import styles from '../../../styles/FormationDetails.module.css'

const FormationDetails = props => {
  // console.log('props FormationDetails: ', props)

  return (
    <>
      <main>
        <h1>{props.course.title}</h1>
        <div className={styles.container}>
          <div className={styles.courseChapters}>
            <h2>Chapitres</h2>
            {props.course.chapters.map(chapter => {
              return (
                <div className='section-chapters' key={chapter._id}>
                  <h3>{chapter.title}</h3>
                  {chapter.lectures.map(lecture => {
                    return (
                      <Link
                        href={`/courses/${props.course._id}/lecture/${lecture._id}?chapterId=${chapter._id}`}
                        key={lecture._id}
                      >
                        <a>{lecture.title}</a>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className={styles.overview}>
            <h2>Présentation</h2>
            <article>{props.course.overview}</article>
          </div>
        </div>
      </main>
    </>
  )
}

export default FormationDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServerSideProps FormationDetails: ', session)

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId },
    headers: { cookie: context.req.headers.cookie }
  })

  return {
    props: {
      session,
      course: res.data.courseFromDB
    }
  }
}
