import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <h1>Up-Rugby</h1>
            <ul className="menu">
                <li><Link href='/formations'><a>Formations</a></Link></li>
                <li><Link href='/exercices'><a>Exercices</a></Link></li>
                <li><Link href='/blog'><a>Blog</a></Link></li>
            </ul>
            <ul className="auth">
                <li><Link href='/signup'><a>S'inscrire</a></Link></li>
                <li><Link href='/login'><a>Se connecter</a></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;