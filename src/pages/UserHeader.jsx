import React, { useRef } from 'react'
import { selectDefunctsList, selectNumberFriends, selectNumberMessages, selectUserInfos,selectToken, selectUserId} from "../features/selector"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getInfosUser, setFiles, updateInfosUser} from "../services/api"
import { updateUserInfos } from '../features/store'

const UserHeader = () =>{
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const infosUser = useSelector(selectUserInfos)
    const numberFriends = useSelector(selectNumberFriends)
    const numberMessages = useSelector(selectNumberMessages)
    const defunctsList = useSelector(selectDefunctsList)

    // const auth = useSelector(selectAuth)
    const token = useSelector(selectToken)
    console.log('token:', token)
    const id = useSelector(selectUserId)
    const photoProfil = infosUser[0].photo
    console.log('photoProfil:', photoProfil)
    const [image, setImage] = useState( photoProfil ?? './assets/site/noone.jpg' )
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
                    <img className="img" src={`http://localhost:3000/${image}`} alt="user"/>
                    <input type="file" name="file" id="photo_user" ref={fileInputRef} onChange={handleFileChange}/>
                    <img className="img dim35 user__icon" src="./assets/site/camera-icon.png" alt="icone home utilisateur" onClick={handleImageClick}/>
                </div>
            </form>
            {/* <div className="hidden user__ajax">
                <?=$_SESSION['user']['id']?>
            </div> */}
            <div className="user__icons">
                <div className="user__new">
                    <Link href="" className="user__mini_icons" id="newFriend" title="Demande d'ami">
                        <img className="img dim40 " src="./assets/site/friend.png" alt="icone demande d'ami"/>
                        {/* <img className="img dim40 <?=$icon_anim_f?>" */}
                        <span className="number_f">{numberFriends}</span>
                    </Link>
                    <Link href="?page=home_user&show#contacts" className="user__mini_icons" id="newMessage" title="Nouveau message">
                        <img className="img dim40 <?=$icon_anim_m?>" src="./assets/site/chat.png" alt="icone nouveau message"/>
                        <span className="number_m">{numberMessages}</span>
                    </Link>
                </div>
                <div className="user__fix">
                    <Link to="/" className="user__mini_icons" title="Déconnecter">
                            <img className="img dim40" src="./assets/site/power-icon.png" alt="icone deconnexion"/>
                    </Link>
                    <Link to="/homeUser" className="user__mini_icons" title="Accueil utilisateur">
                            <img className="img dim40" src="./assets/site/home-icon.png" alt="icone home utilisateur"/>
                    </Link>
                </div>
            </div>
        </section>
        <section className="user__menu">
                <Link className="user__button_menu" to="/createForm">Créer une fiche</Link>
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