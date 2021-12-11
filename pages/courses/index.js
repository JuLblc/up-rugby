import { useSession, getSession } from "next-auth/react";

const Courses = () => {

    const { data: session } = useSession();
    console.log({ session })

    return (
        <>
            <h1>Page Formation</h1>
            <h2>Toutes les formations sont affichées</h2>
            <ul>
                <li>Visiteurs</li>
                <li>Utilisateurs connectés</li>
                <li>Utilisateurs ayant acheté la formation</li>
                <li>/!\ Seuls les Utilisateurs ayant payé peuvent accéder à la vidéo /!\</li>
            </ul>
        </>
    );
}

export default Courses;

//Server side rendering
// export const getServerSideProps = async (context) => {

//     const session = await getSession(context)
//     console.log('session: ', session)

//     return {
//         props: {
//             session,
//             //Here formations should be fetch from DB
//             data: session ? 'List of private formations' : 'List of public formations'
//         }
//     }
// }