import axios from 'axios';

import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";


const Verify = () => {

    const [message, setMessage] = useState();
    const router = useRouter();
    const { token } = router.query;

    console.log('token: ', token)

    const verifyToken = useCallback(async () => {
        axios.get('/api/auth/verify', { params: { tokenToCheck: token } })
            .then(response => {
                console.log('response verify: ', response)
                setMessage(response.data.message)
            })
            .catch(err => {
                console.log('err: ', err)
                setMessage(err.response.data.message)
            })
    },[token])

    useEffect(() => {
        verifyToken()
    }, [verifyToken])    // if userId changes, useEffect will run again
    // if you want to run only once, just leave array empty []

    return (
        <>
            <h1>Token: {token}</h1>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default Verify;