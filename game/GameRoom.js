export const RoomState = Object.freeze({
    WAITING_PLAYERS: "WAITING_PLAYERS",
    GAME_STARTED: "GAME_STARTED",
    GAME_PAUSED: "GAME_PAUSED",
    GAME_ENDED: "GAME_ENDED"
});

export class GameRoom extends Phaser.Scene {
    constructor() {
        super("GameRoom"); // le nom doit correspondre EXACTEMENT
        this.roomState = RoomState.WAITING_PLAYERS;
    }

    init(data) {
        this.playerData = data.playerData;
        this.HITBOXES = data.playerData.ShowHitboxes;
    }

    preload(){
        //Nametag
        this.load.image('Nametag_Game_0','./assets/sNametag_Game_0.png');
        this.load.image('Nametag_Game_1','./assets/sNametag_Game_1.png');
        this.load.image('FondJoueur','./assets/sYour_Character_0.png');
        for (let i = 0; i <= 5; i++) {  // 6 images (0 à 5)
            this.load.image('NbrJoueurs_' + i, './assets/sFriends_new_' + i + '.png');
        }
        for (let i = 0; i <= 5; i++) {  // 6 images (0 à 5)
            this.load.image('NbrJoueursReady_' + i, './assets/sFriends_Ready_' + i + '.png');
        }
        this.load.image('Ready','./assets/sReadyorNot_0.png');
        this.load.image('NotReady', './assets/sReadyorNot_1.png');
        for (let i = 0; i <= 3; i++) {  // 4 images (0 à 3)
            this.load.image('CartesSurTable_' + i, './assets/sCartes_sur_table_' + i + '.png');
        }
        this.load.image('CarteEnEchange','./assets/sCard_Echange_0.png');
        this.load.image('CarteCantPlay','./assets/sCard_Cant_Play_0.png');

        for (let i = 0; i <= 24; i++) {  // 25 images (0 à 24)
            this.load.image('Timer_' + i, './assets/sTimer_' + i + '.png');
        }
        for (let i = 0; i <= 8; i++) {  // 9 images (0 à 8)
            this.load.image('ObjetIcon_' + i, './assets/sObjets_Icon_' + i + '.png');
        }
        this.load.image('Pioche', './assets/sPioche_0.png');
        this.load.image('PiocheSelected', './assets/sPioche_1.png');
        this.load.image('SacBoutonOff', './assets/sSac_Bouton_0.png');
        this.load.image('SacBoutonOn', './assets/sSac_Bouton_1.png');
        this.load.image('Carte_CantPlay', './assets/oCard_Cant_Play_0.png');
        this.load.image('Carte_Seen', './assets/oCartes_Seen_0.png');
        this.load.image('Carte_CanCombo', './assets/sCartes_Can_Combo_0.png');
        this.load.image('Depot', './assets/oCartes_Empty_0.png');
        for (let i = 0; i <= 52; i++) {  // 53 images (0 à 52)
            this.load.image('CartesMinis_' + i, './assets/oCartes_Main_' + i + '.png');
        }
        for (let i = 53; i <= 70; i++) {  // 17 images (53 à 70)
            this.load.image('CartesMinis_' + i, './assets/sCartes_Main2_' + i + '.png');
        }
        for (let i = 0; i <= 2; i++) {  // 3 images (0 à 2)
            this.load.image('CartesPioche_' + i, './assets/sDistribution_' + i + '.png');
        }
        for (let i = 0; i <= 6; i++) {  // 7 images (0 à 6)
            this.load.image('FlippingCarte_' + i, './assets/sFlipping_Carte_Animation_' + i + '.png');
        }
        this.load.image('ObjetBackground_NotSelected', './assets/sObjets_Background_0.png');
        this.load.image('ObjetBackground_Selected', './assets/sObjets_Background_1.png');
        // On load les objets 
        this.load.image('Batte', './assets/sBatte_0.png');
        this.load.image('BatteIcon', './assets/sDrag_Batte_0.png');
        this.load.image('Canne', './assets/sCanne_0.png');
        this.load.image('CanneIcon', './assets/sDrag_Canne_0.png');
        this.load.image('Ciseaux', './assets/sCiseaux_0.png');
        this.load.image('CiseauxIcon', './assets/sDrag_Ciseaux_0.png');
        this.load.image('Crayon', './assets/sCrayon_0.png');
        this.load.image('CrayonIcon', './assets/sDrag_Crayon_0.png');
        this.load.image('Lunettes', './assets/sLunettes_0.png');
        this.load.image('LunettesIcon', './assets/sDrag_Lunettes_0.png');
        this.load.image('Menottes', './assets/sDrag_Menottes_0.png');
        this.load.image('MenottesIcon', './assets/sDrag_Menottes_0.png');
        this.load.image('Telephone', './assets/sDrag_Telephone_0.png');
        this.load.image('TelephoneIcon', './assets/sDrag_Telephone_0.png');

        for (let i = 0; i <= 64; i++) {  // 65 images (0 à 64)
            this.load.image('CartesNormales_' + i, './assets/oCartes_Main2_' + i + '.png');
        }
        this.load.image('CartesHitboxON','./assets/sCartes_Hitbox_0.png');
        this.load.image('CartesHitboxOFF','./assets/sCartes_Hitbox_1.png');

        this.load.image('RoiDescription','./assets/sRoi_Action_0.png');
        this.load.image('ReineDescription','./assets/sRoi_Action_1.png');
        this.load.image('ValetDescription','./assets/sRoi_Action_2.png');
    }

