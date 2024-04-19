import { selectAuth, selectDefunctsList, selectUserInfos } from "../features/selector"
import { useSelector, useDispatch} from "react-redux"
import UserHeader from "./UserHeader"
import Error from "./Error"
import React, { useEffect, useState } from "react"
import { setDefIdSelected, setSelectedDef} from "../features/store"
import { useNavigate } from "react-router-dom"

const HomeUser=()=>{
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const data = useSelector(selectUserInfos)
    const auth = useSelector(selectAuth)
    const defunctsList = useSelector(selectDefunctsList)
    // State to update list of defunct
    const [hasDefuncts, setHasDefuncts] = useState(false)
    useEffect(()=>{
        if(defunctsList.length>0){
            setHasDefuncts(true)
        }else{
            setHasDefuncts(false)
        }
    },[defunctsList])

    const handleDefunct=(data)=>{
        console.log('dataHOMEUSER:', data)
        const selectedDefInfos = defunctsList.filter((item)=>item.id===data)
        dispatch(setSelectedDef(selectedDefInfos[0]))
        dispatch(setDefIdSelected(data))
        navigate('/environment')
    }

    if(data){
        return (
            <>
            {auth ?? <UserHeader/>}
            <section>
            <div className="home_user__form">
                {/* <?=$message?> */}
            </div>
            <div className="home_user__list">
                {hasDefuncts ? <div><h3>Liste de défunts que vous gérez</h3>
                    { defunctsList.map(( item)=>(
                            <p key={item.id} onClick={()=>handleDefunct(item.id)} className="button" style={{margin:'0.2rem'}}>{item.lastname} {item.firstname}</p>
                            ))}
                </div>: <div></div>}
            </div>
            <hr/>
            </section>
            <section>
                <div className="home_user__contact" id="contacts">
                    <a href="?page=home_user#contacts">
                        <img className="img dim200" src="./assets/site/contact.png" alt="Dossier de contacts"/>
                    </a>
                </div>
                <div className="home_user__contact_list <?=$show?>">
                        {/* <?=$friends?> */}
                </div>
                <div className="home_user__contact_title">
                    <img className="img dim35" src="./assets/site/arrow_up.png" alt="lien flèche haut"/>
                    <h2>Mes Contacts -- Tchat</h2>
                </div>
                <hr/>
            </section>
            <section className="home_user__slider">
                <h1>Photos récemment ajoutées</h1>
                {/* <?=$slider?> */}
            </section>

            </>
        )
    }else{
        return(
            <>
            <Error message={'Erreur réseau'}/>
            </>
        )
    }
}
export default HomeUser