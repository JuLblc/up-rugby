import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {

    const { data: session, status } = useSession();

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
    }

    return (
        <nav>
            <h1>Up-Rugby</h1>
            <ul className="menu">
                <li><Link href='/courses'><a>Formations</a></Link></li>
                <li><Link href='/exercices'><a>Exercices</a></Link></li>
                <li><Link href='/blog'><a>Blog</a></Link></li>

                {/* If user is logged in -> display profile button*/}
                {session && (
                <li><Link href='/profile'><a>Mon compte</a></Link></li>
                )}
            </ul>
            <ul className="auth">
                {/* If user is not logged in -> display login & sign up link*/}
                {status === 'unauthenticated' && !session && (
                    <>
                        <li><Link href='/signup'><a>S'inscrire</a></Link></li>
                        <li><Link href='/login'><a>Se connecter</a></Link></li>
                    </>
                )}

                {/* If user is logged in -> display logout button*/}
                {session && (
                    <li><Link href='/api/auth/signout'><a onClick={handleSignOut}>Se déconnecter</a></Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;