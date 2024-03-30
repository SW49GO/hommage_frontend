const Buy = () =>{
    return (
        <>
        <h1>Mes achats</h1>
            {/* <?=$messBuy?> */}
        {/* <?php if (isset($_SESSION['user_send']) && isset($_SESSION['total_card']) && $view!=1 || isset($_SESSION['destFlower'])) :?>
            <?=$tab?> */}
        <div class="buy <?=$pay?>">
            <hr/>
            <img class="img dim100" src="./assets/site/cartes.jpg" alt="carte visa"/>
            <p><b>Entrer vos coordonnées bancaire pour valider le paiement.</b></p>
            <fieldset class="buy__form">
                <form method="POST" action="?page=buy#pay">
                    <label for="buy__total"> Montant :</label>
                    <input type="text" name="buy_total" id="buy__total" value="<?=$_SESSION['total_card']?> €" readonly/>
                    <label for="buy__day"> Date :</label>
                    <input type="text" name="buy_day" id="buy__day" value="<?=date('d/m/Y H:m:s')?>" readonly/>
                    <label for="buy__cart"> N° de carte (sans espace) : </label>
                    <input type="number" name="buy_cart" id="buy__cart" required="required"/>
                    <label for="buy__code">N° de CVV (au dos de la carte) :</label>
                    <input type="number" name="buy_code" id="buy__code" required="required"/>
                    <label for="buy__tel">Téléphone :</label>
                    <input type="tel" name="buy_tel" id="buy__tel" required="required"/>
                    <label for="submit" id="buy_submit"></label>
                    <input class="button" type="submit" name ="buy_submit" id="submit" value="Payer"/>
                    {/* <input type="hidden" name="token" value="<?=$token?>"/> */}
                </form>   
            </fieldset>
        </div>
        <div>
            {/* <?=$messFinal?> */}
        </div>
        {/* <?php endif ?> */}
        <hr/>
        <div class="buy__message">
        {/* <?php if (isset($_SESSION['user']['id'])) :?>
            <?php if ($valid_pay || empty($_SESSION['nbCard'])) :?> */}
            <h2>Liste de mes précédents achats.</h2>
            <a class="button button-a" href="?page=buy&list=1">Afficher la liste</a>
            {/* <?php endif ?>
        <?php else :?> */}
            <h2>Veuillez vous connecter pour visualiser vos précedents achats.</h2>
            <h3>Vous devez être inscrit pour effectuer un achat.</h3>
            <a class="button button-a" href="?page=connexion">Connexion</a>
        {/* <?php endif ?> */}
        </div>
        {/* <?php if ($list) :?> */}
        <div class="buy__list">
            <table class="buy__table">
                <thead>
                    <tr>
                        <th>Articles</th>
                        <th>Prix</th>
                        <th>Défunt</th>
                        <th>Contenu</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <?=$tab_list?> */}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
        {/* <?php endif ?> */}
        <hr/>
      </>
    )
}
export default Buy