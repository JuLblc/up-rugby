import { getSession } from "next-auth/react";

const Profile = ({ data }) => {

    return (
        <>
            <h1>Mon compte</h1>
            <h2>{data}</h2>
        </>
    );
}

export default Profile;

//Server side rendering
export const getServerSideProps = async (context) => {

    const session = await getSession(context)
    console.log('session getServer Profile: ', session)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session,
            data: session ? `Hello ${session.user.firstName}` : ''
        }
    }
}