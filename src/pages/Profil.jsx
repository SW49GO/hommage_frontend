import { useSelector } from "react-redux"
import { selectUserInfos } from "../features/selector"
const Profil = () =>{
    const userInfos = useSelector(selectUserInfos)
    return (
    <>
        <div className="profil">
            <h1 className="profil__title">Mes informations</h1>
            <img className="img dim40" src="./assets/site/Info.png" alt="icon information"/>
            <h3 className="profil__name">{userInfos.lastName}` `{userInfos.firstName}</h3>
            <div className="profil__form">
                <form method="POST" action="?page=profil">
                    <div className="profil__form_info">
                        <label for="email">Votre email :</label>
                        <input name="email" id="email" type="email" value={userInfos.email}/>
                        {/* <?php if ($info_user['pseudo']): ?> */}
                        <label for="pseudo">Votre pseudo :</label>
                        <input name="pseudo" id="maj_pseudo" type="text" value={userInfos.pseudo}/>
                        <p className="profil__message">[Actif à votre prochaine connexion]</p>
                        {/* <?php else :?> */}
                        <label for="pseudo">Vous n'avez pas de pseudo</label>
                        <p className="profil__message">[Actif à votre prochaine connexion]</p>
                        <input name="pseudo" id="pseudo" type="text"/>
                        {/* <?php endif ?> */}
                        <p>Votre adresse :</p>
                        <label>N° :</label>
                        <input type="text" name="number_road" value={userInfos.numberRoad}/>
                        <label>Adresse :</label>
                        <input type="text" name="address" value={userInfos.address}/>
                        <label>Code Postal :</label>
                        <input type="number" name="postal_code" value={userInfos.cp}/>
                        <label>Ville :</label>
                        <input type="text" name="city" value={userInfos.city}/>
                    </div>
                    {/* <?php if ($defunct_list!=null) :?> */}
                    <div className="profil__admin">
                        {/* <h4>Modifier ces <?=$nbr?> fiches :</h4>
                        <?=$defunct_list?> */}
                    </div>
                    <div className="profil__change">
                        <label for ="new_user">Transférer vos fiches à un autre utilisateur.</label>
                        <label>Entrer son Email :</label>
                        <input type="email" name="new_user" placeholder="email@delapersonne.ici"/>
                        {/* <?=$mess_transfer?> */}
                        <input className="button" type="submit" name="new_admin" id="new_user"/>
                    </div>
                    {/* <?php endif ?> */}
                    <label for="modify" className="message">- Modifier les champs que vous souhaitez mettre à jour</label>
                    {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                    <input type="submit" name="submit" className="button" id="modify" value="Modifier"/>
                    {/* <?=$confirm_transfer?> */}
                    <h3>- Désincription -</h3>
                    {/* <?php if (empty($_SESSION['verif_email'])) :?> */}
                    <input className="button <?=$hidden?>" type="submit" name="signOff" value="Se désinscrire"/>
                    {/* <?php else :?> */}
                    <input className="button" type="submit" name="signoff_final" value="Confirmer la désinscription"/>
                    {/* <?php endif ?>
                    <?=$message?> */}
                </form>
            </div>
        </div>
    </>
    )
}
export default Profil