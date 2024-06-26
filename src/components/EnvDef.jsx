import React, { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { deleter, getInfos, setRegister } from "../services/api"
import { useForm } from "react-hook-form"

const EnvDef = ({ id, token, idDef, isAdmin, auth, infosUser, nbPhotos, nbComments }) => {
    console.log('idENVDEF:', id)
    const {register, handleSubmit, reset} = useForm()
    const queryClient= useQueryClient()
  // Retrieve all photos from a defunct
  const { data: listPhotosDef } = useQuery('photosDef', () => getInfos(id, token, idDef, 'photoListDefunct'),
    {onSuccess: (data)=>{
      const nbNewPhotos = data.result.filter(item => item.user_id !== id && new Date(item.date_crea) > new Date(infosUser[0].last_log)).length
      console.log('nbNewPhotos:', nbNewPhotos)
      nbPhotos(nbNewPhotos)
    }})
  // Retrieve all comments for a defunct
  const { data: listComment } = useQuery('listComment', () => getInfos(id, token, idDef, 'getListComment'),
    {onSuccess:(data)=>{
      const nbNewComments = data.result.filter((item =>item.user_id !== id && new Date(item.date_crea) > new Date(infosUser[0].last_log))).length
      console.log('nbNewComments:', nbNewComments)
      nbComments(nbNewComments)
    }})

  const [userPhotos, setUserPhotos] = useState({})

  useEffect(() => {
    const fetchUserPhotos = async () => {
      const newPhotos = {}
      await Promise.all(listComment.result.map(async (comment) => {
        if (!newPhotos[comment.user_id]) {
          const result = await getInfos(id, token, 0, 'getUserData', comment.user_id)
          newPhotos[comment.user_id] = result.userData[0].photo || null
        }
      }))
      setUserPhotos(newPhotos)
    }

    if (listComment && listComment.result) {
      fetchUserPhotos()
    }
  }, [id, token, listComment])

  const handleComment = async (data) =>{
    // Ne récupérer que le data correspondant au nouveau commentaire saisie
    const filteredData = Object.entries(data).filter(([key, value]) => {
        return key.startsWith('comment-') && value !== ""
      })
    const contentComment = filteredData[0][1]
    // Récupérer l'id de la photo
    const commentIds = filteredData.map(([key, value]) => {
        return key.split('-')[1]
      })
      const datas = {comment:contentComment,user_id:id,defunct_id:idDef,photo_id:commentIds[0]}
      const result= await setRegister(id, token, datas, 'setComment')
      if (result){queryClient.invalidateQueries('listComment')}
      reset({[filteredData[0][0]]: ""})
  }

  const deleteComment= async (idComment) =>{
    const data = {idComment:idComment}
    await deleter(id, 0, token, 'deleteComment', data )
    queryClient.invalidateQueries('listComment')
  }


  return (
    <>
      <div className="env__container">
        {/* Affichage des photos */}
        {listPhotosDef && listPhotosDef.result.length > 0 && listPhotosDef.result.map((item) => (
        <div key={item.id} className="env__photo">
            {/* Supprimer une photo dont on est l'auteur */}
            {(auth && isAdmin) && (
              <div className="env__delete_photo">
                <img className="dim20" src="./assets/site/delete-icon.png" alt="Supprimer" />
              </div>
            )}
            <img className={`img ${!auth ? 'env__blur_photo':''}`} src={`http://localhost:3000/${item.name}`} alt="defunct" />

            {/* Liste des commentaires de la photo + profil miniature des auteurs du commentaire */}
            <div key={item.id} className="env__comment">
                <div className="env__comment_post">
                {listComment && listComment.result.filter(comment => comment.photo_id === item.id).map(comment => (
                    <div key={comment.id} className={`container_com_user ${!auth ? 'env__blur_comment':''}`}>
                        {/* Suppression d'un commentaire dont on est l'auteur */}
                        {(auth && comment.user_id===id) && (
                        <div className="env__comment_post-delete" onClick={()=>deleteComment(comment.id)}>
                            <img className="dim10" src="./assets/site/delete-icon.png" alt="Supprimer" />
                        </div>
                        )}
                        {/* Photo miniature */}
                        <div className="env__profil">
                            {(isAdmin && infosUser[0].id === comment.user_id) ? (
                           <img className="img" src={infosUser[0].photo !== "" ? `http://localhost:3000/${infosUser[0].photo}` : "./assets/site/noone.jpg"} alt="profil" />
                          ) : (
                            <img className="img" src={userPhotos[comment.user_id] ? `http://localhost:3000/${userPhotos[comment.user_id]}` : "assets/site/noone.jpg"} alt="profil" />
                            )}
                        </div>
                    {comment.comment}
                    </div>
                ))}
                </div>
            </div>
            <form className="env__comment_form" onSubmit={handleSubmit(handleComment)}>
                <input type="text" name={`comment-${item.id}`} className="env__comment_txt" {...register(`comment-${item.id}`)}/>
                <label htmlFor={`comment-${item.id}`}>Commenter</label>
            </form>
        </div>
        ))}
      </div>
    </>
  )
}

export default EnvDef
