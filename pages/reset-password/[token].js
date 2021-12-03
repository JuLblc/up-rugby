import axios from 'axios';

import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

const Reset = () => {

    const [formData, setFormData] = useState({
        password: "",
        message: ""
    });

    const router = useRouter();
    const { token } = router.query;

    const { password, message } = formData;

    // UseEffect pour récupérer email + vérif si token encore valide

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/auth/reset', { password, token })
            .then(response => {
                setFormData({ ...formData, message: response.data.message })
            })
            .catch(err => {
                setFormData({ ...formData, message: err.response.data.message })
            })
    }

    return (
        <>
            <h1>Réinitialisation mot de passe</h1>

            <h1>Token: {token}</h1>

            <form onSubmit={handleFormSubmit}>

                <p>
                    Bonjour,
                    vous avez demandé la réinitialisation du mot de passe associé à l'adresse E-mail:
                </p>

                <label>Nouveau mot de passe:
                    <input type="password" name="password" value={password} onChange={onChange} />
                </label>
                <button>Réinitialiser</button>
            </form>

            {message && (
                <p className="message">{message}</p>
            )}
        </>
    );
}

export default Reset;