import { Link } from "react-router-dom"
import UserHeader from "./UserHeader"
import { useSelector } from "react-redux"
import { selectAuth } from "../features/selector"
import '../index.css'

const Template= (props)=>{
    let auth = useSelector(selectAuth)
    auth = true
    return (
    <>
        <div id="main__begin">
             <Link to={"#main__end"} title="Bas de page"><img className="img dim40" src="./assets/site/down.png" alt="ancre vers bas de page"/></Link>
        </div>
        {auth &&<UserHeader/>}
        <main>
            {props.children}
        </main>
        <div id="main__end">
            <Link to={"#main__begin"} title="Haut de page"><img className="img dim40" src="./assets/site/up.png" alt="ancre vers haut de page"/></Link>
        </div>
    </>
    )
}

export default Template