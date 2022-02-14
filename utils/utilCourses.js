export const getLecturesQty = course => {
  let qty = 0
  course.chapters.map(chapter => (qty = qty + chapter.lectures.length))
  return qty
}

export const getLecturesTime = course => {
  let timeCourse = 0
  course.chapters.map(chapter => {
    let timeChapter = 0
    chapter.lectures.map(
      lecture => (timeChapter = timeChapter + lecture.duration)
    )
    timeCourse = timeCourse + timeChapter
  })
 
  return convertTime(timeCourse)
}

export const convertTime = totalMinutes => {
  let hours = Math.floor(totalMinutes / 60)
  let minutes = totalMinutes %= 60

  if (hours > 0) {
    minutes = String(minutes).padStart(2, '0')
    return hours + 'h' + minutes
  } else {
    return minutes + ' min'
  }
}