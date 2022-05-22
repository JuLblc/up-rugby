import ChapterMenu from './ChapterMenu'

const ExerciceMenu = props => {
  return (
    <li className={props.styles.exerciceMenuLi}>
      <div
        id={props.exercice._id}
        className={`${props.styles.exerciceTitle} ${props.exercice.selected &&
          props.styles.exerciceTitleSelected}`}
        onClick={() => props.handleDisplay(props.exercice._id)}
      >
        <p>{props.exercice.title}</p>
        {!props.exercice.selected && (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'>
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'
              fill='rgba(128,128,128,1)'
            />
          </svg>
        )}

        {props.exercice.selected && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z'
              fill='rgba(128,128,128,1)'
            />
          </svg>
        )}
      </div>
      {props.exercice.selected && (
        <ChapterMenu styles={props.styles} exercice={props.exercice} />
      )}
    </li>
  )
}

export default ExerciceMenu
