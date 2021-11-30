import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/router'

const Profile = () => {

    const router = useRouter();

    const { data: session, status } = useSession();

    useEffect(() => {

        if (status === 'unauthenticated') {
            console.log('to route /')
            router.push('/login')
        }
    })

    return (
        <>
            {status === 'loading' && (
                <h1>Loading</h1>
            )}
            {status === 'authenticated' && (
                <h1>Mon compte</h1>
            )}
        </>
    );
}

export default Profile;