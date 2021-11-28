import axios from 'axios';

import { useState } from "react";
// import {useNavigate} from 'react-router-dom';

const SignUp = () => {
    
    // const navigate = useNavigate();

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
        console.log('hi')

        axios.post('/api/auth', { email, password })
            .then(response => {
                console.log('response: ', response.data)
            })
            .catch(err => console.log('error: ',error))


        // authService.signup(email, password)
        //     .then(user => {
        //         console.log('response Sign Up: ', user)
        //         props.updateUser(user)
        //         // navigate('/');
        //     })
        //     .catch(err => {
        //         setFormData({ ...formData, message: err.response.data.message })
        //     })
    }

    return (
        <>
            {/* If user is logged in -> redirect to '/'*/}
            {/* {props.user && navigate('/')} */}

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