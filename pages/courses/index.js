import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { getCourses } from '../../apiCall'

import CardFormation from '../../components/CardFormation'

import styles from '../../styles/Courses.module.css'

const Courses = props => {
  //console.log('props courses: ', props)

  return (
    <main className={styles.cardFormationContainer}>
      <div className={styles.intro}>
        <h1>
          Toutes les <br/>
          <span className={styles.strong}> formations</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat fringilla condimentum.
        </p>
      </div>
      {props.session?.user.role === 'ADMIN' && (
        <Link href='/courses/create-course'>
          <a>Ajouter une formation</a>
        </Link>
      )}

      {/* <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
      <div>Item 7</div>
      <div>Item 8</div> */}

      {props.courses.map(course => {
        return (
          <CardFormation
            key={course._id}
            courseId={course._id}
            title={course.title}
            seoUrl={course.seoUrl}
            price={course.price}
            isPublished={course.isPublished}
            role={props.session?.user.role}
          />
        )
      })}
    </main>
  )
}

export default Courses

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  const res = await getCourses(context)

  return {
    props: {
      session,
      courses: res.data.coursesFromDB
    }
  }
}
