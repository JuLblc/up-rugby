export const getLecturesQty = (course) => {
  let qty = 0;

  course.chapters.map((chapter) => {
    qty = qty + chapter.lectures.length;
    if (chapter.subchapters && chapter.subchapters.length > 0) {
      chapter.subchapters.map((subchapter) => {
        qty = qty + subchapter.lectures.length;
        if (subchapter.infrachapters && subchapter.infrachapters.length > 0) {
          subchapter.infrachapters.map((infrachapter) => {
            qty = qty + infrachapter.lectures.length;
          });
        }
      });
    }
  });

  return qty;
};

export const getLecturesTime = (course) => {
  let timeCourse = 0;

  course.chapters.map((chapter) => {
    chapter.lectures.map((lecture) => {
      timeCourse = timeCourse + lecture.duration;
    });

    if (chapter.subchapters && chapter.subchapters.length > 0) {
      chapter.subchapters.map((subchapter) => {
        subchapter.lectures.map((lecture) => {
          timeCourse = timeCourse + lecture.duration;
        });

        if (subchapter.infrachapters && subchapter.infrachapters.length > 0) {
          subchapter.infrachapters.map((infrachapter) => {
            infrachapter.lectures.map((lecture) => {
              timeCourse = timeCourse + lecture.duration;
            });
          });
        }
      });
    }
  });

  return convertTime(timeCourse);
};

//Call to check if isInCart or isPurchased
export const checkPurchaseStatus = (courses, courseId) => {
  if (!courses) {
    return false;
  }

  return courses.indexOf(courseId) === -1 ? false : true;
};

export const convertTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  let minutes = (totalMinutes %= 60);

  if (hours > 0) {
    minutes = String(minutes).padStart(2, "0");

    return `${hours}h${minutes}`;
  }

  if (hours <= 0) {
    return `${minutes} min`;
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

  if (years > 0) {
    return `${years} an${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    return `${months} mois`;
  }
  if (days > 0) {
    return `${days} jour${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `${hours} heure${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  if (seconds >= 0) {
    return `${seconds} seconde${seconds > 1 ? "s" : ""}`;
  }
};

//https://stackoverflow.com/questions/14934089/convert-iso-8601-duration-with-javascript
const parseISO8601 = (iso8601Duration) => {
  const iso8601DurationRegex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

  const matches = iso8601Duration.match(iso8601DurationRegex);

  return {
    days: matches[5] === undefined ? 0 : matches[5],
    hours: matches[6] === undefined ? 0 : matches[6],
    minutes: matches[7] === undefined ? 0 : matches[7],
    months: matches[3] === undefined ? 0 : matches[3],
    seconds: matches[8] === undefined ? 0 : matches[8],
    sign: matches[1] === undefined ? "+" : "-",
    weeks: matches[4] === undefined ? 0 : matches[4],
    years: matches[2] === undefined ? 0 : matches[2],
  };
};

export const convertISO8601ToSec = (iso8601Duration) => {
  const iso8601Obj = parseISO8601(iso8601Duration);

  const totalSeconds =
    Number(iso8601Obj.hours) * 60 * 60 +
    Number(iso8601Obj.minutes) * 60 +
    Number(iso8601Obj.seconds);

  return totalSeconds;
};

export const filterObj = (obj) => {
  // Convert `obj` to a key/value array
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(
    ([key, value]) => key === "title" || key === "seoUrl" || key === "_id"
  );

  // Convert the key/value array back to an object

  return Object.fromEntries(filtered);
};

export const getRandomCourses = (
  currentId,
  allCourses,
  idsPurchasedCourses
) => {
  const randomCourses = [];

  // Keep only title seoUrl & id
  const filteredCourses = [...allCourses].map((obj) => filterObj(obj));

  filteredCourses.map((obj) => (obj.seoUrl = `/courses/${obj.seoUrl}`));

  // Remove current course
  let idx = filteredCourses.map((course) => course._id).indexOf(currentId);

  if (idx !== -1) {
    filteredCourses.splice(idx, 1);
  }

  // Remove courses already purchased
  if (idsPurchasedCourses) {
    idsPurchasedCourses.forEach((id) => {
      idx = filteredCourses.map((course) => course._id).indexOf(id);
      if (idx !== -1) {
        filteredCourses.splice(idx, 1);
      }
    });
  }

  // Set courses
  if (filteredCourses.length <= 2) {
    return filteredCourses;
  }

  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * filteredCourses.length);

    randomCourses.push(filteredCourses[randomIdx]);
    filteredCourses.splice(randomIdx, 1);
  }

  return randomCourses;
};

export const getRandomExercices = (qty, allExercices) => {
  const randomExercices = [];
  const filteredExercices = [...allExercices].map((obj) => filterObj(obj));

  filteredExercices.map((obj) => (obj.seoUrl = `/exercices/${obj.seoUrl}`));

  for (let i = 0; i < qty; i++) {
    const randomIdx = Math.floor(Math.random() * filteredExercices.length);

    randomExercices.push(filteredExercices[randomIdx]);
    filteredExercices.splice(randomIdx, 1);
  }

  return randomExercices;
};

export const getRandomContent = (
  currentCourseId,
  allCourses,
  allExercices,
  idsPurchasedCourses
) => {
  const randomCourses = getRandomCourses(
    currentCourseId,
    allCourses,
    idsPurchasedCourses
  );

  const exercicesToFetch = 3 - randomCourses.length;
  const randomExercices = getRandomExercices(exercicesToFetch, allExercices);

  const randomContent = randomCourses.concat(randomExercices);

  return randomContent;
};