    create() {
        // Pour envoyer des informations 20 par secondes
        this.lastNetworkUpdate = 0;
        this.lastNetworkUpdate2 = 0;
        this.lastNetworkUpdate3 = 0;
        this.players = {};
        this.cartes = []; 
        this.cartes_joueur = []; // Liste d'objet CartesMinis 
        this.Turn = -1;
        // this.NbrCartesAutres = [11,11,11,11]; // 11 = le jeu n'a pas commencé.
        this.listes_echanges = [];
        this.myNum = 0;
        this.myId = -1;
        this.playerCount = 1;
        this.playerCountReady = 0;
        this.HoldCartesSelected = false;
        this.ReadySelected = false;
        this.CurrentCard = 0;
        this.special_card_power = [];
    
        this.anims.create({
            key: 'TimerAnim',
            frames: [
                { key: 'Timer_0' },
                { key: 'Timer_1' },
                { key: 'Timer_2' },
                { key: 'Timer_3' },
                { key: 'Timer_4' },
                { key: 'Timer_5' },
                { key: 'Timer_6' },
                { key: 'Timer_7' },
                { key: 'Timer_8' },
                { key: 'Timer_9' },
                { key: 'Timer_10' },
                { key: 'Timer_11' },
                { key: 'Timer_12' },
                { key: 'Timer_13' },
                { key: 'Timer_14' },
                { key: 'Timer_15' },
                { key: 'Timer_16' },
                { key: 'Timer_17' },
                { key: 'Timer_18' },
                { key: 'Timer_19' },
                { key: 'Timer_20' },
                { key: 'Timer_21' },
                { key: 'Timer_22' },
                { key: 'Timer_23' },
                { key: 'Timer_24' }
            ],
            frameRate: 2, // 2 images par seconde
            repeat: -1      // 0 = joue une fois, -1 = boucle infinie
        });

        this.anims.create({
            key: 'FlippingCardAnim',
            frames: [
                { key: 'FlippingCarte_0' },
                { key: 'FlippingCarte_1' },
                { key: 'FlippingCarte_2' },
                { key: 'FlippingCarte_3' },
                { key: 'FlippingCarte_4' },
                { key: 'FlippingCarte_5' },
                { key: 'FlippingCarte_6' }
            ],
            frameRate: 8, // 2 images par seconde
            repeat: 0      // 0 = joue une fois, -1 = boucle infinie
        });

        const transition = this.add.sprite(284.5,160 ,'Transition_0');
        transition.setDepth(1000);
        transition.play('transitionAnim'); 
        transition.on('animationcomplete', () => {
            transition.destroy();
        });

        // Décor 
        const background = this.add.sprite(284.5,160 ,'Background');
        background.setDepth(0);
        const background2 = this.add.sprite(284.5,160 ,'Background2');
        background2.setDepth(1);
        background2.setAlpha(0.1);
        const table = this.add.sprite(284.5,160 ,'Table');
        table.setDepth(50);
        const lampe = this.add.sprite(284.5,110 ,'Lampe');
        lampe.setDepth(50);
        const light = this.add.sprite(284.5,200 ,'Light');
        light.setDepth(70); 
        light.setAlpha(0.2);
        this.timerIndex = 0;
        this.timer = this.add.sprite(284.5,160 ,'Timer_0');
        this.timer.setDepth(70);
        //timer.play('TimerAnim'); 
        const objetIcon = this.add.sprite(330,100 ,'ObjetIcon_0');
        objetIcon.setDepth(70);


        // Positionnement des éléments intéractifs
        const Player_X = 45;
        const Player_Y = 235;
        const Player1_X = 295;
        const Player1_Y = 162;

        const HoldCartes_X = 284.5;
        const HoldCartes_Y = 160;
        const CarteEnJeu_X = 293-2;
        const CarteEnJeu_Y = 245+5;
        const PiocheCard_X = 257-2;
        const PiocheCard_Y = 245+5;
        const buttonSac_X = 284.5;
        const buttonSac_Y = 160;
        const buttonReady_X = 300;
        const buttonReady_Y = 160;
        const buttonEmote_X = 284.5;
        const buttonEmote_Y = 160;
        const NbrJoueurs_X = 284.5;
        const NbrJoueurs_Y = 160;
        const CartesSurTable_X = 284.5-2;
        const CartesSurTable_Y = 150+5;
        const Pioche_X = 290-2;
        const Pioche_Y = 150+5;
        const Depot_X = 290;
        const Depot_Y = 160;
        const DescriptifPower_X = 284.5;
        const DescriptifPower_Y = 160;

        // Joueur0(TOI) --------------------------------------------------------------
        const fondJoueur = this.add.sprite(284.5,160 ,'FondJoueur');
        fondJoueur.setDepth(40);
        this.PLAYER = new Player(this,Player_X ,Player_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,0, this.playerData.Username);

        // Joueur1 --------------------------------------------------------------
        this.PLAYER1 = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,1, this.playerData.Username);
        this.PLAYER1.setVisiblePlayer(false);
        // Joueur2 --------------------------------------------------------------
        this.PLAYER2 = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,2, this.playerData.Username);
        this.PLAYER2.setVisiblePlayer(false);
        // Joueur3 --------------------------------------------------------------
        this.PLAYER3 = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,3, this.playerData.Username);
        this.PLAYER3.setVisiblePlayer(false);
        // Joueur4 --------------------------------------------------------------
        this.PLAYER4 = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,4, this.playerData.Username);
        this.PLAYER4.setVisiblePlayer(false);
        this.otherPlayers = [
            this.JOUEUR1,
            this.JOUEUR2,
            this.JOUEUR3,
            this.JOUEUR4
        ];

        // NbrJoueurs --------------------------------------------------------------
        this.NbrJoueurs = this.add.sprite(NbrJoueurs_X,NbrJoueurs_Y ,'NbrJoueurs_0');
        this.NbrJoueurs.setDepth(40);
        this.NbrJoueursReady = this.add.sprite(NbrJoueurs_X,NbrJoueurs_Y+60,'NbrJoueursReady_0');
        this.NbrJoueursReady.setDepth(40);
        
        // Cartes sur table --------------------------------------------------------------
        const Pioche = this.add.sprite(Pioche_X,Pioche_Y ,'Pioche');
        Pioche.setDepth(80);

        // Pioche --------------------------------------------------------------
        const CartesSurTable = this.add.sprite(CartesSurTable_X,CartesSurTable_Y ,'CartesSurTable_0');
        CartesSurTable.setDepth(80);

        // Depot --------------------------------------------------------------
        this.Depot = new Depot(this,Depot_X,Depot_Y);

        // Descriptif pouvoirs (Roi, Reine, Valet)
        this.DescriptifPower = new DescriptifPower(this,DescriptifPower_X,DescriptifPower_Y,0);
        
        // BOUTON SAC --------------------------------------------------------------
        const sac = new Sac(this,this.PLAYER,buttonSac_X,buttonSac_Y);

        // BOUTON EMOTE --------------------------------------------------------------
        this.emotes = [];
        const buttonEmote = this.add.sprite(buttonEmote_X,buttonEmote_Y ,'btnEmote_0');
        //Depth
        buttonEmote.setDepth(100);
        buttonEmote.setAlpha(0.8);
        //Hitbox
        const buttonEmotehitbox = this.add.zone(buttonEmote_X - 262, buttonEmote_Y - 73, 40, 40);
        buttonEmotehitbox.setInteractive();  
        // Rectangle visuel pour debug
        const hitboxDebug_buttonEmote = this.add.rectangle(
            buttonEmote_X - 262,
            buttonEmote_Y- 73,
            40,
            40,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        );
        hitboxDebug_buttonEmote.setDepth(85);
        hitboxDebug_buttonEmote.setOrigin(0.5, 0.5); // centre sur la zone
        hitboxDebug_buttonEmote.setVisible(this.HITBOXES);
        // Action 
        // Fonction pour détruire tous les boutons
        this.DestroyAllButtons = () => {
            buttonEmote.setTexture('btnEmote_0');
            if (this.emotes) {
                this.emotes.forEach(emote => {
                    emote.Emote.destroy();       // sprite
                    emote.Emotehitbox.destroy(); // hitbox
                    emote.hitboxDebug_Emote.destroy(); // hitbox_display
                });
                this.emotes = [];
            }
        };

        this.ChangeEmoteValue = () => {
            this.EMOTE = !this.EMOTE;
        };

        buttonEmotehitbox.on('pointerdown', () => {
            this.ChangeEmoteValue();
            console.log('Bouton EMOTE cliqué : EMOTE =',this.EMOTE);
            if (this.EMOTE){
                buttonEmote.setTexture('btnEmote_2');
                // Exemple : créer 5 boutons Emote
                for (let i = 0; i < 13; i++) {
                    let Y = (34 * Math.trunc(i/11));
                    let X = 32 * (i % 11);
                    const btn = new Emote(this, buttonEmote_X - 165 + X, buttonEmote_Y-95+Y, i, this.PLAYER);
                    this.emotes.push(btn);
                }
            } else {
                buttonEmote.setTexture('btnEmote_0');
                this.DestroyAllButtons();
            }
        });
        // Quand la souris passe dessus
        buttonEmotehitbox.on('pointerover', () => {
            if (this.EMOTE){
                buttonEmote.setTexture('btnEmote_2');
            } else {
                buttonEmote.setTexture('btnEmote_1');
            }
        });

        // Quand la souris sort
        buttonEmotehitbox.on('pointerout', () => {
            if (this.EMOTE){
                buttonEmote.setTexture('btnEmote_2');
            } else {
                buttonEmote.setTexture('btnEmote_0');
            }
        });

        // BOUTON READY --------------------------------------------------------------
        this.buttonReady = this.add.sprite(buttonReady_X,buttonReady_Y ,'Ready');
        //Depth
        this.buttonReady.setDepth(100);
        //Hitbox
        this.buttonReadyhitbox = this.add.zone(buttonReady_X-9, buttonReady_Y+ 131, 57, 43);
        this.buttonReadyhitbox.setInteractive(); 
        // Rectangle visuel pour debug
        this.hitboxDebug_buttonReady = this.add.rectangle(
            buttonReady_X-9,
            buttonReady_Y + 131,
            57,
            43,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        this.hitboxDebug_buttonReady.setDepth(101);
        this.hitboxDebug_buttonReady.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxDebug_buttonReady.setVisible(this.HITBOXES);
        // Action 
        this.buttonReadyhitbox.on('pointerdown', () => {
            this.ReadySelected = !this.ReadySelected;
            console.log('Bouton READY cliqué : ' + this.ReadySelected);
            this.SendReady(this.ReadySelected);
            if (this.ReadySelected){
                this.buttonReady.setTexture('NotReady');
            } else {
                this.buttonReady.setTexture('Ready');
            }
        });

        // Elements quand la partie a commencée --------------------------------------------------------------
        // Carte en Jeu et PiocheCard --------------------------------------------------------------
        this.CarteEnJeu = new CarteEnJeu(this,CarteEnJeu_X,CarteEnJeu_Y,0,false);
        this.PiocheCard = new PiocheCard(this,PiocheCard_X,PiocheCard_Y,false);

        // BOUTON HoldCartes --------------------------------------------------------------
        this.HoldCartes = new HoldCartes(this,this.PLAYER,HoldCartes_X,HoldCartes_Y);
        this.events.on("distributionTerminee", () => {
            let mesCartes = this.MyCards();
            console.log("Mes Cartes sont : " + mesCartes);
            if (mesCartes != null) {
                this.HoldCartes.addCartes(mesCartes);
            }
        });

        // ====================================================== //
        // ===================== NETWORK ======================== //
        // ====================================================== //

        this.socket = new WebSocket("ws://localhost:6510");
        this.socket.addEventListener("message", (event) => {
            //console.log("Message reçu :", event.data);
            const data = JSON.parse(event.data);
            if (data.type === "welcome") {
                console.log("Message welcome reçu");
                this.myNum = data.payload.num;
                this.myId = data.payload.id;
                console.log("Mon ID :", this.myId);
                console.log("Mon numéro :", this.myNum);
            }
            if (data.type === "worldUpdate") {
                this.players = data.payload.players;
                this.updatePlayers();
                if (this.playerCount != data.payload.playerCount){
                    this.playerCount = data.payload.playerCount;
                    this.updatePlayersPosition();
                    console.log("Nombre de joueurs :", this.playerCount);
                }
                if (this.playerCountReady != data.payload.playerCountReady){
                    this.playerCountReady = data.payload.playerCountReady;
                }
            }
            if (data.type === "NbrReady"){
                this.playerCountReady = data.payload;
            }
            if (data.type === "RoomState"){
                this.roomState = data.payload;
                if (this.roomState === RoomState.GAME_STARTED){ // A SUP
                    console.log("On peut commencer !");
                    this.buttonReady.setVisible(false);
                    this.hitboxDebug_buttonReady.setVisible(false);
                    this.buttonReadyhitbox.disableInteractive();
                    this.CarteEnJeu.sprite.setVisible(true);
                    this.CarteEnJeu.StartAnimation();
                    this.PiocheCard.setVisible(true);
                    this.PiocheCard.StartAnimationDistribution();
                    this.PiocheCard.StartAnimation();
                    this.HoldCartes.HoldCartes.setVisible(true);
                    this.HoldCartes.HoldCarteshitbox.setInteractive();
                    this.HoldCartes.hitboxHoldCartesDebug.setVisible(this.HITBOXES);
                }
            }
            if (data.type === "GAME_START"){
                console.log("Je connais mes cartes.");
                this.cartes = data.payload;
            }
            if (data.type === "gameUpdate"){
                this.Turn = data.payload.Turn;
                this.CurrentCard = data.payload.CurrentCard;
                this.cartes = data.payload.Cartes;
                this.special_card_power = data.payload.Special_Power;
                this.DescriptifPower.update(this.special_card_power[0].power);
                this.DescriptifPower.updatesprite();
            }
            if (data.type === "EchangeUpdate"){
                this.listes_echanges = data.payload;
            }
            if (data.type === "TimerUpdate"){
                this.timerIndex = data.payload;
            }
            if (data.type === "Pioche"){
                if (data.payload === this.myNum){
                    // Lancer animation de je reçois une carte
                    this.PiocheCard.StartAnimation_ReceivingCard();
                } else {
                    // Lancer animation adversaire reçoit une carte
                    this.PiocheCard.StartAnimation_OtherReceivingCard();
                }
            }
            if (data.type === "CardPlayed"){
                if (data.payload === this.myNum){
                    // Lancer animation de je reçois une carte
                    this.PiocheCard.StartAnimation_GivingCard();
                } else {
                    // Lancer animation adversaire reçoit une carte
                    this.PiocheCard.StartAnimation_OtherGivingCard();
                }
            }
            if (data.type === "CancelEchange"){
                this.listes_echanges = data.payload;
                for (let e of this.listes_echanges) {
                    if (e.Destination == this.myNum) {
                        console.log("ECHANGE ANNULE !"); // A SUP
                        const player = this.givePlayerBasedOnNum(e.Source);
                        if (player) {
                            player.cartesShow.resetCardsPosition();
                        }
                    }else if (e.Source == this.myNum) {
                        console.log("ECHANGE ANNULE !"); // A SUP
                        const player = this.givePlayerBasedOnNum(e.Destination);
                        if (player) {
                            player.cartesShow.resetCardsPosition();
                        }
                    }
                }
            }
            if (data.type === "playerProposeEchange"){
                console.log("Echange Proposé : " + data.payload.Destination);
                if (data.payload.Destination === this.myNum){
                    console.log("On me propose un échange : " + data.payload.Source+ "/ Valeur : "+ data.payload.CarteValeur); // A SUP

                }
            }
            if (data.type === "serverFull") {
                alert("Le serveur est plein 😢");
                this.socket.close();
                return;
            }
        });
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({
                type: "joinRoom",
                payload: this.playerData 
            })); 
        }
        console.log("GameRoom lancée !");
    }

    // ====================================================== //
    // ====================== UPDATE ======================== //
    // ====================================================== //

    update(time, delta) {
        this.NbrJoueurs.setTexture('NbrJoueurs_' + this.playerCount);
        this.NbrJoueursReady.setTexture('NbrJoueursReady_' + this.playerCountReady);

        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
        if (time > this.lastNetworkUpdate + 50) { // 50ms = 20 fois/sec
            this.lastNetworkUpdate = time;
            this.socket.send(JSON.stringify({
                type: "playerUpdate",
                payload: this.PLAYER.getInformations()
            }));
        }
        
        switch(this.roomState) {
            case RoomState.WAITING_PLAYERS:
                this.PLAYER.cartesShow.nbrCartes.setTexture('NbrCartes_11');
                //this.updateWaiting();
                break;
            case RoomState.GAME_STARTED:
                let mesCartes = this.MyCards();
                //console.log(mesCartes);
                if (mesCartes != null) {
                    this.PLAYER.cartesShow.nbrCartes.setTexture('NbrCartes_' + mesCartes.length);
                    this.updatePlayerMyCards(mesCartes);
                    this.HoldCartes.updateCartes(mesCartes);
                }
                if (time > this.lastNetworkUpdate2 + 50) { // 50ms = 20 fois/sec
                    this.lastNetworkUpdate2 = time;
                    this.socket.send(JSON.stringify({
                        type: "GameInfo"
                    }));
                }
                if (time > this.lastNetworkUpdate3 + 50) { // 50ms = 20 fois/sec
                    this.lastNetworkUpdate3 = time;
                    this.socket.send(JSON.stringify({
                        type: "EchangeUpdate"
                    }));
                }
                this.updateGame(time);
                break;

            case RoomState.GAME_PAUSED:
                break;
            case RoomState.GAME_ENDED:
                break;
        }
        
    }

    updateGame(time){
        this.CarteEnJeu.ChangeSprite(this.CurrentCard);
        this.timer.setTexture('Timer_' + this.timerIndex);
        if (this.Turn === this.myNum){
            this.Depot.setVisible(true);
            this.PLAYER.ChangeNameTagSprite(1);
        } else {
            this.Depot.setVisible(false);
            this.PLAYER.ChangeNameTagSprite(0);
            this.updatePlayers();
        }
        this.updateEchange();
    }

    getPosition(players){
        for (let id in players) {
            if (id === this.myId) return id;
        }
    }

    // ====================================================== //
    // ================== UPDATE PLAYERS ==================== //
    // ====================================================== //

    updatePlayers(){
        const playersArray = Object.values(this.players).sort((a, b) => a.num - b.num); // important pour un ordre stable
        const cartesArray = Object.values(this.cartes).sort((a, b) => a.num - b.num);
        const myIndex = playersArray.findIndex(p => p.id === this.myId);
        const circularList = this.buildCircularList(playersArray, myIndex);
        const NbrCartesAutres = this.buildCircularList_Cards(cartesArray,myIndex);
        let TurnList = [0,0,0,0];
        switch (circularList.length){
            case 1 :
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                }
                
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false,TurnList[0]);
                break;
            case 2 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false,TurnList[1]);
                break;
            case 3 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                } else if (this.Turn === circularList[2].num){
                    TurnList[2] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false,TurnList[1]);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    circularList[2].Looking_Down,
                    circularList[2].num,
                    circularList[2].playerName,
                    NbrCartesAutres[2],
                    false, false,false,TurnList[2]);
                break;
            case 4 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                } else if (this.Turn === circularList[2].num){
                    TurnList[2] = 1;
                } else if (this.Turn === circularList[3].num){
                    TurnList[3] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false,TurnList[1]);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    circularList[2].Looking_Down,
                    circularList[2].num,
                    circularList[2].playerName,
                    NbrCartesAutres[2],
                    false, false,false,TurnList[2]);
                this.PLAYER4.updatePlayerGlobal(
                    circularList[3].skinTeteIndex,
                    circularList[3].skinCorpsIndex,
                    circularList[3].emotion, 
                    circularList[3].Looking_Down,
                    circularList[3].num,
                    circularList[3].playerName,
                    NbrCartesAutres[3],
                    false, false,false,TurnList[3]);
                break;
        }
    }

    updatePlayersPosition(){
        //console.log("Mon numéro :" + this.myNum);
        const playersArray = Object.values(this.players).sort((a, b) => a.num - b.num); // important pour un ordre stable
        const cartesArray = Object.values(this.cartes).sort((a, b) => a.num - b.num);
        const myIndex = playersArray.findIndex(p => p.id === this.myId);
        const circularList = this.buildCircularList(playersArray, myIndex);
        const NbrCartesAutres = this.buildCircularList_Cards(cartesArray,myIndex);
        switch(this.playerCount){
            case 1 :
                this.PLAYER1.setVisiblePlayer(false);
                this.PLAYER2.setVisiblePlayer(false);
                this.PLAYER3.setVisiblePlayer(false);
                this.PLAYER4.setVisiblePlayer(false);
                break;
            case 2 :
                this.PLAYER1.setVisiblePlayer(true);
                this.PLAYER1.setPosition(295,162);
                console.log(circularList[0]);
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false);
                this.PLAYER2.setVisiblePlayer(false);
                this.PLAYER2.setPosition(-500,-500);
                this.PLAYER3.setVisiblePlayer(false);
                this.PLAYER3.setPosition(-500,-500);
                this.PLAYER4.setVisiblePlayer(false);
                this.PLAYER4.setPosition(-500,-500);
                break;
            case 3 :
                this.PLAYER1.setVisiblePlayer(true);
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false);
                this.PLAYER1.setPosition(175,170);
                this.PLAYER2.setVisiblePlayer(true);
                this.PLAYER2.setPosition(415,170);
                console.log(circularList[1]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false);
                this.PLAYER3.setVisiblePlayer(false);
                this.PLAYER3.setPosition(-500,-500);
                this.PLAYER4.setVisiblePlayer(false);
                this.PLAYER4.setPosition(-500,-500);
                break;
            case 4 :
                this.PLAYER1.setVisiblePlayer(true);
                this.PLAYER1.setPosition(175,170);
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false);
                this.PLAYER2.setVisiblePlayer(true);
                this.PLAYER2.setPosition(295,162);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false);
                this.PLAYER3.setVisiblePlayer(true);
                this.PLAYER3.setPosition(415,170);
                console.log(circularList[2]);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    circularList[2].Looking_Down,
                    circularList[2].num,
                    circularList[2].playerName,
                    NbrCartesAutres[2],
                    false, false,false);
                this.PLAYER4.setVisiblePlayer(false);
                this.PLAYER4.setPosition(-500,-500);
                break;
            case 5 :
                this.PLAYER1.setVisiblePlayer(true);
                this.PLAYER1.setPosition(143,174);
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    circularList[0].Looking_Down,
                    circularList[0].num,
                    circularList[0].playerName,
                    NbrCartesAutres[0],
                    false, false,false);
                this.PLAYER2.setVisiblePlayer(true);
                this.PLAYER2.setPosition(245,170);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    circularList[1].Looking_Down,
                    circularList[1].num,
                    circularList[1].playerName,
                    NbrCartesAutres[1],
                    false, false,false);
                this.PLAYER3.setVisiblePlayer(true);
                this.PLAYER3.setPosition(345,170);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    circularList[2].Looking_Down,
                    circularList[2].num,
                    circularList[2].playerName,
                    NbrCartesAutres[2],
                    false, false,false);
                this.PLAYER4.setVisiblePlayer(true);
                this.PLAYER4.setPosition(438,174);
                console.log(circularList[3]);
                this.PLAYER4.updatePlayerGlobal(
                    circularList[3].skinTeteIndex,
                    circularList[3].skinCorpsIndex,
                    circularList[3].emotion, 
                    circularList[3].Looking_Down,
                    circularList[3].num,
                    circularList[3].playerName,
                    NbrCartesAutres[3],
                    false, false,false);
                break;
        }
    }

    // ====================================================== //
    // ===================== ECHANGES ======================= //
    // ====================================================== //

    updateEchange() {
        for (let e of this.listes_echanges) {
            // 🎯 Je suis DESTINATION
            if (e.Destination == this.myNum) {
                //console.log("Je suis la Destination d'un échange !"); // A SUP
                const player = this.givePlayerBasedOnNum(e.Source);
                if (!player) continue;
                player.cartesShow.updateEchangeProposeValues(e.EchangeProposeDestination, e.AccepteDestination);
                player.cartesShow.setEchangePropose(
                    e.carteSource,                  // carte envoyée par la source
                    e.EchangeProposeSource,         // la source propose ?
                    e.AccepteSource,                // la source a accepté ?
                    e.TimerValue
                );
            }
            // 🎯 Je suis SOURCE
            else if (e.Source == this.myNum) {
                //console.log("Je suis la Source d'un échange !"); // A SUP
                const player = this.givePlayerBasedOnNum(e.Destination);
                if (!player) continue;
                player.cartesShow.updateEchangeProposeValues(e.EchangeProposeSource, e.AccepteSource);
                player.cartesShow.setEchangePropose(
                    e.carteDestination,             // carte envoyée par destination
                    e.EchangeProposeDestination,    // destination propose ?
                    e.AccepteDestination,           // destination a accepté ?
                    e.TimerValue
                );
            }
        }
    }

    updatePlayerMyCards(Cartes) {
        for (let i= 0;i < Cartes.length;i++){
            if ((!this.cartes_joueur[i]) || (this.cartes_joueur[i] == -1)) {
                this.cartes_joueur[i] = new CartesMini(this,this.x,this.y,Cartes[i].Valeur,this.myNum,true,false,false,true,null,true);
            } else {
                this.cartes_joueur[i].updateValue(Cartes[i].Valeur);
            }
        }
        this.deleteUselessElements(Cartes,this.cartes_joueur);
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

    UpdateCardValues(x,y,value,Seen,Echange,cliquable,draggable,PlayerEchange){
        for (let i= 0;i < this.cartes_joueur.length;i++){
            if ((this.cartes_joueur[i]) && (this.cartes_joueur[i] != -1) ) {
                if (this.cartes_joueur[i].Valeur === value) {
                    if (Seen != null){
                        this.cartes_joueur[i].Seen = Seen;
                    }
                    this.cartes_joueur[i].Echange = Echange;
                    this.cartes_joueur[i].cliquable = cliquable;
                    this.cartes_joueur[i].draggable = draggable;
                    this.cartes_joueur[i].PlayerEchange = PlayerEchange;
                    if (this.HoldCartes.cartes[i]){
                        this.HoldCartes.cartes[i].CarteEnEchange(Echange);
                    }
                }
            }
        }
        // console.log(this.cartes_joueur); // A SUP 
    }

    // ====================================================== //
    // ======================== UTILS ======================= //
    // ====================================================== //

    giveNumBasedOnNumPlayer(Num) {
        const playersArray = Object.values(this.players).sort((a, b) => a.num - b.num); // important pour un ordre stable
        const myIndex = playersArray.findIndex(p => p.id === this.myId);
        const circularList = this.buildCircularList(playersArray, myIndex);
        return circularList[(Num-1)].num;
    }

    givePlayerBasedOnNum(NUM){
        if (this.PLAYER1.NUM){
            if (this.PLAYER1.NUM === NUM){
                return this.PLAYER1;
            }
        }
        if (this.PLAYER2.NUM){
            if (this.PLAYER2.NUM === NUM){
                return this.PLAYER2;
            }
        }
        if (this.PLAYER3.NUM){
            if (this.PLAYER3.NUM === NUM){
                return this.PLAYER3;
            }
        }
        if (this.PLAYER4.NUM){
            if (this.PLAYER4.NUM === NUM){
                return this.PLAYER4;
            }
        }
    }

    buildCircularList(playersArray, myIndex){
        const circularPlayers = [];
        for (let i = 1; i < playersArray.length; i++) {
            const index = (myIndex + i) % playersArray.length;
            circularPlayers.push(playersArray[index]);
        }
        return circularPlayers;
    }

    buildCircularList_Cards(cartesArray, myIndex){
        const circularPlayers = [];
        for (let i = 1; i < cartesArray.length; i++) {
            const index = (myIndex + i) % cartesArray.length;
            circularPlayers.push(cartesArray[index].cartes_joueur);
        }
        return circularPlayers;
    }

    buildCircularList_Cards_Length(cartesArray, myIndex){
        const circularPlayers = [];
        for (let i = 1; i < cartesArray.length; i++) {
            const index = (myIndex + i) % cartesArray.length;
            circularPlayers.push(cartesArray[index].cartes_joueur.length);
        }
        return circularPlayers;
    }

    SendReady(bool){
        this.socket.send(JSON.stringify({
            type: "ReadyOrNot",
            payload: bool
        }));
    }

    MyCards(){
        const player = this.cartes.find(p => p.num === this.myNum);
        return player ? player.cartes_joueur : [];
    }

    CardsOf(i){
        const player = this.cartes.find(p => p.num === i);
        return player ? player.cartes_joueur : [];
    }
}
