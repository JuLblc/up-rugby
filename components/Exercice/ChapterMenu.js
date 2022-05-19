const ChapterMenu = props => {
  return (
    <ul className={props.styles.chapterTitleUl}>
      {props.exercice.chapters.map(chapter => (
        <li key={chapter._id} className={props.styles.chapterTitleLi}>
          {chapter.title}
        </li>
      ))}
    </ul>
  )
}

export default ChapterMenu
