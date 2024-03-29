import { Link } from "react-router-dom"
import {FaLeaf,FaAddressCard,FaSearch,FaShoppingBasket,FaEnvelope, FaHome,FaPowerOff,FaUserCircle} from 'react-icons/fa'
import { useSelector } from "react-redux"
import { selectAuth } from "../features/selector"
import '../index.css'

const NavMenu=()=>{
    const auth = useSelector(selectAuth)
    return(
        <>
         <nav id="nav" className="nav__bar">
            <Link id="nav__bar-close" href="#" className="nav__bar-a close">×</Link>
            <ul>
                <li><Link className="nav__bar-a" to="/"><FaHome/>&nbsp; Accueil</Link></li>
                {auth ? <li><Link className="nav__bar-a" href="?page=home_user"><FaPowerOff/>&nbsp;Connexion</Link>
                </li> :<> <li><Link className="nav__bar-a" href="?deco"><FaPowerOff/>&nbsp;Déconnexion</Link>
                </li>
                <li><Link className="nav__bar-a" href="?page=registration"><FaUserCircle/>&nbsp;S'inscrire</Link>
                </li></>}
                <li><Link className="nav__bar-a" to="/flowers"><FaLeaf/>&nbsp;Bouquets</Link></li>
                <li><Link className="nav__bar-a" to="/cards"><FaAddressCard/>&nbsp;Cartes</Link></li>
                <li><Link className="nav__bar-a" to="/search"><FaSearch/>&nbsp;Rechercher</Link></li>
                <li><Link className="nav__bar-a" to="/buy"><FaShoppingBasket/>&nbsp;Panier</Link></li>
                <li><Link className="nav__bar-a" to="/contact"><FaEnvelope/>&nbsp;Contact</Link>
                </li>
            </ul>
        </nav>
        <div id="nav__bar-open" className="open">
            <span className="nav__bar-open-span"></span>
            <span className="nav__bar-open-span"></span>
            <span className="nav__bar-open-span"></span>
            <p className="nav__bar-open-p">Menu</p>
        </div>
    </>
    )
}

export default NavMenu