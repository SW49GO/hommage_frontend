import React, { useEffect, useRef } from 'react'
import { selectDefunctsList, selectNumberFriends, selectNumberMessages, selectUserInfos,selectToken, selectUserId} from "../features/selector"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useState} from "react"
import { setFiles, updatePhoto, getInfos} from "../services/api"
import { updateUserInfos, setAuth, setDefunctsList, setDefIdSelected, setNumberFriends, setSelectedDef} from '../features/store'
import { useQuery, useQueryClient } from 'react-query'
import {useNavigate} from 'react-router-dom'



const UserHeader = () =>{
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const infosUser = useSelector(selectUserInfos)
    //  console.log('infosUser:', infosUser)
    const numberFriends = useSelector(selectNumberFriends)
    let numberMessages = useSelector(selectNumberMessages)
    const defunctsList = useSelector(selectDefunctsList)
    // State for menu defunctList
    const [hasDefuncts, setHasDefuncts] = useState(false)

    // Check defunctList change to update the menu of Defunct
    useEffect(() => {
        if (Object.keys(defunctsList).length > 0) {
            setHasDefuncts(true)
            queryClient.invalidateQueries('infoDef')
        } else {
            setHasDefuncts(false)
        }
    }, [defunctsList, queryClient])
 
    // State to open list of defuncts
    const [isOpen, setIsOpen]=useState(false)
    const toggleList = () => setIsOpen(!isOpen)
    // State to refresh navigator, useEffect can't used because name of image be always the same
    const [cacheBuster, setCacheBuster] = useState(0)

    const token = useSelector(selectToken)
    const id = useSelector(selectUserId)
    let photoBDD
    if(infosUser[0]){
        photoBDD = infosUser[0].photo
    }
    const [image, setImage] = useState(photoBDD !== '' ? photoBDD : 'assets/site/noone.jpg')
    // console.log('image:', image)

    /**
     * Function to valide click on Image
     */
    const handleImageClick = () => {
    fileInputRef.current.click()
    }
    /**
     * Function to Manage user photo profil
     * @param {event} e 
     */
    const handleFileChange = (e) => {
        async function saveFile (){
            const pathName = await setFiles(id, 0 ,'profil', token, e.target.files[0])
            // console.log('pathName:', pathName)
            if(pathName){
                setImage(pathName)
                dispatch(updateUserInfos(pathName))
                // To indicate the image has been change
                setCacheBuster(prev => prev + 1)
                updatePhoto(id, 0, pathName, token, 'updatePhotoProfil')
            }
        }
        saveFile()
    }
    // Request for Defunct List
    const { data:defunctArray } = useQuery('infoDef', () => getInfos(id, token, 'getUserDefunctList'),
    {   retry:1,
        onSuccess: (data) => {if (data) {
            if(data.result.length>0){
            }
            dispatch(setDefunctsList(data.result))
        }},
        onError:(err)=>{console.log(err)}
    })
 
    // console.log(defunctArray)
    // Active a new friend request since lastLog
    const {data:friends} = useQuery('newFriend',()=> getInfos(id,token, 'getAskFriend'),
    {   retry:1,
        onSuccess: (friends)=> { if (friends){
            // console.log('inside',friends.friends)
            dispatch(setNumberFriends(friends.friends.length))
        }
        },
        onError:(err)=>{console.log(err)}
    })

    // Activate icon if new friends
    let icon_anim_f
    if(numberFriends!==0){
        icon_anim_f = 'icon_anim'
    }
// console.log('friends',friends)

    // Active a new Message request since lastLog
    const {data : tchat} = useQuery('newMessage',()=> getInfos(id,token, 'getNewTchat'),
    {   retry:1,
        onSuccess: (message)=> { if (message){
            // console.log('inside',message.result.length)
            dispatch(setNumberFriends(message.result.length))
        }
        },
        onError:(err)=>{console.log(err)}
    })

    // Activate icon if new friends
    let icon_anim_m
    if(numberMessages!==0){
        icon_anim_m = 'icon_anim'
    }
    // console.log('messages',tchat)
    /**
     * Function to retrieve the id of the Defunct selected
     * @param {number} idDef 
     */
    const selectedDefunct= (idDef)=>{
        dispatch(setDefIdSelected(idDef))
        const selectedDef = defunctsList.filter((item)=>(item.id===idDef))
        dispatch(setSelectedDef(selectedDef))
        navigate('/modifyDef')
    }
    if(infosUser[0]){
        return(
            <>
            <section className="user">
                <h3>{infosUser[0].pseudo ? infosUser[0].pseudo: `${infosUser[0].lastname}' '${infosUser[0].firstname}`}</h3>
                <form className="user__form" encType="multipart/form-data" id="form_user">
                    <div className="user__photo">
                        {photoBDD!=='' ?<img className="img" src={`http://localhost:3000/${image}?cache=${cacheBuster}`} alt="user"/>:<img className="img" src={`${image}?cache=${cacheBuster}`} alt="user"/>}
                        <input type="file" name="file" id="photo_user" ref={fileInputRef} onChange={handleFileChange}/>
                        <img className="img dim35 user__icon" src="./assets/site/camera-icon.png" alt="icone home utilisateur" onClick={handleImageClick}/>
                    </div>
                </form>
                <div className="user__icons">
                    <div className="user__new">
                        <Link to={'/tchat'} className="user__mini_icons" id="newFriend" title="Demande d'ami">
                            <img className={`img dim40 ${icon_anim_f}`} src="./assets/site/friend.png" alt="icone demande d'ami"/>
                            {/* <img className="img dim40 <?=$icon_anim_f?>" */}
                            <span className="number_f">{numberFriends}</span>
                        </Link>
                        <Link to={'/contact'} className="user__mini_icons" id="newMessage" title="Nouveau message">
                            <img className={`img dim40 ${icon_anim_m}`} src="./assets/site/chat.png" alt="icone nouveau message"/>
                            <span className="number_m">{numberMessages}</span>
                        </Link>
                    </div>
                    <div className="user__fix">
                        <Link to="/" className="user__mini_icons" title="Déconnecter" onClick={()=>{localStorage.removeItem('persist:localStorageUser');localStorage.removeItem('persist:localStorageAuth');localStorage.removeItem('persist:localStorageUtil') ;dispatch(setAuth(false))}}>
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
                    {hasDefuncts ? 
                    <><div className ="user__button_menu user__myDefuncts" onClick={toggleList}>
                    <span>Modifier une fiche</span>
                    {isOpen && <div className='user__list_defuncts'>
                        { Object.entries(defunctsList).map(([key, item])=>(
                            <p key={key} onClick={()=>{selectedDefunct(item.id)}}>{item.lastname} {item.firstname}</p>
                            ))}
                            </div>}
                            </div></>
                        : <Link className="user__button_menu"to="/search">Rechercher une fiche</Link>}
                    <Link className="user__button_menu" to="/profil">Mon compte</Link>
                    <Link className="user__button_menu" to="/search">Rechercher</Link>
            </section>
            </>
        )
    }
}
export default UserHeader