import { useState } from "react";
import { putAuthForgot } from '../apiCall/auth'

const ForgottenPassword = () => {

    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });

    const { email, message } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const resAuthForgot = await putAuthForgot(email)
        setFormData({ ...formData, message: resAuthForgot.data.message })
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