import { useWindowDimensions } from '../../hooks/useWindowDimensions'

const Sidebar = props => {
  const { width } = useWindowDimensions()

  return (
    <>
      <ul>
        {width > 705 && (
          <p className={props.styles.menuTitle}>Tableau de bord</p>
        )}
        {props.li.map(li => (
          <li
            key={li.id}
            id={li.id}
            className={li.styles}
            onClick={e => props.handleDisplay(e)}
          >
            {li.label}
          </li>
        ))}
      </ul>
      {width <= 705 && <div className={props.styles.break}></div>}
    </>
  )
}

export default Sidebar
