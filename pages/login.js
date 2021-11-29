import { useState } from "react";
import { signIn } from 'next-auth/react'

const Login = () => {

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
        console.log(email, password)
        signIn('credentials', {
            email,
            password,
            // The page where you want to redirect to after a 
            // successful login
            callbackUrl: `${window.location.origin}/`
        })
    }

    return (
        <>
            {/* If user is logged in -> redirect to '/'*/}
            {/* {props.user && navigate('/')} */}

            {/* Login Passeport Local Strategy */}
            <form onSubmit={handleFormSubmit}>
                <label>Email:
                    <input type="email" name="email" value={email} onChange={onChange} />
                </label>

                <label>Password:
                    <input type="password" name="password" value={password} onChange={onChange} />
                </label>

                <button>Login</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}

            {/* Login Passeport Facebook Strategy */}
            <a href="http://localhost:5000/auth/facebook">Se connecter avec Facebook</a>
        </>
    );
}

export default Login;