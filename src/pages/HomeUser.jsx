import { getInfosUser } from "../services/api"
import { useEffect, useState } from "react"
import { setUserInfos } from "../features/store"
import { selectAuth, selectToken, selectUserId } from "../features/selector"
import { useSelector, useDispatch} from "react-redux"
import UserHeader from "./UserHeader"

const HomeUser=()=>{
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const token = useSelector(selectToken)
    const auth = useSelector(selectAuth)
   //Dispatch User Information
    useEffect(() => {
        const fetchDataUser = async () => {
        const response = await getInfosUser(userId, token, 'getUserData')
        dispatch(setUserInfos(response.userData[0]))
        }
        fetchDataUser()
    }, [userId, token, dispatch])

    return (
        <>
        {auth ?? <UserHeader/>}
        <section>
        <div className="home_user__form">
            {/* <?=$message?> */}
        </div>
        <div className="home_user__list">
            {/* <?=$list_def?> */}
        </div>
        <hr/>
        </section>
        <section>
            <div className="home_user__contact" id="contacts">
                <a href="?page=home_user#contacts">
                    <img className="img dim200" src="public/pictures/site/contact.png" alt="Dossier de contacts"/>
                </a>
            </div>
            <div className="home_user__contact_list <?=$show?>">
                    {/* <?=$friends?> */}
            </div>
            <div className="home_user__contact_title">
                <img className="img dim35" src="public/pictures/site/arrow_up.png" alt="lien flèche haut"/>
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
}
export default HomeUser