import UserCourses from './UserCourses'

const UserCart = props => {
  return (
    <>
      <UserCourses
        purchasedCourses={props.cart}
        styles={props.styles}
        CTA='buy'
      />
      <div>Calcul total</div>
    </>
  )
}

export default UserCart
