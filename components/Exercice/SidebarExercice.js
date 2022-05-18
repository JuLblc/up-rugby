import { useWindowDimensions } from '../../hooks/useWindowDimensions'

const SidebarExercice = props => {
  const { width } = useWindowDimensions()

  return (
    <ul className={props.styles.exerciceTitleUl}>
      {props.exercices.map(exercice => (
        <li key={exercice._id} className={props.styles.exerciceTitleLi}>
          <div className={props.styles.exerciceTitle}>
            <p >{exercice.title}</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'
                fill='rgba(128,128,128,1)'
              />
            </svg>
          </div>
          <ul className={props.styles.chapterTitleUl} >
            {exercice.chapters.map(chapter => (
              <li key={chapter._id} className={props.styles.chapterTitleLi}>
                {chapter.title}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default SidebarExercice
