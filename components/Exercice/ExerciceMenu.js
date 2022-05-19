import { useState } from 'react'
import ChapterMenu from './ChapterMenu'

const ExerciceMenu = props => {

  const [state, setState] = useState({
    show:true
  })
  const handleTitleDisplay = () => {
    setState({...state, show: !state.show})
  }

  return (
    <li
      className={props.styles.exerciceMenuLi}
    >
      <div id={props.exercice._id} className={props.styles.exerciceTitle}  onClick={handleTitleDisplay}>
        <p>{props.exercice.title}</p>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'>
          <path fill='none' d='M0 0h24v24H0z' />
          <path
            d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'
            fill='rgba(128,128,128,1)'
          />
        </svg>
      </div>
      <ChapterMenu styles={props.styles} exercice={props.exercice} show={state.show} />
    </li>
  )
}

export default ExerciceMenu
