import { useSelector, useDispatch } from "react-redux"
import { selectDefunctsList, selectUserInfos } from "../features/selector"
import { useForm } from "react-hook-form"
import { useUpperCaseFistLetter } from "../hooks/upperCaseFirstLetter"
import {useNavigate} from 'react-router-dom'
import { setSelectedDef, setDefIdSelected } from "../features/store"

const Profil = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const upperCaseFirstLetter = useUpperCaseFistLetter
    const {register, handleSubmit}= useForm()
    const userInfos = useSelector(selectUserInfos)
    const defunctList = useSelector(selectDefunctsList)
    console.log('defunctList:', defunctList)

    const handleInfosUser = (data)=>{

    }

    const selectedDefunct= (idDef)=>{
        dispatch(setDefIdSelected(idDef))
        const selectedDef = defunctList.filter((item)=>(item.id===idDef))
        dispatch(setSelectedDef(selectedDef))
        navigate('/modifyDef')
    }
    return (
    <>
        <div className="profil">
            <h1 className="profil__title">Mes informations</h1>
            <img className="img dim40" src="./assets/site/Info.png" alt="icon information"/>
            <h3 className="profil__name">{userInfos[0].lastname} {userInfos[0].firstname}</h3>
            <div className="profil__form">
                <form onSubmit={handleSubmit(handleInfosUser)}>
                    <div className="profil__form_info">
                        <label htmlFor="email">Votre email :</label>
                        <input name="email" id="email" type="email" defaultValue={userInfos[0].email}/>
                        <label htmlFor="pseudo">Votre pseudo :</label>
                        {userInfos[0].pseudo ? <><input name="pseudo" id="pseudo" type="text" defaultValue={userInfos[0].pseudo} {...register ('pseudo', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/></>:
                        <><label htmlFor="pseudo">Vous n'avez pas de pseudo</label>
                        <input name="pseudo" id="pseudo" type="text"/></>}
                        <p>Votre adresse :</p>
                        <label htmlFor="number_road">N° :</label>
                        <input type="text" name="number_road" id="number_road" defaultValue={userInfos[0].number_road} {...register ('number_road')}/>
                        <label htmlFor="address">Adresse :</label>
                        <input type="text" name="address" id="address" defaultValue={userInfos[0].address} {...register ('address', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                        <label htmlFor="postal_code">Code Postal :</label>
                        <input type="number" name="postal_code" id="postal_code" defaultValue={userInfos[0].postal_code} {...register ('postal_code')}/>
                        <label htmlFor="">Ville :</label>
                        <input type="text" name="city" defaultValue={userInfos[0].city} {...register ('city', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    </div> 
                    <label htmlFor="modify" className="message">- Modifier les champs que vous souhaitez mettre à jour</label>
                    <input type="submit" name="submit" className="button" id="modify" value="Modifier"/>
                    {defunctList.length >0 && <div className="profil__admin">
                        <h4>Vos {defunctList.length} fiches :</h4>
                        {defunctList.map((item)=>(
                            <p className="profil__admin-listDef" key={item.id} onClick={()=>{selectedDefunct(item.id)}}>{item.lastname} {item.firstname}</p>
                        ))}
                    </div>}
                </form>
                <form>
                    <div className="profil__change">
                        <label htmlFor ="new_user">Transférer vos fiches à un autre utilisateur.</label>
                        <label>Entrer son Email :</label>
                        <input type="email" name="new_user" placeholder="email@delapersonne.ici"/>
                        {/* <?=$mess_transfer?> */}
                        <input className="button" type="submit" name="new_admin" id="new_user"/>
                    </div>
                </form>
                <form>
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