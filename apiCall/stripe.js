import axios from 'axios'

export const checkoutStripeSession = async (items, email, cookies) => {
    console.log('process.env.DOMAIN_URL: ', process.env.DOMAIN_URL)
    return axios.post('/api/stripe/checkout', {items, email,cookies});
}