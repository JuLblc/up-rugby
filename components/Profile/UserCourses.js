import Link from 'next/link'

const UserCourses = props => {
  return (
    <div>
      {props.purchasedCourses.length > 0 ? (
        props.purchasedCourses.map(course => (
          <Link href={`/courses/${course.seoUrl}`} key={course._id}>
            <a>{course.title}</a>
          </Link>
        ))
      ) : (
        <div>Vous n'avez pas encore acheté de formations</div>
      )}
    </div>
  )
}

export default UserCourses
