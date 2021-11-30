import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login = () => {

    const router = useRouter();

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
            redirect: false,
            email,
            password,
        })
            .then(response => {
                if (!response.error) {
                    router.push('/')
                } else {
                    setFormData({ ...formData, message: 'Cette adresse E-mail et ce mot de passe ne correspondent pas' });
                }
            })
            .catch(err => {
                console.log(err)
                setFormData({ ...formData, message: err.response.data.message })
            })
    }

    return (
        <>
            {/* If user is logged in -> redirect to '/'*/}
            

            {/* Login with Credentials */}
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

            {/* Login with Facebook */}
            <a href="http://localhost:5000/auth/facebook">Se connecter avec Facebook</a>
        </>
    );
}

export default Login;