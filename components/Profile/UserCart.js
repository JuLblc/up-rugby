import UserCourses from './UserCourses'
import CartSummary from './CartSummary'

const UserCart = props => {
  return (
    <>
      {props.cart.length === 0 ? (
         <div>Votre panier est vide</div>
      ) : (
        <UserCourses
          courses={props.cart}
          styles={props.styles}
          deleteCourseToCart={props.deleteCourseToCart}
          CTA='buy'
        />
      )}
      {props.cart.length > 0 && (
        <CartSummary
          styles={props.styles}
          courses={props.cart}
          userEmail={props.userEmail}
          cookies={props.cookies}
        />
      )}
    </>
  )
}

export default UserCart
