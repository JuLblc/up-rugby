const CartSummary = props => {
  return (
    <div className={props.styles.cartSummaryContainer}>
      <h3>Récapitulatif</h3>
      <div className={props.styles.cartSummaryDetails}>
        <div>
          <p>{props.courses.length} formations</p>
          <p>
            Total:<span>{props.courses.map(course => course.price).reduce((prev, curr) => prev + curr, 0)} €</span>
          </p>
        </div>
        <button className={props.styles.btnBuy}>Valider</button>
      </div>
    </div>
  )
}

export default CartSummary
