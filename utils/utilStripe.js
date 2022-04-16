import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const cookiesToMetadata = (cookiesStr) => {

  const cookies = cookiesStr.split('; ')
 
  const cookieObj = {};
 
  cookies.forEach(cookie => {
    let keyValueCookie = cookie.split('=')
    cookieObj[keyValueCookie[0]] = keyValueCookie[1]
  })

  return cookieObj;
}

export const cookiesToStr = (cookies) => {
  let cookieStr = ''
  for (const [key, value] of Object.entries(cookies)) {
    cookieStr = cookieStr + `${key}=${value}; `
  }

  return cookieStr;
}