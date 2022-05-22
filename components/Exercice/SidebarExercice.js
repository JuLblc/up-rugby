import ExerciceMenu from './ExerciceMenu'

const SidebarExercice = props => {

  return (
    <ul className={props.styles.exerciceMenuUl}>
      {props.exercices.map(exercice => (
        <ExerciceMenu
          key={exercice._id}
          styles={props.styles}
          exercice={exercice}
          handleTitleDisplay={props.handleTitleDisplay}
          handleChapterDisplay={props.handleChapterDisplay}
        />
      ))}
    </ul>
  )
}

export default SidebarExercice
