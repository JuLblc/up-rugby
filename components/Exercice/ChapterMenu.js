const ChapterMenu = (props) => {
  return (
    <ul className={props.styles.chapterTitleUl}>
      {props.exercice.chapters.map((chapter, idx) => (
        <li
          key={chapter._id}
          className={`${props.styles.chapterTitleLi} ${
            props.exercice.chapters[idx].selected &&
            props.styles.chapterTitleLiSelected
          }`}
          onClick={() => {
            props.handleChapterDisplay(props.exercice._id, chapter._id);
          }}
        >
          {chapter.title}
        </li>
      ))}
    </ul>
  );
};

export default ChapterMenu;
