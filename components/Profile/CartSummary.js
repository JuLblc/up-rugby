const CartSummary = props => {

  const onCartValidate = () => {
    console.log('carte bleu')
  }

  return (
    <div className={props.styles.cartSummaryContainer}>
      <h3>Récapitulatif</h3>
      <div className={props.styles.cartSummaryDetails}>
        <div>
          <p>{props.courses.length} formation{props.courses.length > 1 && 's'}</p>
          <p className={props.styles.cartSummaryTotal}>
          <span>Total:</span><span>{props.courses.map(course => course.price).reduce((prev, curr) => prev + curr, 0)} €</span>
          </p>
        </div>
        <button onClick={onCartValidate} className={props.styles.btnBuy}>Valider</button>
      </div>
    </div>
  )
}

export default CartSummary
