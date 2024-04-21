import { useForm } from "react-hook-form"
import { useUpperCaseFistLetter } from "../hooks/upperCaseFirstLetter"
import { signIn } from "../services/api"
import {Link} from 'react-router-dom'
import { useState } from "react"

const Register= () =>{
    const {register, handleSubmit} =useForm()
    const upperCaseFirstLetter = useUpperCaseFistLetter
    const [isOpen, setIsOpen] = useState(false)
    console.log('isOpen:', isOpen)
    const dataForm = async (data) =>{
            await signIn(data)
            setIsOpen(true)
    }

    return (<>
         <div className="register" style={isOpen ? { filter: 'blur(0.513rem)' } : {}}>
            <h1 className="register__title">Inscription</h1>
            <div className="register__htmlForm">
                <form onSubmit={handleSubmit(dataForm)}>
                    <label htmlFor="lastname">Nom:</label>
                    <input type="text" name="lastname" id="lastname" required {...register('lastname', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="firstname">Prenom:</label>
                    <input type="text" name="firstname" id="firstname" required {...register('firstname', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="pseudo">Pseudo:</label>
                    <input type="text" name="pseudo" id="pseudo" {...register('pseudo', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="number_road">N° de rue:</label>
                    <input type="number" name="number_road" id="number" {...register('number_road', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="address">Adresse:</label>
                    <input type="text" name="address" id="address" {...register('address', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="postal_code">Code postal:</label>
                    <input type="number" name="postal_code" id="postal_code" {...register('postal_code', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="city">Ville:</label>
                    <input type="text" name="city" id="city" {...register('city', {setValueAs: (value)=>upperCaseFirstLetter(value)})}/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required {...register('email')}/>
                    <label htmlFor="pwd">Mot de passe:</label>
                    <input type="password" name="password" id="pwd" required {...register('password')}/>
                    <p className="register__pwd">[minimum 5 caractères dont un Nombre, une Majuscule et un caractère spécial (!@#$%€£)]</p>
                    <div className="buttons">
                        <input className="button" type="submit" value="Valider"/>
                    </div>
                </form>
            </div>
        </div> 
        {isOpen && 
            <div className="confirm">
                <div className="confirm__signIn">
                    <p>Inscription validée !</p>
                    <Link className="button button-a" to={'/connexion'}>Se Connecter</Link>
                </div>
            </div>}
            </>
    )
}
export default Register