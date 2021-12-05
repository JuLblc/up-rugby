import axios from 'axios';

import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";


const Verify = () => {

    const [message, setMessage] = useState();
    const router = useRouter();
    const { token } = router.query;

    const verifyToken = useCallback(async () => {
        console.log('token verifytoken usecallback: ',token)
        
        if (token){
            axios.get('/api/auth/verify', { params: { tokenToCheck: token } })
                .then(response => {
                    console.log('response verifytoken: ', response)
                    setMessage(response.data.message)
                })
                .catch(err => {             
                    console.log('response verifytoken: ', err.response.data)  
                    setMessage(err.response.data.message)
                })
        }
    },[token])

    useEffect(() => {
        verifyToken()
    }, [verifyToken])    // if changes, useEffect will run again
                         // if you want to run only once, just leave array empty []

    return (
        <>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default Verify;