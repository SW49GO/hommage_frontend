import { Link } from 'react-router-dom'
import {FaFacebookSquare,FaInstagramSquare ,FaTwitterSquare} from 'react-icons/fa'
import '../index.css'

const Footer=()=>{
    return (
    <div className='footer'>
        <div className="footer footer__menu">
            <Link className="footer__menu-a" to='/contact'>Contact</Link>
            <Link className="footer__menu-a" to='/cards'>Nos cartes</Link>
            <Link className="footer__menu-a" to='/flowers'>Nos bouquets</Link>
            <Link className="footer__menu-a" to='/register'>S'inscrire</Link>
        </div>
        <div className="footer__network">
            <div>
                <div>
                    <p>Suivez-nous</p>
                    <Link className="footer__menu-a" to="https://facebook.com"><FaFacebookSquare/></Link>
                    <Link className="footer__menu-a" to="https://instagram.com"><FaInstagramSquare/></Link>
                    <Link className="footer__menu-a" to="https://twitter.com"><FaTwitterSquare/></Link>
                </div>
                <div>Hommage Copyright ©2022</div>
            </div>
        </div>
    </div>
    )
}
export default Footer