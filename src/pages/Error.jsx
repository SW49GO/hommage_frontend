import { Link } from "react-router-dom"

const Error=({message})=>{
    console.log('message:', message)
    return (
        <>
        {message==='Vous devez être identifié pour utiliser cette fonctionnalité' && <>
            <p>{ message }</p> 
            <Link className="button button-a" to={'/connexion'}>Se connecter</Link>
            <Link className="button button-a" to={'/register'}>S'inscrire</Link>
        </>}
        {message==='Erreur 404' && <>
            <p>{ message }, un erreur réseau est survenu</p> 
        </>}
        </>
    )
}
export default Error