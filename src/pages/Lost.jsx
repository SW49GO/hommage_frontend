import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { verifyAccount,changePass } from "../services/api"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToken, setId } from "../features/store"
import { selectUserId } from "../features/selector"

const Lost = ()=>{
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit}= useForm()
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    const [badEmail, setBadEmail] = useState(false)
    const [badPass, setBadPass] = useState(false)
    const [codeOpen, setCodeOpen] = useState(false)
    const [passOpen, setPassOpen] = useState(false)
    const id = useSelector(selectUserId)

    const handleEmail=async(data)=>{
        const res = await verifyAccount(data,'verifyEmail')
        if(res.result.length>0){ 
            dispatch(setId(res.result[0].id))
            dispatch(setToken(res.result[0].password))
            setCodeOpen(true)
              setBadEmail(false)
        }else{
            setBadEmail(true)
        }
    }
    const handleCode=(data)=>{
        if(parseInt(data.code)===code){
            setPassOpen(true)
            setCodeOpen(false)
        }
    }
    const handlePassword=async (data)=>{
        if(data.new_password===data.pass_again){
            setBadPass(false)
                const newPass={id:id, password:data.new_password}
                await changePass(newPass,'changePass').then(()=>{
                navigate('/connexion')
                })
        }else{
            setBadPass(true)
        }
    }

    return (
    <div className="lost">
        <h1 className="lost__title">Réinitialisation du mot de passe</h1>
        <div className="lost__form">
            <form onSubmit={handleSubmit(handleEmail)}>
                <div className="lost_email">
                    <label htmlFor="email_user">Entrez votre Email pour recevoir un code de réinitialisation :</label>
                    <input type="email" name="email" id="email_user" placeholder="votre@email.ici" required {...register('email')}/>
                    <label htmlFor="subemail"></label>
                    <input className="button" type="submit" name="subemail" id="subemail" value="Envoyer"/>
                </div>
            </form>
            {badEmail && <p className="message">Vous n'êtes pas identifié sur le site !</p>}
            {codeOpen &&
            <form onSubmit={handleSubmit(handleCode)}>
                <div className="lost_code">
                    <p className="message">Vous êtes bien identifié sur le site :</p>
                    <h4>Votre code d'accès est : {code}</h4>
                    <label htmlFor="code">Entrer le code réçu par email</label>
                    <input type="text" name="code" id="code" required {...register('code')}/>
                    <label htmlFor="subcode"></label>
                    <input className="button" type="submit" name="subcode" id="subcode" value="Valider"/>
                    <label htmlFor="cancel"></label>
                    <input className="button" type="submit" name="cancel" id="cancel" value="Annuler"/>
                </div> 
            </form> 
            }
            {passOpen &&
            <form onSubmit={handleSubmit(handlePassword)}>
                <label htmlFor="new_password">Entrez votre nouveau mot de passe :</label>
                <p>[minimum 5 caractères dont un Nombre, une Majuscule et un caractère spécial (!@#$%€£)]</p>
                <input type="password" name="new_password" id="new_password" placeholder="Nouveau mot de passe" required {...register('new_password')}/>
                <label htmlFor="pass_again"></label>
                <input type="password" name="pass_again" id="pass_again" placeholder="Confirmer" required {...register('pass_again')}/>
                <label htmlFor="subpass"></label>
                <input className="button" type="submit" name="subpass" id="subpass"/>
            </form>}
            {badPass && <p className="message">Les mots de passe ne sont pas identiques !</p>}
            <hr/>
            <Link className="button button-a" to={'/register'}>Inscription</Link>
            <Link className="button button-a"to={'/home'}>Accueil</Link>
        </div>
    </div>
    )
}

export default Lost