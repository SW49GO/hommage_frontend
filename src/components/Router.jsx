import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Template from '../pages/Template'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Cards from '../pages/Cards'
import Flowers from '../pages/Flowers'
import Error from '../pages/Error'
import Header from './Header'
import Footer from './Footer'
import Contact from '../pages/Contact'
import Buy from '../pages/Buy'
import Search from '../pages/Search'
import CreateForm from '../pages/CreateForm'
import Profil from '../pages/Profil'
import Lost from '../pages/Lost'
import Connexion from '../pages/Connexion'
import HomeUser from '../pages/HomeUser'
import Environment from '../pages/Environment'
import Tchat from '../pages/Tchat'
import ModifyDef from '../pages/ModifyDef'

/**
 * Component function for routing
 * @returns {JSX.Element}
 */
const Router=()=>{

    return ( <BrowserRouter>
                <Header/>
                    <Template>
                        <Routes>
                                <Route exact path='/' element={<Home/>} />
                                <Route path='/environment' element={<Environment/>}/>
                                <Route path='/register' element={<Register/>} />
                                <Route path='/cards' element={<Cards/>} />
                                <Route path='/tchat' element={<Tchat/>} />
                                <Route path='/modifyDef' element={<ModifyDef/>} />
                                <Route path='/flowers' element={<Flowers/>} />
                                <Route path='/contact' element={<Contact/>} />
                                <Route path='/buy' element={<Buy/>} />
                                <Route path='/search' element={<Search/>} />
                                <Route path='/createForm' element={<CreateForm/>} />
                                <Route path='/profil' element={<Profil/>} />
                                <Route path='/lost' element={<Lost/>} />
                                <Route path='/connexion' element={<Connexion/>} />
                                <Route path='/homeUser' element={<HomeUser/>} />
                                <Route path='*' element={<Error/>} />
                        </Routes>
                    </Template>
                <Footer/>
            </BrowserRouter>
            )
}

export default Router