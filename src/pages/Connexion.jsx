import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { verifyAccount } from "../services/api"
import { setAdminInfos, setAuth, setId, setToken, setUserInfos } from "../features/store"
import { getInfos } from "../services/api"
import { selectToken, selectUserId } from "../features/selector"
import { useQuery, useQueryClient } from 'react-query'

const Connexion = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(selectUserId)
    const token = useSelector(selectToken)
    const queryClient = useQueryClient()

    const [message,setMessage]=useState(false)
    const [connect, setConnect] = useState(false)
    console.log('connect:', connect)

    const { isError} = useQuery('infoUser', () => getInfos(id, token,0, 'getUserData'),
                { enable : connect,
                    retry:1,
                    onSuccess: (data) => {if (data!=='Missing data') {
                        dispatch(setUserInfos(data.userData[0]))
                        const adminInfos = data.userData.filter((item, index) => index !== 0)
                        dispatch(setAdminInfos(adminInfos))
                    }}
                })
    const {handleSubmit,register} = useForm()
    const account = async(data) =>{
        const result = await verifyAccount(data)
        if(!result.message){
            dispatch(setToken(result.token))
            dispatch(setId(result.userId))
            dispatch(setAuth(true))
            setConnect(true)
            queryClient.invalidateQueries('infoUser')
            navigate('/homeUser')
        }else{
            setMessage(true)
        }
      }
if(!isError){
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
}
export default Connexion