import React, { useRef, useState } from 'react'
import {useForm} from 'react-hook-form'
import { selectDefunct,  selectUserId, selectToken, selectIdDef} from '../features/selector'
import {useSelector} from 'react-redux'
import { setFormatDate } from '../services/formatData'
import { setFiles, updatePhoto } from '../services/api'
import Error from '../pages/Error'
import { updater } from '../services/api'
import { useUpperCaseFistLetter } from '../hooks/upperCaseFirstLetter'
import {useNavigate} from 'react-router-dom'
import { deleter } from '../services/api'

const ModifyDef=()=>{
    const navigate = useNavigate()
    const upperCaseFirstLetter= useUpperCaseFistLetter
    const token = useSelector(selectToken)
    const id = useSelector(selectUserId)
    const {register, handleSubmit} = useForm()
    const fileInputRef = useRef(null)
    const infosDefunct = useSelector(selectDefunct)
    const idDef = useSelector(selectIdDef)

    // State to refresh navigator, useEffect can't used because name of image be always the same
    const [cacheBuster, setCacheBuster] = useState(0)
    /**
     * Function to manage click to change defunct photo profil
     */
    const handleClick = () => {
        fileInputRef.current.click()
        }
    /**
     * Function to change defunct photo profil
     * @param {event} e 
     */
    const handleFileDef = (e) => {
        async function saveFile (){
            const pathName = await setFiles(id, idDef ,'defProfil', token, e.target.files[0])
            if(pathName){
               const modifPhotoStore = {...infosDefunct, photo: pathName}
                async function savePhoto (modifPhoto){
                    await updatePhoto(id, idDef,  modifPhoto, token,'updateDefPhoto')
                }
                savePhoto(modifPhotoStore)
                // To indicate the image has been change
                setCacheBuster(prev => prev + 1)
            }
        }
        saveFile()
    }
    /**
     * Function to update infos defunct
     * @param {object} data 
     */
    const setFormDefunct =(data)=>{
        async function updateDefInfos(data){
            if(data.birthdate==='aN-aN-NaN'){
                data.birthdate = infosDefunct.birthdate
            }
            if (data.death_date==='aN-aN-NaN'){
                data.death_date=infosDefunct.death_date
            }
            data.id=idDef
            await updater(id, token, data, 'updateInfosDefunct')
        }
        updateDefInfos(data)
        navigate('/homeUser')
    }
    async function deleteDef(idDef){
        console.log('deleter')
        if(idDef){
            await deleter(id,idDef,token,'deleteOneDefunct')
        }

    }

    if(infosDefunct){
    return(
        <>
        <section>
            <div className="modifydef">
                <h1>Informations sur :</h1>
                <h3>{infosDefunct.lastname} {infosDefunct.firstname}</h3>
                <form id="modifydef" encType="multipart/form-data">
                    <div className="modifydef__form">
                        {infosDefunct ?
                            <img className="img dim200" src={`http://localhost:3000/${infosDefunct.photo}?cache=${cacheBuster}`} alt="profil"/>:<img className="img dim200" src="./assets/site/noone.jpg" alt="profil"/>
                        }
  
                        <label htmlFor="modify__photo">Photo de Profil</label>
                        <input type="file" ref={fileInputRef} id="modify__photo" name="file" onChange={handleFileDef}/>
                        <img className="img dim40 user_icon_def" src="./assets/site/camera-icon.png" alt="icone home utilisateur" onClick={handleClick}/>
                    </div>
                </form>
                <form onSubmit={handleSubmit(setFormDefunct)}>
                    <label htmlFor="modify_lastname">Nom :</label>
                    <input type="text" id="modify_lastname" name="lastname" defaultValue={infosDefunct.lastname} placeholder={infosDefunct.lastname} {...register('lastname', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    <label htmlFor="modify_firstname">Prenom :</label>
                    <input type="text" id="modify_firstname" name="firstname" defaultValue={infosDefunct.firstname} placeholder={infosDefunct.firstname} {...register('firstname', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    <label htmlFor="modify_birthdate">Date de naissance : {infosDefunct.birthdate}</label>
                    <input type="date" id="modify_birthdate" name="birthdate"  {...register('birthdate',{setValueAs: (value) => setFormatDate(value)})}/>
                    <label htmlFor="modify_citybirth">Ville de naissance :</label>
                    <input type="text" id="modify_citybirth" name="city_birth" defaultValue={infosDefunct.city_birth} placeholder={infosDefunct.city_birth}  {...register('city_birth', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    <label htmlFor="modify_death_date">Date de décès : {infosDefunct.birthdate}</label>
                    <input type="date" id="modify_death_date" name="death_date"  {...register('death_date',{setValueAs: (value) => setFormatDate(value)})}/>
                    <label htmlFor="modify_citydeath">Ville de décès :</label>
                    <input type="text" id="modify_citydeath" name="city_death" defaultValue={infosDefunct.city_death} placeholder={infosDefunct.city_death} {...register('city_death', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    <label htmlFor="modify_cemetery">Cimetière :</label>
                    <input type="text" id="modify_cemetery" name="cemetery" defaultValue={infosDefunct.cemetery} placeholder={infosDefunct.cemetery} {...register('cemetery', {setValueAs: (value)=> upperCaseFirstLetter(value)})}/>
                    <label htmlFor="modify_postalcode">Code postal du cimetière :</label>
                    <input type="number" id="modify_postalcode" name="postal_code"  defaultValue={infosDefunct.postal_code} placeholder={infosDefunct.postal_code} {...register('postal_code')}/>
                    <p className="message">Modifier les champs que vous souhaitez mettre à jour</p>
                    <input className="button" type="submit" name="submitmodif" value="Modifier"/>
                </form>
                <button className="button button-a" onClick={()=>{deleteDef(idDef)}}>Supprimer cette fiche</button>
                <button className="button button-a">Transférer cette fiche</button>
            </div>
        </section>
    </>
    )
    }else{
        return(
            <><Error/></>
        )
    }
}

export default ModifyDef