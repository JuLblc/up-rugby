import Link from 'next/link'

const CardFormation = props => {
  // console.log('CardFormation props: ', props)
  return (
    <div>
      <img src='https://via.placeholder.com/370x220' alt='placeholder' />
      <h3>{props.title}</h3>
      <p>
        Prix: <span>{props.price}</span>
      </p>
      <Link href={`/courses/${props.courseId}`}>Détails</Link>
    </div>
  )
}

export default CardFormation