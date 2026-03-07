const RoomState = Object.freeze({
    WAITING_PLAYERS: "WAITING_PLAYERS",
    GAME_STARTED: "GAME_STARTED",
    GAME_PAUSED: "GAME_PAUSED",
    GAME_ENDED: "GAME_ENDED"
});

class CartesShow {
    constructor(scene,x, y, NUM){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.NUM = NUM;
        this.cartes_joueur = [-1]; // Liste d'objet
        this.scene_cartes_joueur = []; // Liste d'objet
        this.EchangeEnCours = false;

        this.cartes = scene.add.sprite(x, y, 'Cartes');
        this.nbrCartes = scene.add.sprite(x+5,y+61,'NbrCartes_11');

        //Hitbox
        this.clickAllowed = true;
        this.SelectedCartes = false;
        this.SelectedEchanges = false;
        this.cartesShow = scene.add.sprite(x-3, y+18, 'CartesShow').setVisible(this.SelectedCartes).setAlpha(0.8);

        this.carteshitbox = scene.add.zone(x-4,y+73, 33, 24);
        this.carteshitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.carteshitboxDebug = scene.add.rectangle(
            x - 4,
            y + 73,
            33,
            24,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        this.carteshitboxDebug.setDepth(85);
        this.carteshitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.carteshitbox.on('pointerdown', () => {
            if (NUM != 0){
                console.log('Bouton Cartes cliqué : ' + this.clickAllowed);
                this.ClickOnCards();
            }
        });

        // Quand la souris passe dessus
        this.carteshitbox.on('pointerover', () => {
            if (NUM != 0){
                this.cartes.setTexture('CartesSelected');
            }
        });

        // Quand la souris sort
        this.carteshitbox.on('pointerout', () => {
            if (NUM != 0){
                if (this.SelectedCartes){
                    this.cartes.setTexture('CartesSelected');
                } else {
                    this.cartes.setTexture('Cartes');
                }
            }
        });
        // Echanges 
        this.carte_en_echange = new CartesMini(this.scene, x,y,0,true,false,false,false);
        this.carte_en_echange.setSpriteVisible(false);
        this.EchangePropose = false;
        this.OtherAccept = false;
        this.Accept = false;

        // Alerte proposition Echange
        this.alert_EchangePropose = scene.add.sprite(x-13,y+61,'AlertEchangePropose').setVisible(false);

        this.cartesShowEchangesBouton = scene.add.sprite(x-3, y+11, 'CartesShowEchangeBouton').setVisible(this.SelectedCartes);
        this.cartesShowEchanges = scene.add.sprite(x-3, y+47, 'CartesShowEchangeCancel').setVisible(this.SelectedCartes);
        this.echangeTimer = scene.add.sprite(x-3, y+18, 'EchangeTimer_0').setVisible(this.SelectedCartes);
        this.timerIndex = 0;
        this.cartesShowEchangesBoutonhitbox = scene.add.zone(x-2,y-80, 88, 20);
        this.cartesShowEchangesBoutonhitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.cartesShowEchangesBoutonhitboxDebug = scene.add.rectangle(
            x-2,
            y-80,
            88,
            20,
            0xff0000, // couleur rouge
            0.25       // opacité 0.5
        );
        this.cartesShowEchangesBoutonhitboxDebug.setVisible(this.SelectedCartes).setDepth(85);
        this.cartesShowEchangesBoutonhitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.cartesShowEchangesBoutonhitbox.on('pointerdown', () => {
            this.ClickOncartesShowEchangesBouton();
        });

        this.cartesShowEchangeshitbox = scene.add.zone(x-3,y+50, 20, 20);
        this.cartesShowEchangeshitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.cartesShowEchangeshitboxDebug = scene.add.rectangle(
            x-3,
            y+50,
            20,
            20,
            0xff0000, // couleur rouge
            0.25       // opacité 0.5
        );
        this.cartesShowEchangeshitboxDebug.setVisible(this.SelectedCartes).setDepth(85);
        this.cartesShowEchangeshitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.cartesShowEchangeshitbox.on('pointerdown', () => {
            this.AnnulerBouton();
        });

        this.AcceptEchange = scene.add.sprite(x-3, y-58, 'CartesShowEchangeAccept').setVisible(false); // TODO : Mettre à false
        this.AcceptEchangehitbox = scene.add.zone(x-3,y-55, 20, 20);
        this.AcceptEchangehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.AcceptEchangehitboxDebug = scene.add.rectangle(
            x-3,
            y-55,
            20,
            20,
            0x008000, // couleur verte
            0.5       // opacité 0.5
        );
        this.AcceptEchangehitboxDebug.setVisible(false).setDepth(85); // TODO : Mettre à false
        this.AcceptEchangehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.AcceptEchangehitbox.on('pointerdown', () => {
            this.AccepterBouton();
        });

        // Hitbox pour déposer la Carte. 

        this.depothitbox = scene.add.zone(x,y, 19, 26);
        this.depothitbox.setInteractive();
        this.depothitbox.setVisible(false);
        this.depothitboxDebug = scene.add.rectangle(
            x,
            y,
            19,
            26,
            0x008000, // couleur verte
            0.5       // opacité 0.5
        );
        this.depothitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.depothitboxDebug.setVisible(false);

        this.setDepth();
    }

    setDepth(){
        // Cartes
        this.cartes.setDepth(66);
        this.nbrCartes.setDepth(67);
        this.alert_EchangePropose.setDepth(67);
        this.cartesShow.setDepth(81);
        this.cartesShowEchangesBouton.setDepth(81);
        this.AcceptEchange.setDepth(81);
        this.cartesShowEchanges.setDepth(82);
        this.echangeTimer.setDepth(82);

        // Hitbox 
        this.depothitbox.setDepth(82);
        this.depothitboxDebug.setDepth(82);
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
        // mettre à jour tous les sprites
        const allSprites = [
            this.cartes, this.nbrCartes, this.cartesShow, this.cartesShowEchangesBouton, this.cartesShowEchanges, this.echangeTimer,
            this.cartesShowEchangesBoutonhitboxDebug, this.cartesShowEchangeshitboxDebug, this.carteshitboxDebug,this.depothitbox, this.depothitboxDebug, this.carte_en_echange,this.alert_EchangePropose,
            this.cartesShowEchangesBoutonhitbox, this.cartesShowEchangeshitbox, this.carteshitbox, this.AcceptEchange, this.AcceptEchangehitbox, this.AcceptEchangehitboxDebug
        ];
        allSprites.forEach(s => s.setPosition(x, y));
        this.nbrCartes.setPosition(x+5,y+61);
        this.alert_EchangePropose.setPosition(x-13,y+61);
        this.cartesShow.setPosition(x-3,y+18);
        this.echangeTimer.setPosition(x-3,y+18);
        this.depothitbox.setPosition(x-29,y-53);
        this.depothitboxDebug.setPosition(x-29,y-53);
        this.carte_en_echange.setPosition(x+23,y-53);
        this.cartesShowEchanges.setPosition(x-3,y+47);
        this.cartesShowEchangesBouton.setPosition(x-3,y+11);
        this.AcceptEchange.setPosition(x-3,y-58);
        this.AcceptEchangehitbox.setPosition(x-3,y-55);
        this.AcceptEchangehitboxDebug.setPosition(x-3,y-55);
        this.carteshitboxDebug.setPosition(x-4,y+73);
        this.cartesShowEchangeshitboxDebug.setPosition(x-3,y+50);
        this.cartesShowEchangesBoutonhitboxDebug.setPosition(x-2,y-80);
        this.carteshitbox.setPosition(x-4,y+73);
        this.cartesShowEchangeshitbox.setPosition(x-3,y+50);
        this.cartesShowEchangesBoutonhitbox.setPosition(x-2,y-80);
    }

    setVisible(bool){
        this.cartes.setVisible(bool);
        this.nbrCartes.setVisible(bool);
        this.cartesShow.setVisible(false);
        this.carteshitboxDebug.setVisible(bool);
        this.cartesShowEchangesBouton.setVisible(false);
        this.cartesShowEchanges.setVisible(false);
        this.echangeTimer.setVisible(false);
        this.alert_EchangePropose.setVisible(false);
        this.AcceptEchange.setVisible(false);
        this.AcceptEchangehitbox.setVisible(false);
        this.AcceptEchangehitboxDebug.setVisible(false);
        this.cartesShowEchangesBoutonhitboxDebug.setVisible(false);
        this.cartesShowEchangeshitboxDebug.setVisible(false);
    }

    updateCartesShow(Cartes) {
        this.updateEchangePropose();
        this.updatePlayerCards(Cartes);
    }

    updateEchangePropose(){
        this.alert_EchangePropose.setVisible(this.EchangePropose);
    }

    updatePlayerCards(Cartes){
        if (this.scene.roomState != RoomState.WAITING_PLAYERS) {
            for (let i= 0;i < Cartes.length;i++){
                if ((!this.cartes_joueur[i]) || (this.cartes_joueur[i] == -1)) {
                    this.cartes_joueur[i] = new CartesMini(this.scene,this.x,this.y,Cartes[i].Valeur);
                } else {
                    this.cartes_joueur[i].updateValue(Cartes[i].Valeur);
                }
            }
            this.deleteUselessElements(Cartes,this.cartes_joueur);
            this.updateSceneCartes();
        }
        this.setNbrCartes(Cartes);
    }

    updateSceneCartes() {
        for (let i = 0; i < this.scene.cartes_joueur.length; i++) {
            let carteSource = this.scene.cartes_joueur[i];
            if (!this.scene_cartes_joueur[i]) {
                // Si elle n'existe pas encore → on la crée
                this.scene_cartes_joueur[i] = new CartesMini(
                    carteSource.scene,
                    carteSource.x,
                    carteSource.y,
                    carteSource.Valeur,
                    carteSource.Seen,
                    carteSource.Echange,
                    carteSource.cliquable,
                    carteSource.draggable,
                    this,
                    carteSource.PlayerEchange,
                    carteSource.Yours
                );
            } else {
                // Sinon on met juste à jour ses valeurs
                this.scene_cartes_joueur[i].updateValue(carteSource.Valeur);
                this.scene_cartes_joueur[i].updateEchange(carteSource.Echange,carteSource.PlayerEchange);
                if ((this.SelectedCartes) && (this.SelectedEchanges)){
                    this.scene_cartes_joueur[i].echange.setVisible(carteSource.Echange);
                }
            }
        }
        // Si des cartes ont été supprimées
        if (this.scene_cartes_joueur.length > this.scene.cartes_joueur.length) {
            this.scene_cartes_joueur.length = this.scene.cartes_joueur.length;
        }
    }

    deleteUselessElements(Cartes,Cartes_Objets){
        for (let i = Cartes_Objets.length - 1; i >= 0; i--) {
            if (Cartes_Objets[i] && Cartes_Objets[i] !== -1) {
                if (!Cartes[i]) {
                    Cartes_Objets[i].sprite.destroy(); // important en Phaser
                    Cartes_Objets.splice(i, 1);
                }
            }
        }
    }
    
    setNbrCartes(cartes){
        if (this.scene.roomState === RoomState.WAITING_PLAYERS){
            this.nbrCartes.setTexture('NbrCartes_11');
        } else {
            this.NbrCartes_Valeur = cartes.length;
            this.nbrCartes.setTexture('NbrCartes_'+cartes.length);
        }
    }

    updateEchangeProposeValues(EchangePropose, Accepte){
        this.EchangeEnCours = EchangePropose;
        this.Accept = Accepte;
    }

    resetCardsPosition(){
        for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
            if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                let reste = i%4;
                let div_ent = Math.floor(i/4);
                let X = (this.x - 34) + reste * 21; 
                let Y = (this.y - 25) + div_ent * 30;
                if (this.SelectedCartes && this.SelectedEchanges){
                    this.scene_cartes_joueur[i].setPosition(X,Y);
                }
                this.scene_cartes_joueur[i].updateEchange(false,this);
                this.scene_cartes_joueur[i].ChangeEchangeSprite(false);
                this.scene_cartes_joueur[i].setDraggableState(true);
                this.scene_cartes_joueur[i].echange.setVisible(false);
                this.scene_cartes_joueur[i].echange.setAlpha(0.5);
                this.EchangeEnCours = false;
                this.Accept = false;
                this.scene.UpdateCardValues(this.x,this.y,this.scene_cartes_joueur[i].Valeur,true,false,false,true,this);
            }
        }
    }

    setEchangePropose(Valeur, EchangePropose,Accepte,TimerIndex){
        // console.log("UpdateEchangePropose appelé : Valeur " + Valeur + "EchangePropose" + EchangePropose + "TimerIndex : " + TimerIndex); // A SUP
        this.EchangePropose = EchangePropose;
        this.carte_en_echange.Echange = EchangePropose;
        if (!EchangePropose) {
            this.Accept = false;
            this.carte_en_echange.setSpriteVisible(false);
            this.carte_en_echange.echange.setVisible(false);
        } else {
            this.carte_en_echange.echange.setVisible(true);
            this.carte_en_echange.echange.setAlpha(0.5);
            if (Accepte){
                this.carte_en_echange.ChangeEchangeSprite(true);
                console.log("Je dois afficher le truc vert !");
            } else {
                this.carte_en_echange.ChangeEchangeSprite(false);
            }
        }
        this.OtherAccept = Accepte;
        if (Valeur != null){
            this.carte_en_echange.updateValue(Valeur);
        }
        if ((this.SelectedEchanges) && (this.SelectedCartes)) {
            if ((EchangePropose) && (this.timerIndex > 0)) {
                this.carte_en_echange.setSpriteVisible(this.SelectedCartes);
            }
            if (EchangePropose && this.EchangeEnCours) {
                this.AcceptEchange.setVisible(this.SelectedCartes);
                this.AcceptEchangehitbox.setVisible(this.SelectedCartes);
                this.AcceptEchangehitboxDebug.setVisible(this.SelectedCartes);
            } else {
                this.AcceptEchange.setVisible(false);
                this.AcceptEchangehitbox.setVisible(false);
                this.AcceptEchangehitboxDebug.setVisible(false);
            }
        } else {
            this.carte_en_echange.setSpriteVisible(false);
        }
        this.timerIndex = TimerIndex;
        this.echangeTimer.setTexture('EchangeTimer_' + TimerIndex);
    }

    ClickOnCards() {
        // console.log(this.cartes_joueur); // A SUP
        // console.log(this.scene_cartes_joueur); // A SUP
        if (this.clickAllowed){
            this.SelectedCartes = !this.SelectedCartes;
            this.SelectedEchanges = false;
            this.cartesShow.setVisible(this.SelectedCartes).setTexture('CartesShow');
            this.cartesShowEchangesBouton.setVisible(this.SelectedCartes).setTexture('CartesShowEchangeBouton');;
            this.cartesShowEchangesBoutonhitboxDebug.setVisible(this.SelectedCartes);
            for (let i = 0;i < this.cartes_joueur.length; i++) {
                if ((this.cartes_joueur[i]) && (this.cartes_joueur[i] != -1)){
                    this.cartes_joueur[i].setSpriteVisible(this.SelectedCartes);
                    let reste = i%4;
                    let div_ent = Math.floor(i/4);
                    let X = (this.x - 34) + reste * 21; 
                    let Y = (this.y - 50) + div_ent * 30;
                    this.cartes_joueur[i].setPosition(X,Y);
                }
            }
            this.cartesShowEchanges.setVisible(false);
            this.AcceptEchange.setVisible(false);
            this.AcceptEchangehitbox.setVisible(false);
            this.AcceptEchangehitboxDebug.setVisible(false);
            this.echangeTimer.setVisible(false);
            this.carte_en_echange.setSpriteVisible(false);
            this.depothitbox.setVisible(false);
            this.depothitboxDebug.setVisible(false);
            this.cartesShowEchangeshitboxDebug.setVisible(false);
            for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
                if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                    this.scene_cartes_joueur[i].setSpriteVisible(false);
                    let reste = i%4;
                    let div_ent = Math.floor(i/4);
                    let X = (this.x - 34) + reste * 21; 
                    let Y = (this.y - 25) + div_ent * 30;
                    this.scene_cartes_joueur[i].setPosition(X,Y);
                    if (this.scene_cartes_joueur[i].Echange){
                        if (this.scene_cartes_joueur[i].PlayerEchange === this) {
                            this.scene_cartes_joueur[i].setPosition(this.depothitbox.x,this.depothitbox.y);
                        }
                    }
                }
            }
        }
    }

    ClickOncartesShowEchangesBouton(){
        if (this.clickAllowed){
            if (this.SelectedCartes){
                this.SelectedEchanges = !this.SelectedEchanges;
                console.log('Bouton ShowCartesEchangeBouton cliqué');
                if (this.SelectedEchanges){
                    this.cartesShow.setTexture('CartesShowEchange');
                    this.cartesShowEchangesBouton.setTexture('CartesShowEchangeBoutonSelected');
                    this.cartesShowEchanges.setVisible(this.SelectedCartes);
                    this.echangeTimer.setVisible(this.SelectedCartes);
                    this.depothitbox.setVisible(this.SelectedCartes);
                    this.depothitboxDebug.setVisible(this.SelectedCartes);
                    this.cartesShowEchangeshitboxDebug.setVisible(this.SelectedCartes);
                    for (let i = 0;i < this.cartes_joueur.length; i++) {
                        if ((this.cartes_joueur[i]) && (this.cartes_joueur[i] != -1)){
                            this.cartes_joueur[i].setSpriteVisible(false);
                        }
                    }
                    for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
                        if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                            this.scene_cartes_joueur[i].setSpriteVisible(this.SelectedCartes);
                        }
                    }
                    if ((this.EchangePropose) && (this.timerIndex > 0)) {
                        this.carte_en_echange.setSpriteVisible(this.SelectedCartes);
                    }
                    if (this.EchangePropose && this.EchangeEnCours) {
                        this.AcceptEchange.setVisible(this.SelectedCartes);
                        this.AcceptEchangehitbox.setVisible(this.SelectedCartes);
                        this.AcceptEchangehitboxDebug.setVisible(this.SelectedCartes);
                    }
                } else {
                    this.cartesShow.setTexture('CartesShow');
                    this.cartesShowEchangesBouton.setTexture('CartesShowEchangeBouton');
                    this.cartesShowEchanges.setVisible(false);
                    this.echangeTimer.setVisible(false);
                    this.carte_en_echange.setSpriteVisible(false);
                    this.AcceptEchange.setVisible(false);
                    this.AcceptEchangehitbox.setVisible(false);
                    this.AcceptEchangehitboxDebug.setVisible(false);
                    this.depothitbox.setVisible(false);
                    this.depothitboxDebug.setVisible(false);
                    this.cartesShowEchangeshitboxDebug.setVisible(false);
                    for (let i = 0;i < this.cartes_joueur.length; i++) {
                        if ((this.cartes_joueur[i]) && (this.cartes_joueur[i] != -1)){
                            this.cartes_joueur[i].setSpriteVisible(this.SelectedCartes);
                        }
                    }
                    for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
                        if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                            this.scene_cartes_joueur[i].setSpriteVisible(false);
                        }
                    }
                }

            }
        }
    }

    AnnulerBouton(){
        console.log("Bouton Cancel Appuyé !");
        this.Accept = false;
        for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
            if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                let reste = i%4;
                let div_ent = Math.floor(i/4);
                let X = (this.x - 34) + reste * 21; 
                let Y = (this.y - 25) + div_ent * 30;
                if (this.SelectedCartes && this.SelectedEchanges){
                    this.scene_cartes_joueur[i].setPosition(X,Y);
                }
                if ((this.scene_cartes_joueur[i].Echange) && (this.scene_cartes_joueur[i].PlayerEchange === this)){
                    // Annuler L'effet de la carte 
                    this.scene_cartes_joueur[i].updateEchange(false,this);
                    this.scene_cartes_joueur[i].ChangeEchangeSprite(false);
                    this.scene_cartes_joueur[i].setDraggableState(true);
                    this.scene_cartes_joueur[i].echange.setVisible(false);
                    this.scene_cartes_joueur[i].echange.setAlpha(0.5);
                    this.EchangeEnCours = false;
                    this.Accept = false;
                    this.scene.UpdateCardValues(this.x,this.y,this.scene_cartes_joueur[i].Valeur,true,false,false,true,this);
                }
            }
        }
        // Je dois envoyer l'information au Serveur
        this.sendCancel();
    }

    AccepterBouton(){
        console.log("Bouton Accept Appuyé !");
        let carte = null;
        for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
            if ((this.scene_cartes_joueur[i]) && (this.scene_cartes_joueur[i] != -1)){
                if ((this.scene_cartes_joueur[i].Echange) && (this.scene_cartes_joueur[i].PlayerEchange === this)){ 
                    carte = this.scene_cartes_joueur[i].Valeur;
                    this.scene_cartes_joueur[i].ChangeEchangeSprite(true);
                    this.scene_cartes_joueur[i].echange.setVisible(true);
                    this.scene_cartes_joueur[i].echange.setAlpha(0.5);
                    this.scene.UpdateCardValues(this.x,this.y,this.scene_cartes_joueur[i].Valeur,true,true,false,false,this);
                }
            }
        }
        this.sendAccept(carte);
    }

    sendAccept(carte){
        const payload = {
            playerNum : this.scene.myNum,
            Source: this.scene.myNum,
            Destination: this.scene.giveNumBasedOnNumPlayer(this.NUM),
            Carte: carte,
            EchangePropose : true,
            Accepte : true
        };
        this.scene.socket.send(JSON.stringify({
            type: "playerProposeEchange",
            payload: payload
        }));
    }

    sendCancel(){
        const payload = {
            playerNum : this.scene.myNum,
            Source: this.scene.myNum,
            Destination: this.scene.giveNumBasedOnNumPlayer(this.NUM),
            Carte: null,
            EchangePropose : false,
            Accepte : false
        };
        this.scene.socket.send(JSON.stringify({
            type: "playerProposeEchange",
            payload: payload
        }));
    }

    ResetEchangeValues(){
        this.EchangePropose = false;
        this.OtherAccept = false;
        this.Accept = false;
        this.carte_en_echange.setSpriteVisible(false);

    }



}