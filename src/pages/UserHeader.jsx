import { selectDefunctsList, selectNumberFriends, selectNumberMessages, selectUserInfos } from "../features/selector"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserHeader = () =>{
    const infosUser = useSelector(selectUserInfos)
    console.log('infosUser:', infosUser)
    const numberFriends = useSelector(selectNumberFriends)
    const numberMessages = useSelector(selectNumberMessages)
    const defunctsList = useSelector(selectDefunctsList)
    return(
        <>
        <section className="user">
            <h3>{infosUser.pseudo ? infosUser.pseudo : infosUser.lastName+' '+infosUser.firstName}</h3>
            <form className="user__form" method="POST" action="?page=home_user" encType="multipart/form-data" id="form_user">
                <div className="user__photo">
                    {infosUser.photo ? <img className="img" src={infosUser.photo} alt="user"/>: <img className="img" src="./assets/site/noone.jpg" alt="profil"/>}
                    <input type="file" name="photo" id="photo_user" accept="image/jpg, image/jpeg, image/png"/>
                    <img className="img dim35 user__icon" src="./assets/site/camera-icon.png" alt="icone home utilisateur"/>
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
                    <Link to="/userContent" className="user__mini_icons" title="Accueil utilisateur">
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