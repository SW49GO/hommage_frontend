const CreateForm = ()=>{
    return(
        <>
        <section className="createform">
            <h1 className="createform__title">Créer une fiche</h1>
            <div className="createform__form">
                <form method="POST" action="?page=createform" >
                    <label for="lastname">Nom du defunt :</label>
                    <input type="text" name="lastname" id="lastname" required="required"/>
                    <label for="firstname">Prenom du defunt :</label>
                    <input type="text" name="firstname" id="firstname" required="required"/>
                    <label for="birthdate">Date de naissance :</label>
                    <input type="date" name="birthdate" id="birthdate"/>
                    <label for="city_birth">Ville :</label>
                    <input type="text" name="city_birth" id="city_birth"/>
                    <label for="death_date">Date de décès :</label>
                    <input type="date" name="death_date" id="death_date" required="required"/>
                    <label for="cemetery">Nom du cimetière :</label>
                    <input type="text" name="cemetery" id="cemetery"/>
                    <label for="city_death">Ville du cimetière :</label>
                    <input type="text" name="city_death" id="city_death"/>
                    <label for="postal_code">Code Postal du cimetière :</label>
                    <input type="number" name="postal_code" id="postal_code"/>
                    <label>Qui êtes-vous pour le defunt ?</label>
                    <select name="affinity">
                        <option>Affinité</option>
                        <option value="Conjoint">Conjoint</option>
                        <option value="Conjointe">Conjointe</option>
                        <option value="Père">Père</option>
                        <option value="Mère">Mère</option>
                        <option value="Frère">Frère</option>
                        <option value="Soeur">Soeur</option>
                        <option value="Grand-Père">Grand-Père</option>
                        <option value="Grand-Mère">Grand-Mère</option>
                        <option value="Fils">Fils</option>
                        <option value="Fille">Fille</option>
                        <option value="Petit-Fils">Petit fils</option>
                        <option value="Petite-Fille">Petite fille</option>
                        <option value="Beau-Fils">Beau-Fils</option>
                        <option value="Belle-Fille">Belle-Fille</option>
                        <option value="Belle_Mère">Belle_Mère</option>
                        <option value="Beau-père">Beau-père</option>
                        <option value="Nièce">Nièce</option>
                        <option value="Neveu">Neveu</option>
                        <option value="Oncle">Oncle</option>
                        <option value="Tante">Tante</option>
                        <option value="Grand-Oncle">Grand-Oncle</option>
                        <option value="Grand-Tante">Grand-Tante</option>
                        <option value="Cousin">Cousin</option>
                        <option value="Cousine">Cousine</option>
                        <option value="Petit-Ami">Petit-Ami</option>
                        <option value="Petite-Amie">Petite-Amie</option>
                        <option value="Ami">Ami</option>
                        <option value="Amie">Amie</option>
                        <option value="Professeur">Professeur</option>
                        <option value="Elève">Elève</option>
                        <option value="Employeur">Employeur</option>
                        <option value="Collègue">Collègue</option>
                        <option value="Aucune">Aucune</option>
                    </select>
                    <fieldset className="createform__info">
                        <h3>Informations complémentaires</h3>
                        <p>Acceptez-vous de recevoir des cartes de condoléances pour ce defunt ?</p>
                        <label>Cartes par Email :</label> 
                        Oui<input type="radio" name="card_virtuel" value="1"/>
                        Non<input type="radio" name="card_virtuel" value="0"/>
                        <label>Cartes par adresse Postal :</label>
                        Oui<input type="radio" name="card_real" value="1"/>
                        Non<input type="radio" name="card_real" value="0"/>
                        <label>Acceptez-vous de recevoir des bouquets de fleurs pour ce defunt ?</label>
                        Oui<input type="radio" name="flower" value="1"/>
                        Non<input type="radio" name="flower" value="0"/>
                    </fieldset>
                    {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                    <input className="button" type="submit" name="submit" value="Valider"/>
                </form>
            </div>
            <div className="createform__message">
                {/* <?=$message, $confirm?> */}
            </div>
        </section>
        </>
    )
}
export default CreateForm