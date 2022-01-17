import { getSession } from 'next-auth/react'

import Link from 'next/link'

const Profile = props => {
  return (
    <>
      <h1>Mon compte</h1>
      <ul>
        <li onClick={e => console.log('click li')}>Mes informations</li>
        <li>Mes formations</li>
      </ul>

      <form>
        <h2>Mes informations</h2>
        <p>add input etc... + bouton edit + gestion enabled / disabled</p>
      </form>

      <div>
        <h2>Mes formations</h2>
        <p>fetch user courses and display info</p>
      </div>
    </>
  )
}

export default Profile

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServer Profile: ', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
