const Search = () =>{
    return (
        <>
            <h1 class="search__title">Personne recherchée sur le site.</h1>
            <div class="search">
                <form method="POST" action="?page=search">
                    <select id="select_lastname" name="select_def">
                        <option value="">--Fiches des défunts sur le site--</option>
                        {/* <?=$select?> */}
                    </select>
                    <input class="button" type="submit" value="Valider"/>
                    <input type="hidden" name="token" value="<?=$token?>"/>
                </form>
            </div>
            <div class="search__defunct">
                {/* <?=$defunct?> */}
            </div>
            <h3 class="search__title">Personne recherchée dans la liste des défunts de l'INSEE.</h3>
            <div class="search__insee">
                <label for="lastname_insee"></label>
                <input type="text" name="lastname_insee" id="lastname_insee" placeholder="Nom de famille"/>
                <select class="search__result_insee"></select>
                <p>Les données de l'INSEE sont actualisées mensuellement.</p>
                <p>Elles sont ici à titre indicatif.</p>
            </div>
        </>
    )
}
export default Search