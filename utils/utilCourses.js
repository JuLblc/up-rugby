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

export const isPurchased = (purchasedCourses, courseId) => {
  if(!purchasedCourses) return false

  return purchasedCourses.indexOf(courseId) === -1
    ? false
    : true
}

export const convertTime = totalMinutes => {
  let hours = Math.floor(totalMinutes / 60)
  let minutes = (totalMinutes %= 60)

  if (hours > 0) {
    minutes = String(minutes).padStart(2, '0')
    return hours + 'h' + minutes
  }

  if (hours <= 0) {
    return minutes + ' min'
  }
}

export const diffTime = (startDate, endDate = Date.now()) => {
  
  var diff = endDate - startDate;

  var seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365)

  seconds %= 60
  minutes %= 60
  hours %= 24
  days %= 30
  months %= 12

  if (years > 0) return `${years} an${years > 1 ? 's' : ''}`
  if (months > 0) return `${months} mois`
  if (days > 0) return `${days} jour${days > 1 ? 's' : ''}`
  if (hours > 0) return `${hours} heure${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`
  if (seconds >= 0) return `${seconds} seconde${seconds > 1 ? 's' : ''}`
}
