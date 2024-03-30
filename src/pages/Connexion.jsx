import { Link } from "react-router-dom"

const Connexion = ()=>{
    return (
        <div className="connexion">
            {/* <p className="message"><?=$errorMsg?></p> */}
            {/* <?=$message?> */}
            <h1 className="connexion__title">Connexion</h1>
            <div className="connexion__form">
                <form method="POST" action="?page=home_user">
                    <label for="email_user">Votre email</label>
                    <input type="email" id="email_user" name="email" required="required"/>
                    <label for="pwd_user">Votre mot de passe</label>
                    <input type="password" id="pwd_user" name="pwd" required="required"/>
                    <div className="connexion__buttons">
                        <input className="button" type="submit" name="submit" value="Valider"/>
                        {/* <?php if (!isset($_GET['mess'])) :?> */}
                        <Link className="button button-a" to="/lost">Mot de passe oublié</Link>
                        {/* <?php endif ?> */}
                        <Link className="button button-a" to="/register">S'inscrire</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Connexion