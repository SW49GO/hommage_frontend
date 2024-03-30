const Cards=()=>{
    return (
        <>
        <section>
            <div class="card">
                <h1 class="card__title">Cartes</h1>
                <h2>Selectionner une des cartes afin de pouvoir y ajouter le contenu de votre choix.</h2>
        {/* <?php if (isset($cardsList)) :?>
            <?php foreach($cardsList as $r) :?> */}
            <div class="card__item">
                <div class="card__image">
                    <img class="img card__select_img" src="./assets/cards/<?=$r['name']?>" alt="<?=$r['info']?>"/>
                    </div>
                <p>Tarif : <?=$r['price']?>  Euros</p>
                {/* <?php if (isset($_SESSION['user']['id'])) :?> */}
                <a class="button" href = "?page=card&id=<?=$r['id']?>">Selectionner</a>
                {/* <?php endif ?> */}
                </div>
            {/* <?php endforeach ?>
        <?php endif ?>
        <?php if (isset($_SESSION['user']['id'])) :?> */}
                <div class="card__editor">
                <h1>Ecrivez votre texte</h1>    
                    <div class="card__editor_main">
                        <div class="card__editor_header">
                            <button type="button" class="card__edit" data-element="bold">
                                <i class="fas fa-bold"></i>
                            </button>
                            <button type="button" class="card__edit" data-element="italic">
                                <i class="fas fa-italic"></i>
                            </button>
                            <button type="button" class="card__edit" data-element="underline">
                                <i class="fas fa-underline"></i>
                            </button>
                            <button type="button" class="card__edit" data-element="justifyLeft">
                                <i class="fas fa-align-left"></i>
                            </button>
                            <button type="button" class="card__edit" data-element="justifyCenter">
                                <i class="fas fa-align-center"></i>
                            </button>
                            <button type="button" class="card__edit" data-element="justifyFull">
                                <i class="fas fa-align-justify"></i>
                            </button>
                        </div>
                            <div id="card__id" class="hidden">
                                {/* <?=$id?> */}
                            </div>
                            <p class="content" contenteditable spellcheck="true" style="background-image : url('./assets/cards/<?=$cardInfo['name']?>');">
                            </p>
                    </div>
                </div>
            </div>
            <button class="button button-a" id ="card__val" type="button" value="1">Confirmer la carte</button>
        </section>
        <section>
        <div class="card__form">
                <form method="POST" action="?page=card">
                    <fieldset>
                        <div class="card__select">
                            <select name="select_def">
                                <option value="">--Liste des défunts sur le site--</option>
                                {/* <?=$select?> */}
                        </select>
                        </div>
                        <label for="valid_add"></label>
                        {/* <input type="hidden" name="token" value="<?=$token?>"> */}
                        <input class="button" id="valid_add" type="submit" name="submit_def" value="Confirmer le défunt"/>
                    </fieldset>
                    <div class="card__send">
                        {/* <?=$send_real, $send_email, $send_choice?> */}
                    </div>
                    <div class="card__dest">
                        {/* <?=$result_send?> 
                        <?=$mess_dest?> */}
                    </div>
                    <div class="card__info">
                        <h3>Nombre de cartes avec texte intégré enregisteés: <span id="card__nb"><?=count($_SESSION['nbCard'])?></span></h3>
                        <h4>Montant de vos achats :</h4>
                        <table class="card__table">
                            <thead>
                                <tr>
                                    <th class="card__tab">Cartes</th>
                                    <th class="card__price">Prix</th>
                                </tr>
                            </thead>
                            <tbody id="card__container_tab">
                                {/* <?=$tab_card?> */}
                            </tbody>
                            <tfoot>
                                <tr>
                                <td>Total</td> 
                                <td id="card__total"><?=$total_card?>€</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <a class="button button-a" href="?page=card&empty=true">Vider le tableau</a>
                    {/* <?php if ($needAddress && $valid_def && $total_card != 0 && $_SESSION['user_send']) :?> */}
                    <label for="confirm">Réglement</label>
                    {/* <?=$mess_buy?> */}
                    <input class="button" type="submit" name="confirm" id="confirm" value="Paiement"/>
                    {/* <?php endif ?> */}
                </form>
            </div>
        </div>
        </section>
        <section>
        {/* <?php else : ?> */}
            <div class="card_no_user">
                <h2>Inscrivez-vous ou connectez-vous pour bénéficier de ce service.</h2>
                <a class="button button-a" href="?page=registration">S'inscrire</a>
                <a class="button button-a" href="?page=connexion">Connexion</a>
            </div>
        {/* <?php endif ?> */}
        </section>
        </>
    )
}
export default Cards