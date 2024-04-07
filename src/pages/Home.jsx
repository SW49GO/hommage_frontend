import { selectAuth } from "../features/selector"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { setFiles, signIn, verifyAccount} from "../services/api"
import {useForm} from 'react-hook-form'
import { setToken, setId, setAuth } from "../features/store"


const Home = () =>{
    const dispatch = useDispatch()
    const {handleSubmit,register} = useForm()
    const [image, setImage] = useState('')
    const auth = useSelector(selectAuth)
    
      const saveFile = () => {
        setFiles(1,2,'def',image)
      }
      const dataForm = async(data) =>{
        const result = await signIn(data)
        if(result){
            dispatch(setId(result.result))
        }
      }

      const account = async(data) =>{
        const result = await verifyAccount(data)
        dispatch(setToken(result.token))
        dispatch(setId(result.userId))
        dispatch(setAuth(true))
      }

    return (
    <div className="home">
        <h1>Faites perdurer la mémoire de vos proches en partageant tout vos souvenirs</h1>
        {/* <div>
            <input type="file" name="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            <button onClick={saveFile}>Charger</button>
        </div> */}
        {/* <form onSubmit={handleSubmit(dataForm)}>
            <label htmlFor="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstame" required {...register('firstname')}/>
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname" required {...register('lastname')}/>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" required {...register('pseudo')}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required {...register('email')}/>
            <label htmlFor="password">Mot de passe</label>
            <input type="txt" id="password" name="password" required {...register('password')}/>
            <label htmlFor="number_road">N°</label>
            <input type="number" id="number_road" name="number_road" required {...register('number_road')}/>
            <label htmlFor="address">Adresse</label>
            <input type="txt" id="address" name="address" required {...register('address')}/>
            <label htmlFor="city">Ville</label>
            <input type="txt" id="city" name="city" required {...register('city')}/>
            <label htmlFor="postal_code">Code Postal</label>
            <input type="number" id="postal_code" name="postal_code" required {...register('postal_code')}/>
            <button >S'inscrire</button>
        </form> */}
        {/* <form onSubmit={handleSubmit(account)}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required {...register('email')}/>
            <label htmlFor="password">Mot de passe</label>
            <input type="txt" id="password" name="password" required {...register('password')}/>
            <button >Se connecter</button>
        </form> */}
        <section className="home__intro">
            <h4>En toute simplicité</h4>
            <article className="home__article">
                <h5>Avec tout votre entourage</h5>
                <p>Suite à un décès, vous cherchez un endroit pour rassembler tout vos souvenirs et rendre hommage à un défunt qui vous est cher. Pouvoir partager avec votre entourage...    Vous êtes au bon endroit.</p>
            </article>
            <hr/>
        </section>

        <section>
            <h2 className="home__title">Un espace membre qui vous permet de partager vos photos</h2>
            <div className="home__container">
                <div className="home__container_photo">
                    <div className="home__photo">
                        <img className="img" src="./assets/site/home-photo.jpg" alt="tas de photos"/>
                    </div>
                    <div className="home__text">
                        <p>Vous pouvez télécharger et mettre en ligne vos plus belles photos, en créant une fiche de la personne aimé. Un dossier est à votre disposition pour visualiser l'ensemble de toutes les photos déposées par les personnes ayant un lien de près ou de loin avec le defunt.</p> 
                    </div>
                </div>
                <div className="home__button">
                    {!auth ? (<Link className="button button-a" to={'/register'}>S'inscrire</Link>)
                          :(<Link className="button button-a" to={'/homeUser'} title="Espace membre">Espace Membre</Link>)
                    }
                </div>
            </div>
            <hr/>
        </section>

        <section>
            <h2 className="home__title">Laisser une trace de vos écrits</h2>
            <div className="home__container">
                <div className="home__container_photo">
                    <div className="home__text">
                        <p>Vous pouvez commenter chacune de vos photos et les partagez avec votre famille, vos amis etc... Vous pouvez aussi laisser un commentaire sur la fiche d'une autre personne qui aurait été crée par quelqu'un d'autre que vous.</p> 
                    </div>
                    <div className="home__photo">
                        <img className="img" src="./assets/site/home-comment.jpg" alt="un stylo"/>
                    </div>
                </div>
                <div className="home__button">
                    {auth && (<Link className="button button-a" to={'/register'}>S'inscrire</Link>)}
                </div>
            </div>
            <hr/>
        </section>

        <section>
            <h2 className="home__title">Envoyer une carte de condoléance</h2>
            <div className="home__container">
                <div className="home__container_photo">
                    <div className="home__photo">
                        <img className="img" src="./assets/site/home-card.jpg" alt="carte condoleance"/>
                    </div>
                    <div className="home__text">
                        <p>Nous vous proposons un service d'envoi de cartes de condoléances à choisir parmis une large gamme. Vous pouvez commandez nos cartes, vous les faire livrer ou bien vous pouvez directement remplir la carte via le site et la faire livrer par nos soins à la personne souhaitée.</p> 
                    </div>
                </div>
                <div className="home__button">
                    <Link className="button button-a" to={'/cards'}>Nos cartes</Link>
                </div>
            </div>
            <hr/>
        </section>

        <section>
            <h2 className="home__title">Envoyer un bouquet</h2>
            <div className="home__container">
                <div className="home__container_photo">
                    <div className="home__text">
                        <p>Nos bouquets de fleurs frâiches peuvent être déposé par nos soins sur la tombe de la personne aimé. Vous pouvez aussi choisir de les faire livrer directement à la personne ayant crée la fiche du defunt, si cette dernière à choisi l'option correspondante.</p> 
                    </div>
                    <div className="home__photo">
                        <img className="img" src="./assets/site/home-flower.jpg" alt="carte condoleance"/>
                    </div>
                </div>
                <div className="home__button">
                    <Link className="button button-a" to={'/flowers'}>Nos bouquets</Link>
                </div>
            </div>
            <hr/>
        </section>

        <section>
            <div className="home__explain">
                <p className="home__explain-p">Aujourd'hui, la technologie nous permet de stocker toutes nos photos , mais bien souvent, notre entourage, famille et amis sont répartis dans tout le pays et même dans le monde. Les hommages en ligne sont un moyen idéal pour stocker et partager ces souvenirs en un seul endroit, en rassemblant tout le monde dans une commémoration collaborative. Plutôt que d'enregistrer les images dans un cloud personnel que vous seul pouvez voir, les hommages en ligne vous permettent, à vous et à votre famille, de collecter vos souvenirs préférés, de partager des histoires et de donner à votre être cher un héritage digne et immortel pour les générations à venir.</p>
                <hr/>
                <div className="home__input">
                    <h2 className="home__title">Créer un hommage</h2>
                    <label>Nom</label>
                    <input type="text" placeholder="Entrez le nom" readOnly/>
                    <label>Prenom</label>
                    <input type="text" placeholder="Entrez le prenom" readOnly/>
                    <label>*pour créer un hommage vous devez d'abord créer votre propre compte</label>
                    <Link className="button button-a" to={'/register'}>Créer un compte</Link>
                </div>
            </div>
            <hr/>
        </section>
    </div>
    )
}

export default Home