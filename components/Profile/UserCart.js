import UserCourses from './UserCourses'
import CartSummary from './CartSummary'

const UserCart = props => {
  return (
    <>
      <UserCourses
        courses={props.cart}
        styles={props.styles}
        deleteCourseToCart={props.deleteCourseToCart}
        CTA='buy'
      />
      <CartSummary
        styles={props.styles}
        courses={props.cart}
        userEmail={props.userEmail}
      />
    </>
  )
}

export default UserCart
