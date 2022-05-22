import { useState } from 'react'
import ExerciceMenu from './ExerciceMenu'

const SidebarExercice = props => {
  const [exercices, setExercices] = useState(props.exercices)

  const handleDisplay = id => {
    const newExercices = [...exercices]
    newExercices.map(exercice => exercice._id === id ? exercice.selected = !exercice.selected : exercice.selected = false)
    setExercices(newExercices)
  }

  return (
    <ul className={props.styles.exerciceMenuUl}>
      {exercices.map(exercice => (
        <ExerciceMenu
          key={exercice._id}
          styles={props.styles}
          exercice={exercice}
          handleDisplay={handleDisplay}
        />
      ))}
    </ul>
  )
}

export default SidebarExercice
