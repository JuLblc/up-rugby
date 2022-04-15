import axios from 'axios'

export const checkoutStripeSession = async (items, email) => {
    return axios.post('/api/stripe/checkout', {items, email});
}