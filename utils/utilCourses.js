export const getLecturesQty = (course) => {
  let qty = 0;
  course.chapters.map((chapter) => (qty = qty + chapter.lectures.length));
  return qty;
};

export const getLecturesTime = (course) => {
  let timeCourse = 0;
  course.chapters.map((chapter) => {
    let timeChapter = 0;
    chapter.lectures.map(
      (lecture) => (timeChapter = timeChapter + lecture.duration)
    );
    timeCourse = timeCourse + timeChapter;
  });

  return convertTime(timeCourse);
};

//Call to check if isInCart or isPurchased
export const checkPurchaseStatus = (courses, courseId) => {
  if (!courses) return false;

  return courses.indexOf(courseId) === -1 ? false : true;
};

export const convertTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  let minutes = (totalMinutes %= 60);

  if (hours > 0) {
    minutes = String(minutes).padStart(2, "0");
    return hours + "h" + minutes;
  }

  if (hours <= 0) {
    return minutes + " min";
  }
};

export const diffTime = (startDate, endDate = Date.now()) => {
  var diff = endDate - startDate;

  var seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  if (years > 0) return `${years} an${years > 1 ? "s" : ""}`;
  if (months > 0) return `${months} mois`;
  if (days > 0) return `${days} jour${days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} heure${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  if (seconds >= 0) return `${seconds} seconde${seconds > 1 ? "s" : ""}`;
};

//https://stackoverflow.com/questions/14934089/convert-iso-8601-duration-with-javascript
const parseISO8601 = (iso8601Duration) => {
  const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

  const matches = iso8601Duration.match(iso8601DurationRegex);

  return {
      sign: matches[1] === undefined ? '+' : '-',
      years: matches[2] === undefined ? 0 : matches[2],
      months: matches[3] === undefined ? 0 : matches[3],
      weeks: matches[4] === undefined ? 0 : matches[4],
      days: matches[5] === undefined ? 0 : matches[5],
      hours: matches[6] === undefined ? 0 : matches[6],
      minutes: matches[7] === undefined ? 0 : matches[7],
      seconds: matches[8] === undefined ? 0 : matches[8]
  };
}

export const convertISO8601ToSec = (iso8601Duration) => {
  let iso8601Obj = parseISO8601(iso8601Duration)

  let totalSeconds = Number(iso8601Obj.hours) * 60 * 60 + Number(iso8601Obj.minutes) * 60 + Number(iso8601Obj.seconds)
  return totalSeconds
}