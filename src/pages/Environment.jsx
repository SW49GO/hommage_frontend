const Environment=()=>{
    return(
        <>
    <section>
        <div className="env">
    // Lien de la fiche d'un défunt
            {/* if (isset($_SESSION['user']['id'])) :?> */}
            <div className="env__link">
                <a className="env__link_img" href="?page=environment&id_def=<?=$defunct_infos['id']?>" title="Lien vers cette fiche">
                    <img className="img dim35" src="public/pictures/site/link-icon.png" alt="icone lien"/>
                </a>
            </div>
        {/* <?php endif ?> */}
            {/* <h2 className="env__title" ><?=$defunct_infos['firstname'].' '.$defunct_infos['lastname'] ?></h2> */}
            <div className="env__date">
                {/* <h4><?=$defunct_infos['birthdate'].' '?></h4> */}
                <img className="img dim40" src="public/pictures/site/cross.png" alt="croix"/>
                {/* <h4><?=' '.$defunct_infos['death_date']?></h4> */}
            </div>
            <hr/>
        {/* <?php  */}
// Dossier de téléchargement des photos du defunt sélectionné
           {/* if (isset($_SESSION['user']['id'])) :?> */}
        <a className="env__folder_link" href="" title="Dossier de stockage des photos">
            <div className="env__folder">
                <img className="img" src="public/pictures/site/folder.png" alt="Dossier de stockage photos"/>
            </div>
            <div>
                {/* <p>Cliquez sur le Dossier pour telecharger les photos de <?=$defunct_infos['firstname'].' '.$defunct_infos['lastname'] ?></p> */}
            </div>
        </a>
        {/* <?php  */}
// Identifiant du créateur de la fiche + ajout icone ami si pas dans la liste de l'utilisateur
            {/* if (isset($defunct_infos['user_id']) && $defunct_infos['user_id'] != $_SESSION['user']['id']) :?> */}
        <div className="env__add_friend">
            <p><u>Gestionnaire de la fiche :</u></p>
            <div className="admin_user">
                {/* <?=$user_admin['admin']['lastname'].' '.$user_admin['admin']['firstname'].' <em>('.$user_admin['admin']['affinity'].')</em>'?> */}
            {/* <?php if ($friendOk == false) :?> */}
                <a className="friend" href="?page=environment&id_def=<?=$id_def?>&friend_add=<?=$defunct_infos['user_id']?>" title="Ajouter aux contacts">
                    <img className="img dim20 friend_add" src="public/pictures/site/friend.png" alt="icone ajouter"/>
                </a>
            </div>
            {/* <?php endif ?> */}
        </div>
        <div className="friend_mess">
            {/* <?=$message?> */}
        </div>               
        {/* <?php endif ?>
    <?php  */}
// Dossier caché contenant toutes les photos du défunt
          {/* endif ?> */}
    </div>
</section>
<section>
    <div  className="env__photos_list hidden">
    {/* <?php if ($defunct_photos) :?> */}
        {/* <?php foreach($defunct_photos as $r): ?> */}
        <div className="env__min_photo">
            <img className="img" src="public/pictures/photos/<?=$r['user_id']?>/<?=$r['name'] ?>" alt="<?=$r['name'] ?>"/>
            <a title="Telecharger" download="image_<?=$r['id']?>.jpg" href="public/pictures/photos/<?=$r['user_id'].'/'.$r['name'] ?>"><img className="img dim20" src="public/pictures/site/download.png" alt="icone téléchargement"></a>
        </div>
        {/* <?php endforeach ?>
    <?php else :?> */}
            {/* <p><i className="fas fa-ban"></i>&nbsp;Aucune photos de <?=$defunct_infos['firstname'].' '.$defunct_infos['lastname'].' ' ?><i className="fas fa-ban"></i></p>
    <?php endif ?> */}
    </div>
    <hr/>
</section>
<section>
    {/* <?php  */}
// Nombre de commentaires et photos depuis la dernière connexion
          {/* if (isset($_SESSION['user']['id']) && $defunct_infos['user_id'] == $_SESSION['user']['id']) : ?> */}
    <div className="env__listing">
        <p className="new_comments">Depuis votre dernière connexion :</p>
        {/* <p className="new_photos">Photos ajoutées: <span><?=$recentPhoto?></span></p>
        <p className="new_comments">Commentaires ajoutés: <span><?=$recentComment?></span></p> */}
    </div>
    <hr/>
    {/* <?php endif ?>
    <?php */}
// Ajouter une photo dans l'environnement utilisateur
          {/* if (isset($_SESSION['user']['id'])) : ?> */}
    <div>
        {/* <?=$messFile?> */}
    </div>
    <form method="POST" action="?page=environment&id=<?=$id_def?>" enctype="multipart/form-data" id="form_env">
        <label for="file_env"></label>
        <input type="file" name="file_env" id="file_env" accept=".jpg, .jpeg, .png"/>
        <div className="env__add_photo">
            <label>Ajouter une photo (2Mo max) ->&emsp;</label>
            <img className="img dim60" src="public/pictures/site/photo-icon.png" alt="appareil photo"/>
        </div>
        {/* <input type="hidden" name="token" value="<?=$token?>"> */}
    </form>
    {/* <?php endif ?> */}
    <div className="env__container">
    {/* <?php  */}
// Liste des nouvelles photos depuis la dernière connexion
           {/* foreach($defunct_photos as $r): ?> */}
        <div className="env__container_photos">
        {/* <?php if (isset($_SESSION['user']['last_log']) && isset($r['date_crea']) && $_SESSION['user']['last_log'] < $r['date_crea']): ?> */}
            <div className="container_lastP hidden" >
                <div className="last_photos">
                    <a href="#<?=$r['id']?>">
                        <img className="img" src="public/pictures/photos/<?=$r['user_id']?>/<?=$r['name']?>" alt="<?=$r['name']?>"/>
                    </a>
                </div>
            </div>
        {/* <?php endif ?>
        <?php */}
//Supprimer une photo dont on est l'auteur
              {/* if (isset($_SESSION['user']['id']) && isset($r['user_id']) && $_SESSION['user']['id'] == $r['user_id']): ?> */}
            <a className="env__delete_photo" href="?page=environment&idPhoto=<?=$r['id']?>&id=<?=$id_def?>" title="Supprimer">
                <img className="dim20" src="public/pictures/site/delete-icon.png" alt="Supprimer"/>
            </a>
        {/* <?php endif ?> */}
            <div id="<?=$r['id']?>">
        {/* <?php */}
// Affichage des photos 
              {/* if (!isset($_SESSION['user']['id'])) :?> */}
                <img className="img env__blur_photo" src="public/pictures/photos/<?=$r['user_id'].'/'.$r['name']?>" alt="<?=$r['name']?>"/>
            {/* <?php else :?> */}
                <img className="img" src="public/pictures/photos/<?=$r['user_id'].'/'.$r['name']?>" alt="<?=$r['name']?>">
        {/* <?php endif ?> */}
            </div>
            <div className="env__comment">
        {/* <?php  */}
// Liste des commentaires de la photo + profil miniature des auteurs du commentaire
               {/* foreach($com_list[$r['id']] as $comment): ?> */}
                <div className="comment_post">
            {/* <?php if (!isset($_SESSION['user']['id'])) :?> */}
                    <div className="container_com_user env__blur_comment">
            {/* <?php else :?> */}
                    <div className="container_com_user">
            {/* <?php endif ?> */}
                    <div className="env__profil">
            {/* <?php if (file_exists('public/pictures/users/'.$comment['user_id'].'/'.$comment['profil_user'])) : ?> */}
                        <img className="img" src="public/pictures/users/<?=$comment['user_id'].'/'.$comment['profil_user']?>" alt="photo de profil"/>
            {/* <?php else : ?> */}
                        <img className="img" src="public/pictures/site/noone.jpg" alt="photo de profil"/>
            {/* <?php endif ?> */}
                    </div>
                    {/* <?=$comment['comment']?>
            <?php  */}
// Supprimer un commentaire dont on est à l'origine                                 
                  {/* if (isset($_SESSION['user']['id']) && $_SESSION['user']['id'] == $comment['user_id']): ?> */}
                        <div className="icon_delete">
                            <a className ="env_user_name" href="?page=environment&id=<?=$id_def?>&idCom=<?=$comment['id']?>" title="Supprimer"><i className="fas fa-trash-alt"></i>
                            </a>
                        </div>
            {/* <?php endif ?>
            <?php */}
// Affichage d'un bandeau "New" pour les nouveaux commentaires
                   {/* if ((isset($_SESSION['user']['last_log']) && isset($comment['date_crea']) && $_SESSION['user']['last_log'] < $comment['date_crea']) && (isset($_SESSION['user']['id']) && isset($comment['user_id']) && $_SESSION['user']['id'] !== $comment['user_id'])): ?> */}
                        <div className="new_comment">
                            <img className="img" src="public/pictures/site/new.png" alt="Bandeau nouveau commentaire"/>
                        </div>
            {/* <?php endif ?> */}
                    </div>
                    </div>
        {/* <?php endforeach ?> */}
                </div>
        {/* <?php */}
// Formulaire ajout de commentaire
              {/* if (isset($_SESSION['user']['id'])) : ?> */}
                <form className="env__comment_form">
                    <input type="text" name="comment" className="env__comment_txt">
                    <label for="comment">Commenter</label>
                    <input type="hidden" name="id_def" className="id_def" value="<?=$id_def?>">/
                    <input type="hidden" name="photo_id" className="photo_id" value="<?=$r['id']?>"/>
                    <input type="hidden" name="user_id" className="user_id" value="<?=$_SESSION['user']['id']?>"/>
                </form>
        {/* <?php endif ?> */}
            </div>
    {/* <?php endforeach ?> */}
        </div>
    {/* <?php if (!isset($_SESSION['user']['id'])) :?> */}
        <div className="env__no_user">
            <h2 className="env_title">Pour visualiser cette fiche, vous devez être inscrit ou connecté.</h2>
            <a className="button" href="?page=registration">S'inscrire</a>
            <a className="button" href="?page=connexion">Connexion</a>
        </div>
    {/* <?php endif ?> */}
    </div>
</section>
    )
}

export default Environment