import { useForm } from "react-hook-form"
import { selectToken, selectUserId } from "../features/selector"
import {useSelector, useDispatch} from 'react-redux'
import { setRegister } from "../services/api"
import { setDefunctsList } from "../features/store"
import {useNavigate} from 'react-router-dom'
import { setFormatDate } from "../services/formatData"
import { useUpperCaseFistLetter } from "../hooks/upperCaseFirstLetter"

const Createform = ()=>{

    const upperCaseFirstLetter = useUpperCaseFistLetter
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(selectUserId)
    const token = useSelector(selectToken)

    const {register, handleSubmit} = useForm()
    const saveDef = (data)=>{
        const sendDefunct=async()=>{
            const result =  await setRegister(id, token, data, 'setDefunct')
            console.log('result:', result)
            const idDef = result.result
            dispatch(setDefunctsList({firstname:data.firstname,lastname: data.lastname,idDef: idDef}))
            data.defunct_id = idDef
            setRegister(id, token, data,'setUserAdmin')
            navigate('/homeUser')
        }
        sendDefunct()
    }

    return(
        <>
        <section className="createform">
            <h1 className="createform__title">Créer une fiche</h1>
            <div className="createform__form">
                <form onSubmit={handleSubmit(saveDef)} >  
                    <label htmlFor="firstname">Prenom du defunt :</label>
                    <input type="text" name="firstname" id="firstname" required {...register('firstname', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="lastname">Nom du defunt :</label>
                    <input type="text" name="lastname" id="lastname" required {...register('lastname', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="birthdate">Date de naissance :</label>
                    <input type="date" name="birthdate" id="birthdate" {...register('birthdate',{setValueAs: (value) => setFormatDate(value)})}/>
                    <label htmlFor="city_birth">Ville :</label>
                    <input type="text" name="city_birth" id="city_birth" {...register('city_birth', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="death_date">Date de décès :</label>
                    <input type="date" name="death_date" id="death_date" required {...register('death_date',{setValueAs: (value) => setFormatDate(value)})}/>
                    <label htmlFor="cemetery">Nom du cimetière :</label>
                    <input type="text" name="cemetery" id="cemetery" {...register('cemetery', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="city_death">Ville du cimetière :</label>
                    <input type="text" name="city_death" id="city_death" {...register('city_death', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="postal_code">Code Postal du cimetière :</label>
                    <input type="number" name="postal_code" id="postal_code" {...register('postal_code')}/>
                    <label>Qui êtes-vous pour le defunt ?</label>
                    <select name="affinity" {...register('affinity')}>
                        <option>Affinité</option>
                        <option value="Conjoint">Conjoint</option>
                        <option value="Conjointe">Conjointe</option>
                        <option value="Père">Père</option>
                        <option value="Mère">Mère</option>
                        <option value="Frère">Frère</option>
                        <option value="Soeur">Soeur</option>
                        <option value="Grand-Père">Grand-Père</option>
                        <option value="Grand-Mère">Grand-Mère</option>
                        <option value="Fils">Fils</option>
                        <option value="Fille">Fille</option>
                        <option value="Petit-Fils">Petit fils</option>
                        <option value="Petite-Fille">Petite fille</option>
                        <option value="Beau-Fils">Beau-Fils</option>
                        <option value="Belle-Fille">Belle-Fille</option>
                        <option value="Belle_Mère">Belle_Mère</option>
                        <option value="Beau-père">Beau-père</option>
                        <option value="Nièce">Nièce</option>
                        <option value="Neveu">Neveu</option>
                        <option value="Oncle">Oncle</option>
                        <option value="Tante">Tante</option>
                        <option value="Grand-Oncle">Grand-Oncle</option>
                        <option value="Grand-Tante">Grand-Tante</option>
                        <option value="Cousin">Cousin</option>
                        <option value="Cousine">Cousine</option>
                        <option value="Petit-Ami">Petit-Ami</option>
                        <option value="Petite-Amie">Petite-Amie</option>
                        <option value="Ami">Ami</option>
                        <option value="Amie">Amie</option>
                        <option value="Professeur">Professeur</option>
                        <option value="Elève">Elève</option>
                        <option value="Employeur">Employeur</option>
                        <option value="Collègue">Collègue</option>
                        <option value="Aucune">Aucune</option>
                    </select>
                    <fieldset className="createform__info">
                        <h3>Informations complémentaires</h3>
                        <p>Acceptez-vous de recevoir des cartes de condoléances pour ce defunt ?</p>
                        <label>Cartes par Email :</label> 
                        Oui<input type="radio" name="card_virtuel" value="1" {...register('card_virtuel', {setValueAs: (value) => value})}/>
                        Non<input type="radio" name="card_virtuel" value="0" {...register('card_virtuel', {setValueAs: (value) => value})}/>
                        <label>Cartes par adresse Postal :</label>
                        Oui<input type="radio" name="card_real" value="1" {...register('card_real', {setValueAs: (value) => value})}/>
                        Non<input type="radio" name="card_real" value="0" {...register('card_real', {setValueAs: (value) => value})}/>
                        <label>Acceptez-vous de recevoir des bouquets de fleurs pour ce defunt ?</label>
                        Oui<input type="radio" name="flower" value="1" {...register('flower', {setValueAs: (value) => value})}/>
                        Non<input type="radio" name="flower" value="0" {...register('flower', {setValueAs: (value) => value})}/>
                    </fieldset>
                    <input className="button" type="submit" name="submit" value="Valider"/>
                </form>
            </div>
            <div className="createform__message">
                {/* <?=$message, $confirm?> */}
            </div>
        </section>
        </>
    )
}
export default Createform