import { useWindowDimensions } from '../../hooks/useWindowDimensions'

const SidebarExercice = props => {
  const { width } = useWindowDimensions()

  return (
    <ul>
      <li>
        <h4>Attraper-Passer</h4>
        <ul>
          <li>Exercices sur la préhension pour la passe au rugby</li>
          <li>Exercices sur la proprioception</li>
          <li>Motricité et coordination - Skills rugby</li>
        </ul>
      </li>
      <li>
        <h4>Circulation offensive</h4>
        <ul>
          <li>Joueurs en retard</li>
          <li>
            La cellule d'action
            <ul>
              <li>
                Exercice sur le duel au rugby
                <ul>
                  <li>Duel de face avec vitesse exercices rugby</li>
                  <li>Duel de face à l'arrêt</li>
                  <li>Duel de côté - Exercices vidéos rugby</li>
                </ul>
              </li>
              <li>L'action du +1 et du -1 ou -2</li>
              <li>Le joueur axial dans la famille vie du ballon</li>
            </ul>
          </li>
          <li>
            Joueurs en avance
            <ul>
              <li>Occuper l'espace et se démarquer</li>
              <li>
                La gestion de surnombre
                <ul>
                  <li>2vs1</li>
                  <li>3vs2</li>
                </ul>
              </li>
              <li>Les égalités numériques</li>
            </ul>
          </li>
          <li>Famille axe</li>
        </ul>
      </li>
    </ul>
  )
}

export default SidebarExercice
