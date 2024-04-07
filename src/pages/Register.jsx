const Register= () =>{
    return (
         <div className="register">
            <h1 className="register__title">Inscription</h1>
            <div className="register__htmlForm">
                <form>
                    <label htmlFor="lastName">Nom:</label>
                    <input type="text" name="lastName" id="lastname" required="required"/>
                    <label htmlFor="firstName">Prenom:</label>
                    <input type="text" name="firstName" id="firstname" required="required"/>
                    <label htmlFor="pseudo">Pseudo:</label>
                    <input type="text" name="pseudo" id="pseudo"/>
                    <label htmlFor="numberRoad">N° de rue:</label>
                    <input type="number" name="numberRoad" id="number"/>
                    <label htmlFor="address">Adresse:</label>
                    <input type="text" name="address" id="address"/>
                    <label htmlFor="cp">Code postal:</label>
                    <input type="number" name="cp" id="cp"/>
                    <label htmlFor="city">Ville:</label>
                    <input type="text" name="city" id="city"/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required="required"/>
                    <label htmlFor="pwd">Mot de passe:</label>
                    <input type="password" name="pwd" id="pwd" required="required"/>
                    <p className="register__pwd">[minimum 5 caractères dont un Nombre, une Majuscule et un caractère spécial (!@#$%€£)]</p>
                    <input type="hidden" name="token" value="<?=$token?>"/>
                    <div className="buttons">
                        <input className="button" type="submit" name="submit" value="Valider"/>
                    </div>
                </form>
            </div>
            <div className="confirm">
               
            </div>
        </div>
    )
}
export default Register