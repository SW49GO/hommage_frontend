import { useSelector, useDispatch } from "react-redux"
import { getInfos } from "../services/api"
import { useQuery } from "react-query"
import { selectAuth, selectToken, selectUserId} from "../features/selector"
import { setDefIdSelected, setSelectedDef } from "../features/store"
import { useNavigate } from "react-router-dom"
import Error from './Error'

const Search = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(selectUserId)
    const token = useSelector(selectToken)
    const auth = useSelector(selectAuth)
    console.log('authSARCH:', auth)
    const {isError, data} = useQuery('defunctList',() => getInfos(id, token,0, 'getAllDefuncts'))
    /**
     * Function to select a defunct
     * @param {number} idDef 
     */
    const selectedDefunct= (idDef)=>{
        dispatch(setDefIdSelected(idDef))
        const selectedDef = data.result.filter((item)=>(item.id===idDef))
        console.log('selectedDefSEARCH:', selectedDef)
        dispatch(setSelectedDef(selectedDef[0]))
        navigate('/environment')
    }

if(!isError && auth){
        return (
            <>
                <h1 className="search__title">Personne recherchée sur le site.</h1>
                <div className="search">
                    {data && data.result.length>0 ? data.result.map((item)=>(
                        <p key={item.id} className="button" onClick={()=>{selectedDefunct(item.id)}}>{item.firstname} {item.lastname}</p>
                    )): <p>Pas de défunts</p>}
                </div>
                <div className="search__defunct">
                    {/* <?=$defunct?> */}
                </div>
                <h3 className="search__title">Personne recherchée dans la liste des défunts de l'INSEE.</h3>
                <div className="search__insee">
                    <label htmlFor="lastname_insee"></label>
                    <input type="text" name="lastname_insee" id="lastname_insee" placeholder="Nom de famille"/>
                    {/* <select className="search__result_insee"></select> */}
                    <p>Les données de l'INSEE sont actualisées mensuellement.</p>
                    <p>Elles sont ici à titre indicatif.</p>
                </div>
            </>
        )
    }else{
        return(
        <Error message={'Vous devez être identifié pour utiliser cette fonctionnalité'}/>
        )
  }
}
export default Search