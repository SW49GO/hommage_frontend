const ModifyDef=()=>{
    return(
        <>
        <section>
            <div class="modifydef">
                <h1>Informations sur :</h1>
                {/* <h3><?=$info_def['lastname'].' '.$info_def['firstname']?></h3>
                <h3><?=$confirm?></h3> */}
                <form id="modifydefhtmlForm" method="POST" action="?page=modifydef&id_def=<?=$info_def['id']?>" enctype="multipart/htmlForm-data">
                    <div class="modifydef__htmlForm">
                    {/* <?php if (file_exists($profil)) :?> */}
                        <img class="img dim200" src="<?=$profil?>?<?=rand()?>" alt="photo de profil"/>
                    {/* <?php else :?> */}
                        <img class="img dim200" src="public/pictures/site/noone.jpg" alt="photo de profil"/>
                    {/* <?php endif ?> */}
                        {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                        <label htmlFor="modify__photo">Photo de Profil</label>
                        <input type="file" id="modify__photo" name="photodef" accept=".jpg, .jpeg, .png"/>
                        <img class="img dim40 user_icon_def" src="public/pictures/site/camera-icon.png" alt="icone home utilisateur"/>
                    </div>
                </form>
                <form method="POST" action="?page=modifydef&id_def=<?=$info_def['id']?>">
                    <label htmlFor="modify_lastname">Nom :</label>
                    <input type="text" id="modify_lastname" name="modify_lastname" value="<?=$info_def['lastname']?>"/>
                    <label htmlFor="modify_firstname">Prenom :</label>
                    <input type="text" id="modify_firstname" name="modify_firstname" value="<?=$info_def['firstname']?>"/>
                    <label htmlFor="modify_birthdate">Date de naissance :</label>
                    <input type="date" id="modify_birthdate" name="modify_birthdate" value="<?=$info_def['birthdate']?>"/>
                    <label htmlFor="modify_citybirth">Ville de naissance :</label>
                    <input type="text" id="modify_citybirth" name="modify_citybirth" value="<?=$info_def['city_birth']?>"/>
                    <label htmlFor="modify_death_date">Date de décès :</label>
                    <input type="date" id="modify_death_date" name="modify_death_date" value="<?=$info_def['death_date']?>"/>
                    <label htmlFor="modify_citydeath">Ville de décès :</label>
                    <input type="text" id="modify_citydeath" name="modify_citydeath" value="<?=$info_def['city_death']?>"/>
                    <label htmlFor="modify_cemetery">Cimetière :</label>
                    <input type="text" id="modify_cemetery" name="modify_cemetery" value="<?=$info_def['cemetery']?>"/>
                    <label htmlFor="modify_postalcode">Code postal du cimetière :</label>
                    <input type="number" id="modify_postalcode" name="modify_postalcode" value="<?=$info_def['postal_code']?>"/>
                    <p class="message">Modifier les champs que vous souhaitez mettre à jour</p>
                    {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                    <input class="button" type="submit" name="submitmodif" value="Modifier"/>
                </form>
            </div>
        </section>
    </>
    )
}

export default ModifyDef