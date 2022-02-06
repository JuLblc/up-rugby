import axios from 'axios';
import { useState } from "react";

const ForgottenPassword = () => {

    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });

    const { email, message } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.put('/api/auth/forgot', { email })
            .then(response => {
                console.log('response: ', response)
                setFormData({ ...formData, message: response.data.message })
            })
            .catch(err => {
                console.log('err: ', err);
                setFormData({ ...formData, message: err.response.data.message })
            })
    }

    return (
        <main>
            <h1>Mot de passe oublié?</h1>
            <p>Saisissez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien par e-mail pour réinitialiser votre mot de passe.</p>
            <form onSubmit={handleFormSubmit}>
                <label>Email:
                    <input type="email" name="email" value={email} onChange={onChange} />
                </label>
                <button>Envoyer le lien de réinitialisation</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </main>
    );
}

export default ForgottenPassword;