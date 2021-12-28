import { useRouter } from "next/router";

const UpdateCourseDetails = () => {

    const router = useRouter();
    const courseId = router.query.courseId
    return ( 
        <>
            <h1>Detail de la formation à modifier {courseId}</h1>
            <p>Afficher la formation à modifier</p>
        </>
     );
}
 
export default UpdateCourseDetails;