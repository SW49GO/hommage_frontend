import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { verifyAccount } from "../services/api"
import { setAuth, setId, setToken } from "../features/store"

const Connexion = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [message,setMessage]=useState(false)
    console.log('message:', message)
 

    const {handleSubmit,register} = useForm()
    const account = async(data) =>{
        const result = await verifyAccount(data)
        console.log('result:', result)
        if(!result.message){
            dispatch(setToken(result.token))
            dispatch(setId(result.userId))
            dispatch(setAuth(true))
            navigate('/homeUser')
        }else{
            setMessage(true)
        }
      }

    return (
        <div className="connexion">
            {message ? <p className="message">Identifiants Incorrect</p>:''}
            <h1 className="connexion__title">Connexion</h1>
            <div className="connexion__form">
                <form onSubmit={handleSubmit(account)}>
                    <label htmlFor="email_user">Votre email</label>
                    <input type="email" id="email" name="email" required {...register('email')}/>
                    <label htmlFor="pwd_user">Votre mot de passe</label>
                    <input type="password" id="pwd_user" name="password" required {...register('password')}/>
                    <div className="connexion__buttons">
                        <button className="button" type="submit">Valider</button>
                        <Link className="button button-a" to="/lost">Mot de passe oublié</Link>
                        <Link className="button button-a" to="/register">S'inscrire</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Connexion