import { Link } from "react-router-dom"

const Lost = ()=>{
    return (
        <div className="lost">
        <h1 className="lost__title">Réinitialisation du mot de passe</h1>
        <div className="lost__form">
            <form method="POST" action="?page=lost">
                <div className="<?=$_SESSION['lost_email']?>">
                {/* <?php if (!isset($_SESSION['user']['id_tmp'])):?>
                    <?=$message_email?> */}
                    <label for="email_user">Entrez votre Email pour recevoir un code de réinitialisation :</label>
                    <input type="email" name="email" id="email_user" placeholder="votre@email.ici" required="required"/>
                    <label for="subemail"></label>
                    {/* <input type="hidden" name="token" value="<?=$token?>"/> */}
                    <input className="button" type="submit" name="subemail" id="subemail" value="Envoyer"/>
                {/* <?php else :?> */}
                    <label for="email_user"></label>
                    <input type="email" name="email" id="email_user" placeholder="<?=$_SESSION['user']['email']?>" readonly/>
                    <label for="subemail"></label>
                    <input className="button" type="submit" name="subemail" id="subemail" value="Envoyer"/>
                </div>
                <div className="<?=$_SESSION['lost_code']?>">
                        {/* <?php if (isset($_SESSION['user']['identify'])): ?> */}
                    {/* <p className="message"><?=$_SESSION['user']['email']?> est bien identifié sur le site :</p> */}
                    {/* <h4>Votre code d'accès est : <?=$_SESSION['code']?></h4> */}
                    <label for="code">Entrer le code réçu par email</label>
                    <input type="number" name="code" id="code"/>
                    <label for="subcode"></label>
                    <input className="button" type="submit" name="subcode" id="subcode" value="Valider"/>
                    <label for="cancel"></label>
                    <input className="button" type="submit" name="cancel" id="cancel" value="Annuler"/>
                        {/* <?php endif ?> */}
                </div> 
                    {/* <?=$message?>
                        <?php if (isset($_SESSION['verif_code'])) :?> */}
                <label for="new_password">Entrez votre nouveau mot de passe :</label>
                <p>[minimum 5 caractères dont un Nombre, une Majuscule et un caractère spécial (!@#$%€£)]</p>
                {/* <?=$passMess?> */}
                <input type="password" name="new_password" id="new_password" placeholder="Nouveau mot de passe" required="required"/>
                <label for="pass_again"></label>
                <input type="password" name="pass_again" id="pass_again" placeholder="Confirmer" required="required"/>
                <label for="subpass"></label>
                <input className="button" type="submit" name="subpass" id="subpass"/>
                        {/* <?php endif ?>
                <?php endif ?> */}
            </form>
            <hr/>
            <Link className="button button-a" to={'/register'}>Inscription</Link>
            {/* <Link className="button button-a" href="?page=home&lost=true">Accueil</Link> */}
            <Link className="button button-a"to={'/home'}>Accueil</Link>
        </div>
    </div>
    )
}

export default Lost