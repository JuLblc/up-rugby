import axios from 'axios'

export const checkoutStripeSession = async (items, email, cookies) => {
    return axios.post('/api/stripe/checkout', {items, email,cookies});
}