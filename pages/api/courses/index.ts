import Course from "../../../models/Course.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

type CourseFilter = {
  isPublished?: boolean;
  seoUrl?: string | string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { method, query } = req;

  connectToDatabase()
    .then(() => {
      switch (method) {
        case "GET":
          if (!query.url) {
            getAllCourses(req, res, session);
            break;
          }
          getCourse(req, res, session);
          break;
        case "POST":
          addCourse(req, res, session);
          break;
        case "PUT":
          updateCourse(req, res, session);
          break;
        case "DELETE":
          deleteCourse(req, res, session);
          break;

        default:
          res.status(405).end("Method not allowed");
      }
    })
    .catch((err: Error) => {
      console.error("err : ", err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const addCourse = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: string } }
) => {
  const { course } = req.body;

  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const newCourse = new Course(course);

  newCourse
    .save()
    .then((newCourseFromDB) => {
      res.status(200).json({ newCourseFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const getAllCourses = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: string } }
) => {
  const filter: CourseFilter = {};

  if (!session || session.user.role !== "ADMIN") {
    filter.isPublished = true;
  }

  Course.find(filter)
    .sort({ _id: -1 }) //sort collection in descending order based on the date of insertion
    .then((coursesFromDB) => {
      res.status(200).json({ coursesFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const getCourse = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: string } }
) => {
  const seoUrl = req.query.url;

  const filter: CourseFilter = { seoUrl };

  if (!session || session.user.role !== "ADMIN") {
    filter.isPublished = true;
  }

  Course.findOne(filter)
    .then((courseFromDB) => {
      res.status(200).json({ courseFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const updateCourse = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: string } }
) => {
  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body.course._id;
  const updatedCourse = req.body.course;

  Course.findByIdAndUpdate(id, updatedCourse, { new: true })
    .then((updatedCourseFromDB) => {
      res.status(200).json({ updatedCourseFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const deleteCourse = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: string } }
) => {
  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body;

  Course.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Formation supprimée" });
    })
    .catch((err: Error) => console.error("err : ", err));
};
