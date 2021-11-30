import axios from 'axios';

import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignUp = () => {

    const router = useRouter();

    const { data: session, status } = useSession();

    //User is already logged in -> redirect vers home
    if (session){
        router.push('/')
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        message: ""
    });

    const { email, password, message } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/auth', { email, password })
            .then(response => {
                console.log('response: ', response.data)
            })
            .catch(err => setFormData({ ...formData, message: err.response.data.message }))
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>Email:
                    <input type="email" name="email" value={email} onChange={onChange} />
                </label>

                <label>Password:
                    <input type="password" name="password" value={password} onChange={onChange} />
                </label>

                <button>Sign Up</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default SignUp;