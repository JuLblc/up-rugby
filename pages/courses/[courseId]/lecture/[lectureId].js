import { useRouter } from "next/router";

const Lectures = () => {

    const router = useRouter();
    const { courseId, lectureId } = router.query
    return (
        <>
            <h1>Formation: {courseId} Vidéo: {lectureId}</h1>
            <p>Afficher le sommaire de la formation</p>
        </>
    );
}

export default Lectures;