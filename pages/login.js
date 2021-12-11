import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {

    const router = useRouter();

    const { data: session, status } = useSession();
    // console.log({session, status})

    //User is already logged in -> redirect vers home
    if (session) {
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


        // Check email and password are not empty
        // Idéalement à faire coté back mais pas possible de modifier la réponse de SignIn
        if (!email || !password) {
            setFormData({ ...formData, message: 'Merci de saisir une adresse E-mail et un mot de passe' });
        } else {
            signIn('credentials', {
                redirect: false,
                email,
                password,
            })
                .then(response => {
                    // console.log('response login: ', response)
                    if (!response.error) {
                        router.push('/')
                    } else if (response.error === `Cannot read property 'password' of null`) {
                        setFormData({ ...formData, message: 'Cette adresse E-mail est introuvable ou non validée' });
                    } else {
                        setFormData({ ...formData, message: 'Cette adresse E-mail et ce mot de passe ne correspondent pas' });
                    }
                })
                .catch(err => {
                    console.log(err)
                    setFormData({ ...formData, message: err.response.data.message })
                })
        }
    }

    const logInFacebook = (e) => {
        e.preventDefault();

        signIn('facebook', { callbackUrl: process.env.DOMAIN_URL })
    }

    const logInGoogle = (e) => {
        e.preventDefault();

        signIn('google', { callbackUrl: process.env.DOMAIN_URL })
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
                <Link href='/forgotten-password'><a>Mot de passe oublié?</a></Link>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}

            {/* Login with Facebook */}
            <Link href="#">
                <a onClick={logInFacebook}>Se connecter avec Facebook</a>
            </Link>

            {/* Login with Google */}
            <Link href="#">
                <a onClick={logInGoogle}>Se connecter avec Google</a>
            </Link>
        </>
    );
}

export default Login;