import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Cards from '../pages/Cards'
import Flowers from '../pages/Flowers'
import Error from '../pages/Error'
import Header from './Header'
import Footer from './Footer'

/**
 * Component function for routing
 * @returns {JSX.Element}
 */
function Router(){

    return ( <BrowserRouter>
                <Header/>
                    <Routes>
                        <Route exact path='/' element={<Home/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/cards' element={<Cards/>} />
                        <Route path='/flowers' element={<Flowers/>} />
                        <Route path='*' element={<Error/>} />
                    </Routes>
                <Footer/>
            </BrowserRouter>
            )
}

export default Router