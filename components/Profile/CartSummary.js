import { getStripe } from '../../utils/utilStripe'
import axios from 'axios'

const CartSummary = props => {
  const onCartValidate = async () => {
    
    let stripeItems = props.courses.map(course => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: course.title,
          },
          unit_amount: course.price * 100,
        },
        description: 'Lorem ipsum',
        quantity: 1,
      }
    })

    const stripe = await getStripe();

    const checkoutSession = await axios.post('/api/stripe', {items: stripeItems, email:props.userEmail});

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  }

  return (
    <div className={props.styles.cartSummaryContainer}>
      <h3>Récapitulatif</h3>
      <div className={props.styles.cartSummaryDetails}>
        <div>
          <p>
            {props.courses.length} formation{props.courses.length > 1 && 's'}
          </p>
          <p className={props.styles.cartSummaryTotal}>
            <span>Total:</span>
            <span>
              {props.courses
                .map(course => course.price)
                .reduce((prev, curr) => prev + curr, 0)}{' '}
              €
            </span>
          </p>
        </div>
        <button onClick={onCartValidate} className={props.styles.btnBuy}>
          Valider
        </button>
      </div>
    </div>
  )
}

export default CartSummary
