import { useRouter } from "next/router";

const FormationDetails = () => {

    const router = useRouter();
    const courseId = router.query.courseId
    return ( 
        <>
            <h1>Detail de la formation {courseId}</h1>
            <p>Afficher le sommaire de la formation</p>
        </>
     );
}
 
export default FormationDetails;