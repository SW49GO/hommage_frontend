const Flowers = () =>{
    return (
    <>
        <section>
        <h2>Nos Bouquets</h2>
        <article class="flower__article">
            <h4>Provenance Française</h4>
            <p>Nous vous proposons une séléction de bouquets de fleurs fraîches à livrer à votre domicile ou à faire livrer par nos soins sur la tombe du défunt concerné.</p>
        </article>
        </section>
        <section>
            <div class="flower">
                <form class="flower__form" method="POST" action="?page=flower">
                <div class="flower__container">
            {/* <?php foreach($flowerList as $f) :?> */}
                    <div class="flower">
                        <img class="img dim200" src="public/pictures/flowers/<?=$f['name']?>" alt="bouquet de fleurs"/>
                        <div>
                        {/* <p><?=$f['info']?></p>
                        <p><?=$f['price']?><span> €</span></p>
            <?php if (isset($_SESSION['user']['id'])) :?> */}
                        {/* <input class="flower_id" type="checkbox" name ="check[]" value="<?=$f['id']?>"> */}
            {/* <?php endif ?> */}
                        </div>
                    </div>
            {/* <?php endforeach ?> */}
              </div>
            {/* <?php if (isset($_SESSION['user']['id'])) :?> */}
                <fieldset>
                    <label for="select_defunct">Sélectionner le défunt</label>
                    <div class="flower__dest">
                    <select name="select_def">
                        <option value="">--Liste des défunts sur le site--</option>
                        {/* <?=$select?> */}
                    </select>
                    </div>
                    <p>Par défaut les bouquets seront envoyés à votre domicile</p>
                    <input class="button" type="submit" name="submit" id="select_defunct" value="Valider le destinataire"/>
                </fieldset>
                <h2>Récapitulatif de vos choix</h2>
                {/* <h3>Vous avez sélectionné  <?=$nb_flower?> bouquets.</h3>
                <?=$message?>
                <?=$verifAddress?> */}
                <table class="flower__table">
                    <thead>
                    <tr>
                        <th>Nom du bouquet</th>
                        <th>Tarif</th>
                    </tr>
                    </thead>
                    <tbody id="flower__container_tab">
                    {/* <?=$tab_flower?> */}
                    </tbody>
                    <tfoot>
                    <td>Total avec TVA :</td>
                    {/* <td class="flower__total"><?=$total?> €</td> */}
                    </tfoot>
                </table>
                {/* <?php if (isset($_POST['select_def']) && $addressOk = true) :?> */}
                <label for="confirm">Réglement</label>
                    {/* <?=$mess_buy?> */}
                <input class="button" type="submit" name="confirm" id="confirm" value="Paiement"/>
                {/* <?php endif ?> */}
                {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                </form>
            </div>
        </section>
        <section>
        {/* <?php else :?> */}
        <div class="flower_no_user">
            <h2>Inscrivez-vous ou connectez-vous pour bénéficier de ce service.</h2>
            <a class="button button-a" href="?page=registration">S'inscrire</a>
            <a class="button button-a" href="?page=connexion">Connexion</a>
        </div>
        {/* <?php endif ?> */}
        </section>
    </>
    )
}
export default Flowers