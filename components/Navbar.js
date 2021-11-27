import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <h1>Up-Rugby</h1>
            <ul className="menu">
                <li><Link href='/formations'><a><li>Formations</li></a></Link></li>
                <li><Link href='/exercices'><a><li>Exercices</li></a></Link></li>
                <li><Link href='/blog'><a><li>Blog</li></a></Link></li>
            </ul>
            <ul className="auth">
                <li><Link href=''><a>S'inscrire</a></Link></li>
                <li><Link href=''><a>Se connecter</a></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;