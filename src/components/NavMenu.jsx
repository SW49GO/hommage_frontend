import { Link } from "react-router-dom"
import {FaLeaf,FaAddressCard,FaSearch,FaShoppingBasket,FaEnvelope, FaHome,FaPowerOff,FaUserCircle} from 'react-icons/fa'
import { useSelector,useDispatch } from "react-redux"
import { selectAuth } from "../features/selector"
import '../index.css'
import { useState } from "react"
import { setAuth } from "../features/store"

const NavMenu=()=>{
    const dispatch = useDispatch()
    const auth = useSelector(selectAuth)
    const [classN, setClassN]=useState('')
    const [isOpen, setIsOpen]=useState(false)

    return(
        <>
        {isOpen ?
         <div id="nav" className="nav__bar">
            <p id="nav__bar-close" className={`nav__bar-a close ${classN}`} onClick={()=>{setClassN('');setIsOpen(false)}}>x</p>
            <ul>
                <li><Link className="nav__bar-a" to="/" onClick={()=>{setClassN('');setIsOpen(false)}}><FaHome/>&nbsp; Accueil</Link></li>
                {auth ? <li><Link className="nav__bar-a" to={'/'} onClick={()=>{setClassN('');setIsOpen(false); dispatch(setAuth(false))}}><FaPowerOff/>&nbsp;Déconnexion</Link>
                </li>:<><li><Link className="nav__bar-a" to={'/connexion'} onClick={()=>{setClassN('');setIsOpen(false)}}><FaPowerOff/>&nbsp;Connexion</Link>
                </li> 
                <li><Link className="nav__bar-a" to={'/register'} onClick={()=>{setClassN('');setIsOpen(false)}}><FaUserCircle/>&nbsp;S'inscrire</Link>
                </li></>}
                <li><Link className="nav__bar-a" to="/flowers" onClick={()=>{setClassN('');setIsOpen(false)}}><FaLeaf/>&nbsp;Bouquets</Link></li>
                <li><Link className="nav__bar-a" to="/cards" onClick={()=>{setClassN('');setIsOpen(false)}}><FaAddressCard/>&nbsp;Cartes</Link></li>
                <li><Link className="nav__bar-a" to="/search" onClick={()=>{setClassN('');setIsOpen(false)}}><FaSearch/>&nbsp;Rechercher</Link></li>
                <li><Link className="nav__bar-a" to="/buy" onClick={()=>{setClassN('');setIsOpen(false)}}><FaShoppingBasket/>&nbsp;Panier</Link></li>
                <li><Link className="nav__bar-a" to="/contact" onClick={()=>{setClassN('');setIsOpen(false)}}><FaEnvelope/>&nbsp;Contact</Link>
                </li>
            </ul>
        </div>:
            <div id="nav__bar-open" className={`open ${classN}`} onClick={() => {setClassN('status'); setIsOpen(true)}}>
                <span className="nav__bar-open-span"></span>
                <span className="nav__bar-open-span"></span>
                <span className="nav__bar-open-span"></span>
                <p className="nav__bar-open-p">Menu</p>
            </div>
        }
        
    </>
    )
}

export default NavMenu