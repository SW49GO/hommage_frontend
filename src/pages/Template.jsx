import UserHeader from "./UserHeader"
import { useSelector } from "react-redux"
import { selectAuth } from "../features/selector"
import '../index.css'
import { getInfosUser } from "../services/api"
import { useEffect } from "react"


const Template= (props)=>{
  useEffect(()=>{
    getInfosUser(1, 'getUserData')
  })
    let auth = useSelector(selectAuth)
    auth = true
    return (
    <>
        <div id="main__begin">
             <a href="#main__end" title="Bas de page"><img className="img dim40" src="./assets/site/down.png" alt="ancre vers bas de page"/></a>
        </div>
        {auth &&<UserHeader/>}
        <main>
            {props.children}
        </main>
        <div id="main__end">
            <a href="#main__begin" title="Haut de page"><img className="img dim40" src="./assets/site/up.png" alt="ancre vers haut de page"/></a>
        </div>
    </>
    )
}

export default Template