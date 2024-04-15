/* eslint-disable react-hooks/exhaustive-deps */
import { selectAdminInfos, selectDefunct, selectDefunctsList, selectIdDef, selectToken, selectUserId, selectUserInfos,selectNewAdmin, selectListFriends } from "../features/selector"
import { getInfos } from "../services/api"
import { useQuery, useQueryClient } from 'react-query'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom"
import React,{ useState, useRef,useEffect } from "react"
import { FaArrowRight } from "react-icons/fa"
import { setFiles,setRegister } from "../services/api"
import { setInfosAdmin } from "../features/store"


const Environment=()=>{
    const dispatch=useDispatch()
    const queryClient= useQueryClient()
    const fileInputRef = useRef(null)
    const [cacheBuster, setCacheBuster] = useState(0)
    const id = useSelector(selectUserId)
    const token = useSelector(selectToken)
    const defunctSelected = useSelector(selectDefunct)
    const infosUser = useSelector(selectUserInfos)
    const defunctsList = useSelector(selectDefunctsList)
    const idDef = useSelector(selectIdDef) 
    const defunct = defunctsList.filter((item)=>(item.id===idDef))
    const adminInfos = useSelector(selectAdminInfos)
    const otherAdmin = useSelector(selectNewAdmin)
    const isAdmin = defunct.length>0 && adminInfos.some((item)=>(item.defunct_id===idDef))
    const listFriends = useSelector(selectListFriends)
    console.log('listFriends:', listFriends)
    const [isFriend, setIsFriend] = useState(false)

    // Retrieve all photos from a defunct
    const {data:listPhotosDef}= useQuery('photosDef', () =>getInfos(id, token, idDef, 'photoListDefunct'))

    useEffect(() => {
        if (!isAdmin) {
            async function otherAdminInfos(){
                const result = await getInfos(id ,token, idDef ,'getUserAdminInfo')
                if(result){
                    const newAdminInfos={firstname:result.admin.firstname, lastname:result.admin.lastname}
                    dispatch(setInfosAdmin(newAdminInfos))
                    // Verify if otherAdmin is in the list of Friends for icone
                    if (result.admin.id===listFriends.friend_id){
                        setIsFriend(true)
                    }
                }
            }
            otherAdminInfos()
        }
    }, [isAdmin])

    const [isOpen, setIsOpen] = useState(false)
    const toggleFolder = () => setIsOpen(!isOpen)
    const handleImageClick = () => {
        fileInputRef.current.click()
        }
    const handleFileChange = (e) => {
        async function saveFile (){
            const pathName = await setFiles(id, idDef ,'def', token, e.target.files[0])
            if(pathName){
                // To indicate the image has been change
                setCacheBuster(prev => prev + 1)
                const data={name:pathName, defunct_id:idDef, user_id:id}
                const idRegister = await setRegister(id, token, data, 'setPhotoDef')
                console.log('idRegister:', idRegister.result)
                queryClient.invalidateQueries('photosDef')
            }
        }
        saveFile()
    }
    const handleDownload = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl)
            const blob = await response.blob()
            // Crée un objet URL à partir du blob
            const url = URL.createObjectURL(blob)
            // Crée un lien pour déclencher le téléchargement
            const link = document.createElement('a')
            link.href = url
            link.download = 'Hommage-Image.jpeg'
            // Déclencher le téléchargement
            link.click()
            // Libère l'URL générée
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Une erreur est survenue lors du téléchargement du fichier : ', error)
        }
    }

    return(
        <>
        <section>
            <div className="env">
            {/* Lien de la fiche d'un défunt */}
                <div className="env__link">
                    {/* <Link className="env__link_img" href="?page=environment&id_def=<?=$defunct_infos['id']?>" title="Lien vers cette fiche">
                        <img className="img dim35" src="./assets/site/link-icon.png" alt="icone lien"/>
                    </Link> */}
                </div>
            {/* <?php endif ?> */}
                <h2 className="env__title" >{defunctSelected.firstname} {defunctSelected.lastname}</h2>
                <div className="env__date">
                    {defunctSelected.birthdate? <h4>{defunctSelected.birthdate}</h4>: <h4>Naissance non définie</h4>}
                    <img className="img dim40" src="./assets/site/cross.png" alt="croix"/>
                    {<h4>{defunctSelected.death_date}</h4>}
                </div>
                <hr/>
            {/* <?php  */}
    {/* // Dossier de téléchargement des photos du defunt sélectionné */}
            {!isOpen && 
            <div className="env__folder_link" onClick={toggleFolder}>
                <div className="env__folder">
                    <img className="img" src="./assets/site/folder.png" alt="Dossier de stockage photos"/>
                </div>
                <div>
                    <p>Cliquez sur le Dossier pour telecharger les photos de {defunctSelected.firstname} {defunctSelected.lastname}</p>
                </div>
            </div>}
            {/* <?php  */}
    {/* // Identifiant du créateur de la fiche + ajout icone ami si pas dans la liste de l'utilisateur */}
            <div className="env__add_friend">
                <p><u>Gestionnaire de la fiche :</u></p>
                <div className="admin_user">
                    {isAdmin ? <p>{infosUser[0].firstname} {infosUser[0].lastname}</p>:<div><p>{otherAdmin.firstname} {otherAdmin.lastname}</p>
                    {!isFriend && <img className="img dim20 friend_add" src="./assets/site/friend.png" alt="icone ajouter"/>}</div>}
                </div>
            </div>
            <div className="friend_mess">
                {/* <?=$message?> */}
            </div>
        </div>
    </section>
    <section>    
     {/* // Dossier caché contenant toutes les photos du défunt */}
    {isOpen &&
        <div  className="env__photos_list">
            <img className="dim20 env__photos-close" src="./assets/site/delete-icon.png" alt="Fermer" onClick={()=>setIsOpen(false)}/>
            <>
                {listPhotosDef.result.length>0 ? 
                listPhotosDef.result.map((item)=>(
                    <div key={item.id} className="env__min_photo">
                    <img  className="img" src={`http://localhost:3000/${item.name}`} alt="defunct" />
                    <img  className="img dim20" src="./assets/site/download.png" alt="icone téléchargement" onClick={()=>handleDownload(`http://localhost:3000/${item.name}`)}/>
                </div>))
                :<p>Aucune photos à afficher</p>}
            </>
        </div> 
    }
        <hr/>
    </section>
    <section>
        {/* <?php  */}
    {/* // Nombre de commentaires et photos depuis la dernière connexion */}
            {/* if (isset($_SESSION['user']['id']) && $defunct_infos['user_id'] == $_SESSION['user']['id']) : ?> */}
        <div className="env__listing">
            <p className="new_comments">Depuis votre dernière connexion :</p>
            {/* <p className="new_photos">Photos ajoutées: <span><?=$recentPhoto?></span></p>
            <p className="new_comments">Commentaires ajoutés: <span><?=$recentComment?></span></p> */}
        </div>
        <hr/>
        {/* <?php endif ?>
        <?php */}
    {/* // Ajouter une photo dans l'environnement utilisateur */}
            {/* if (isset($_SESSION['user']['id'])) : ?> */}
        <div>
            {/* <?=$messFile?> */}
        </div>
        <form enctype="multipart/form-data" id="form_env">
            <label htmlFor="file_env"></label>
            <input type="file" name="file_env" id="file_env" ref={fileInputRef} onChange={handleFileChange}/>
            <div className="env__add_photo">
                <label>Ajouter une photo (2Mo max) &emsp;<FaArrowRight/></label>
                <img className="img dim60" src="./assets/site/photo-icon.png" alt="appareil" onClick={handleImageClick}/>
            </div>
        </form> 
        {/* <?php endif ?> */}
        <div className="env__container">
        {/* <?php  */}
    {/* // Liste des nouvelles photos depuis la dernière connexion */}
            {/* foreach($defunct_photos as $r): ?> */}
            <div className="env__container_photos">
            {/* <?php if (isset($_SESSION['user']['last_log']) && isset($r['date_crea']) && $_SESSION['user']['last_log'] < $r['date_crea']): ?> */}
                <div className="container_lastP hidden" >
                    <div className="last_photos">
                        <a href="#<?=$r['id']?>">
                            <img className="img" src="p./assets/photos/<?=$r['user_id']?>/<?=$r['name']?>" alt="<?=$r['name']?>"/>
                        </a>
                    </div>
                </div>
                </div>
            {/* <?php endif ?>
            <?php */}
    {/* //Supprimer une photo dont on est l'auteur */}
                {/* if (isset($_SESSION['user']['id']) && isset($r['user_id']) && $_SESSION['user']['id'] == $r['user_id']): ?> */}
                <a className="env__delete_photo" href="?page=environment&idPhoto=<?=$r['id']?>&id=<?=$id_def?>" title="Supprimer">
                    <img className="dim20" src="./assets/site/delete-icon.png" alt="Supprimer"/>
                </a>
            {/* <?php endif ?> */}
                <div id="<?=$r['id']?>">
            {/* <?php */}
    {/* // Affichage des photos  */}
                {/* if (!isset($_SESSION['user']['id'])) :?> */}
                    <img className="img env__blur_photo" src="public/pictures/photos/<?=$r['user_id'].'/'.$r['name']?>" alt="<?=$r['name']?>"/>
                {/* <?php else :?> */}
                    <img className="img" src="public/pictures/photos/<?=$r['user_id'].'/'.$r['name']?>" alt="<?=$r['name']?>"/>
            {/* <?php endif ?> */}
                </div>
                <div className="env__comment">
            {/* <?php  */}
    {/* // Liste des commentaires de la photo + profil miniature des auteurs du commentaire */}
                {/* foreach($com_list[$r['id']] as $comment): ?> */}
                    <div className="comment_post">
                {/* <?php if (!isset($_SESSION['user']['id'])) :?> */}
                        <div className="container_com_user env__blur_comment">
                {/* <?php else :?> */}
                        <div className="container_com_user">
                {/* <?php endif ?> */}
                        <div className="env__profil">
                {/* <?php if (file_exists('public/pictures/users/'.$comment['user_id'].'/'.$comment['profil_user'])) : ?> */}
                            <img className="img" src="./assets/users/<?=$comment['user_id'].'/'.$comment['profil_user']?>" alt="profil"/>
                {/* <?php else : ?> */}
                            <img className="img" src=".:assets/site/noone.jpg" alt="profil"/>
                {/* <?php endif ?> */}
                        </div>
                        {/* <?=$comment['comment']?>
                <?php  */}
    {/* // Supprimer un commentaire dont on est à l'origine                                  */}
                    {/* if (isset($_SESSION['user']['id']) && $_SESSION['user']['id'] == $comment['user_id']): ?> */}
                            <div className="icon_delete">
                                <a className ="env_user_name" href="?page=environment&id=<?=$id_def?>&idCom=<?=$comment['id']?>" title="Supprimer"><i className="fas fa-trash-alt"></i>
                                </a>
                            </div>
                {/* <?php endif ?>
                <?php */}
    {/* // Affichage d'un bandeau "New" pour les nouveaux commentaires */}
                    {/* if ((isset($_SESSION['user']['last_log']) && isset($comment['date_crea']) && $_SESSION['user']['last_log'] < $comment['date_crea']) && (isset($_SESSION['user']['id']) && isset($comment['user_id']) && $_SESSION['user']['id'] !== $comment['user_id'])): ?> */}
                            <div className="new_comment">
                                <img className="img" src="./assets/site/new.png" alt="Bandeau nouveau commentaire"/>
                            </div>
                {/* <?php endif ?> */}
                        </div>
                        </div>
            {/* <?php endforeach ?> */}
                    </div>
            {/* <?php */}
    {/* // Formulaire ajout de commentaire */}
                {/* if (isset($_SESSION['user']['id'])) : ?> */}
                    <form className="env__comment_form">
                        <input type="text" name="comment" className="env__comment_txt"/>
                        <label htmlFor="comment">Commenter</label>
                        <input type="hidden" name="id_def" className="id_def" value="<?=$id_def?>"/>
                        <input type="hidden" name="photo_id" className="photo_id" value="<?=$r['id']?>"/>
                        <input type="hidden" name="user_id" className="user_id" value="<?=$_SESSION['user']['id']?>"/>
                    </form>
            {/* <?php endif ?> */}
                </div>
        {/* <?php endforeach ?> */}
            </div>
        {defunctsList.length===0 &&  
            <div className="env__no_user">
                <h2 className="env_title">Pour visualiser cette fiche, vous devez être inscrit ou connecté.</h2>
                <Link className="button" to={'/register'}>S'inscrire</Link>
                <Link className="button" to={'/connexion'}>Connexion</Link>
            </div>}
    </section>
    </>
    )
}

export default Environment