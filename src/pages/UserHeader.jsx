import React, { useRef } from 'react'
import { selectDefunctsList, selectNumberFriends, selectNumberMessages, selectUserInfos,selectToken, selectUserId} from "../features/selector"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useState} from "react"
import { setFiles, updateInfosUser} from "../services/api"
import { updateUserInfos, setAuth } from '../features/store'


const UserHeader = () =>{
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const infosUser = useSelector(selectUserInfos)
    const numberFriends = useSelector(selectNumberFriends)
    const numberMessages = useSelector(selectNumberMessages)
    const defunctsList = useSelector(selectDefunctsList)

    // State to refresh navigator, useEffect can't used because name of image be always the same
    const [cacheBuster, setCacheBuster] = useState(0)

    // const auth = useSelector(selectAuth)
    const token = useSelector(selectToken)
    const id = useSelector(selectUserId)
    const photoBDD = infosUser[0].photo
    const [image, setImage] = useState( photoBDD ?? './assets/site/noone.jpg' )
    console.log('image:', image)
    const handleImageClick = () => {
    fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        async function saveFile (){
            const pathName = await setFiles(id, 0 ,'profil', token, e.target.files[0])
            console.log('pathName:', pathName)
            if(pathName){
                setImage(pathName)
                dispatch(updateUserInfos(pathName))
                // To indicate the image has been change
                setCacheBuster(prev => prev + 1)
                updateInfosUser(id, pathName, token, 'updatePhotoProfil')
            }
        }
        saveFile()
    }

    return(
        <>
        <section className="user">
            <h3>{infosUser[0].pseudo ? infosUser[0].pseudo: `${infosUser[0].lastname}' '${infosUser[0].firstname}`}</h3>
            <form className="user__form" encType="multipart/form-data" id="form_user">
                <div className="user__photo">
                    <img className="img" src={`http://localhost:3000/${image}?cache=${cacheBuster}`} alt="user"/>
                    <input type="file" name="file" id="photo_user" ref={fileInputRef} onChange={handleFileChange}/>
                    <img className="img dim35 user__icon" src="./assets/site/camera-icon.png" alt="icone home utilisateur" onClick={handleImageClick}/>
                </div>
            </form>
            <div className="user__icons">
                <div className="user__new">
                    <Link to={'/tchat'} className="user__mini_icons" id="newFriend" title="Demande d'ami">
                        <img className="img dim40 " src="./assets/site/friend.png" alt="icone demande d'ami"/>
                        {/* <img className="img dim40 <?=$icon_anim_f?>" */}
                        <span className="number_f">{numberFriends}</span>
                    </Link>
                    <Link to={'/contact'} className="user__mini_icons" id="newMessage" title="Nouveau message">
                        <img className="img dim40 <?=$icon_anim_m?>" src="./assets/site/chat.png" alt="icone nouveau message"/>
                        <span className="number_m">{numberMessages}</span>
                    </Link>
                </div>
                <div className="user__fix">
                    <Link to="/" className="user__mini_icons" title="Déconnecter" onClick={()=>{dispatch(setAuth(false))}}>
                            <img className="img dim40" src="./assets/site/power-icon.png" alt="icone deconnexion"/>
                    </Link>
                    <Link to="/environment" className="user__mini_icons" title="Environnement utilisateur">
                            <img className="img dim40" src="./assets/site/environment-icon.png" alt="icone environnement utilisateur"/>
                    </Link>
                    <Link to="/homeUser" className="user__mini_icons" title="Accueil utilisateur">
                            <img className="img dim40" src="./assets/site/home-icon.png" alt="icone home utilisateur"/>
                    </Link>
                </div>
            </div>
        </section>
        <section className="user__menu">
                <Link to="/createForm" className="user__button_menu" >Créer une fiche</Link>
                {defunctsList.length>0 ? <div className ="user__button_menu user__myDefuncts">
                    Modifier une fiche
                        {/* <?=$list_def?> */}
                </div> : <Link className="user__button_menu"to="/search">Rechercher une fiche</Link>}
                <Link className="user__button_menu" to="/profil">Mon compte</Link>
                <Link className="user__button_menu" to="/search">Rechercher</Link>
        </section>
        <section>
                <div>
                    {/* <?=$messFile?> */}
                </div>
                <div className="user__ask_friend">
                </div>
        </section>
        </>
    )
}
export default UserHeader