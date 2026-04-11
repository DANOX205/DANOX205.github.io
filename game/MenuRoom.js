export class MenuRoom extends Phaser.Scene {
    constructor() {
        super("MenuRoom");
    }

    preload() {
        // On load les images
        this.load.image('Background','./assets/sBackground_0.png');
        this.load.image('Background2','./assets/sBackground2_0.png');
        this.load.image('Table','./assets/sTable_0.png');
        this.load.image('Lampe','./assets/sLampe_0.png');
        this.load.image('Light','./assets/sLight_0.png');
        this.load.image('btnCheatOff','./assets/sCheats_2_0.png');
        this.load.image('btnCheatOn','./assets/sCheats_2_1.png');
        this.load.image('Version','./assets/sVersion_0.png');
        this.load.image('btnEmote_0','./assets/sEmote_Bouton_0.png');
        this.load.image('btnEmote_1','./assets/sEmote_Bouton_1.png');
        this.load.image('btnEmote_2','./assets/sEmote_Bouton_2.png');
        this.load.image('SwitchCosmetic','./assets/sSwitch_Cosmetic_0.png');
        for (let i = 0; i <= 11; i++) {  // 12 images (0 à 11)
            this.load.image('Emote_' + i, './assets/sEmotes_' + i + '.png');
        }
        this.load.image('Emote_0','./assets/sEmote_0.png');
        this.load.image('btnPlay','./assets/sPlay_new_0.png');
        for (let i = 0;i <=3 ; i++) { // 4 images (0 à 3)
            this.load.image('Rules_'+i,'./assets/sRules_' + i + '.png');    
        }
        for (let i = 0;i <=1 ; i++) { 
            this.load.image('InitServer_'+i,'./assets/sInitServer_' + i + '.png');    
        }
        this.load.image('btnFullScreenOFF','./assets/sFullScreen_0.png');
        this.load.image('btnFullScreenON','./assets/sFullScreen_1.png');

        // Pour le Joueur
        this.load.image('TeteBlank','./assets/sTete_Blank_0.png');
        this.load.image('TeteLunettes','./assets/sLunettes_Perso_0.png');
        this.load.image('CorpsMenottes','./assets/sMenottes_Perso_0.png');
        for (let i = 0; i <= 11; i++) {  // 12 images (0 à 11)
            this.load.image('TeteSup_' + i, './assets/sTete_Sup_' + i + '.png');
            this.load.image('TeteFace_' + i, './assets/sTete_Face_' + i + '.png');
        }
        for (let i = 0; i <= 2; i++) {  // 3 images (0 à 2)
            this.load.image('OeilDroit_' + i, './assets/sOeil_Droit_' + i + '.png');
            this.load.image('OeilGauche_' + i, './assets/sOeil_Gauche_' + i + '.png');
        }
        // Skins pour la tête
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin1_' + i, './assets/sTete_Roi_Coeur_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin2_' + i, './assets/sTete_Roi_Trefle_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin3_' + i, './assets/sTete_Roi_Pique_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin4_' + i, './assets/sTete_Roi_Carreau_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin5_' + i, 'assets/sTete_Jester_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('TeteSkin6_' + i, 'assets/sTete_Witch_' + i + '.png');
        }

        this.load.image('TeteSweat','./assets/sTete_sweat_0.png');

        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('Corps_' + i, './assets/sCorps_' + i + '.png');
        }

        // Skins pour le corps
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin1_' + i, './assets/sCorps_Roi_Rouge_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin2_' + i, './assets/sCorps_Roi_Noir_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin3_' + i, './assets/sCorps_Suit_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin4_' + i, './assets/sCorps_Armor_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin5_' + i, 'assets/sCorps_Jester_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('CorpsSkin6_' + i, 'assets/sCorps_Witch_' + i + '.png');
        }


        for (let i = 0; i <= 11; i++) {  // 12 images (0 à 11)
            this.load.image('NbrCartes_' + i, './assets/sNbr_Cartes_others_' + i + '.png');
        }

        this.load.image('Cartes','./assets/sCartes_Default_0.png');
        this.load.image('CartesSelected','./assets/sCartes_Default_3.png');
        this.load.image('CartesShow','./assets/sCarte_Show_0.png');
        this.load.image('CartesShowEchange','./assets/sCarte_Show_Echange_0.png');
        this.load.image('CartesShowEchangeBouton','./assets/sCarte_Echanger_0.png');
        this.load.image('CartesShowEchangeBoutonSelected','./assets/sCarte_Echanger_1.png');
        this.load.image('CartesShowEchangeCancel','./assets/sCarte_Show_Cancel_Echange_0.png');
        this.load.image('CartesShowEchangeAccept','./assets/sCarte_Show_Cancel_Echange_1.png');
        this.load.image('EchangeEnCours','./assets/sCard_Echange_Player_0.png');
        this.load.image('EchangeAccepte','./assets/sCard_Echange_Accepted_Player_0.png');
        for (let i = 0; i <= 41; i++) {  // 42 images (0 à 41)
            this.load.image('EchangeTimer_' + i, './assets/sEchange_Timer_' + i + '.png');
        }
        this.load.image('AlertEchangePropose','./assets/sAlert_Propose_Echange_0.png');

        //Nametag
        this.load.image('Nametag','./assets/sNametag_0.png');

        // On load les animations 
        for (let i = 0; i <= 18; i++) {  // 19 images (0 à 18)
            this.load.image('Transition_' + i, './assets/sTransition_' + i + '.png');
        }
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('Titre_' + i, './assets/sNewTitle_' + i + '.png');
        }
        
        // Autres
        for (let i = 0; i <= 53; i++) {  // 54 images (0 à 53)
            this.load.image('CartesMinis_' + i, './assets/oCartes_Main_' + i + '.png');
        }
    }

    // Variables Globales pour le jeu
    
    create() {
        window.scrollTo(0, 1);

        this.TRICHE = false;
        this.EMOTE = false;
        this.SkinTeteIndex = 0;
        this.SkinCorpsIndex = 0;
        this.NbrSkinTete = 6;
        this.NbrSkinCorps = 6;

        // Transition du Début
        this.anims.create({
            key: 'transitionAnim',
            frames: [
                { key: 'Transition_0' },
                { key: 'Transition_1' },
                { key: 'Transition_2' },
                { key: 'Transition_3' },
                { key: 'Transition_4' },
                { key: 'Transition_5' },
                { key: 'Transition_6' },
                { key: 'Transition_7' },
                { key: 'Transition_8' },
                { key: 'Transition_9' },
                { key: 'Transition_10' },
                { key: 'Transition_11' },
                { key: 'Transition_12' },
                { key: 'Transition_13' },
                { key: 'Transition_14' },
                { key: 'Transition_15' },
                { key: 'Transition_16' },
                { key: 'Transition_17' },
                { key: 'Transition_18' }
            ],
            frameRate: 10, // 10 images par seconde
            repeat: 0      // 0 = joue une fois, -1 = boucle infinie
        });
        this.anims.create({
            key: 'TitreAnim',
            frames: [
                { key: 'Titre_0' },
                { key: 'Titre_1' }
            ],
            frameRate: 10, // 10 images par seconde
            repeat: -1      // 0 = joue une fois, -1 = boucle infinie
        });

        const transition = this.add.sprite(284.5,160 ,'Transition_0');
        transition.setDepth(1000);
        transition.play('transitionAnim'); 
        transition.on('animationcomplete', () => {
            transition.destroy();
        });

        // Titre 
        this.titre = this.add.sprite(277,-200 ,'Titre_0');
        this.titre.setDepth(5);
        this.titre.play('TitreAnim');
        this.titreFinalY = 110;
        this.titreVelocityY = 0;
        this.titreGravity = 0.3;
        this.titreBounce = 0.6;
        this.titreStopped = false;

        // Décor 
        const background = this.add.sprite(284.5,160 ,'Background');
        background.setDepth(0);
        const background2 = this.add.sprite(284.5,160 ,'Background2');
        background2.setDepth(1);
        background2.setAlpha(0.1);
        const version = this.add.sprite(284.5,160 ,'Version');
        version.setDepth(10);
        const table = this.add.sprite(284.5,160 ,'Table');
        table.setDepth(50);
        const lampe = this.add.sprite(284.5,110 ,'Lampe');
        lampe.setDepth(50);
        const light = this.add.sprite(284.5,200 ,'Light');
        light.setDepth(70);
        light.setAlpha(0.2);

        // Positionnement des éléments intéractifs

        const buttonCheat_X = 284.5;
        const buttonCheat_Y = 160;
        const buttonEmote_X = 284.5;
        const buttonEmote_Y = 160;
        const buttonRules_X = 286;
        const buttonRules_Y = 160;
        const buttonFullScreen_X = 284.5;
        const buttonFullScreen_Y = 160;
        const buttonPlay_X = 284.5 - 250;
        const buttonPlay_Y = 160;
        const Player_X = 295;
        const Player_Y = 162;
        const Nametag_X = 287;
        const Nametag_Y = 130;
        const switchCosmeticTete_1_X = 225;
        const switchCosmeticTete_1_Y = 140;
        const switchCosmeticTete_2_X = 358;
        const switchCosmeticTete_2_Y = 140;
        const switchCosmeticCorps_1_X = 245;
        const switchCosmeticCorps_1_Y = 210;
        const switchCosmeticCorps_2_X = 338;
        const switchCosmeticCorps_2_Y = 210;

        // BOUTON FULLSCREEN --------------------------------------------------------------
        const buttonFullScreen = new FullScreen(this,buttonFullScreen_X,buttonFullScreen_Y);
        // this.Selected
        this.buttonRules = new DisplayRules(this,buttonRules_X,buttonRules_Y);

        // Joueur --------------------------------------------------------------
        const PLAYER = new Player(this,Player_X ,Player_Y);

        // Nametag --------------------------------------------------------------
        this.playerName = "toi";
        this.isEditingName = false;
        // Background nametag
        this.nameTag = this.add.sprite(Nametag_X, Nametag_Y, 'Nametag');
        this.nameTag.setDepth(80);
        // Texte
        this.nameText = this.add.text(Nametag_X + 5, Nametag_Y - 96, this.playerName, {
            fontFamily: 'Kristen',
            fontSize: '24px',
            fontStyle: "bold",
            color: '#ffffff'
        }).setOrigin(0.5);
        this.nameText.setDepth(100);
        // Hitbox
        const nameTaghitbox = this.add.zone(Nametag_X + 5, Nametag_Y - 96 , 150, 34);
        nameTaghitbox.setInteractive();
        // Rectangle visuel pour debug
        const nameTaghitboxDebug = this.add.rectangle(
            Nametag_X + 5,
            Nametag_Y - 96,
            150,
            34,
            0xff0000, // couleur rouge
            0.25       // opacité 0.5
        );
        nameTaghitboxDebug.setDepth(85);
        nameTaghitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action
        nameTaghitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
                const input = document.getElementById("nameInput");
                input.focus();
                this.isEditingName = true;
                this.playerName = "";
                this.editOverlay.setVisible(true);
                this.editHint.setVisible(true);
                this.tweens.add({
                    targets: this.nameText,
                    alpha: 0.5,
                    duration: 500,
                    yoyo: true,
                    repeat: -1
                });
            }
        });
        // Nametag
        this.editOverlay = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.5
        );
        this.editOverlay.setDepth(90);
        this.editOverlay.setVisible(false);
        this.editHint = this.add.text(Nametag_X + 5, Nametag_Y - 110, "Entrez votre nom", {
            fontSize: '15px',
            color: '#616161'
        }).setOrigin(0.5).setDepth(100).setVisible(false);

        this.input.keyboard.on('keydown', (event) => {
            if (!this.isEditingName) return;
            if (event.key === "Enter") {
                const trimmedName = this.playerName.trim();

                if (trimmedName.length > 0) {
                    this.isEditingName = false;
                    this.editOverlay.setVisible(false);
                    this.editHint.setVisible(false);
                    this.tweens.killTweensOf(this.nameText);
                    this.nameText.setAlpha(1);
                } else {
                    console.log("Nom invalide !");
                }
            }
            else if (event.key === "Backspace") {
                this.playerName = this.playerName.slice(0, -1);
            }
            else if (event.key.length === 1 && this.playerName.length < 10) {
                this.playerName += event.key;
            }
            this.nameText.setText(this.playerName);
        });


        // BOUTON CHEAT --------------------------------------------------------------
        const buttonCheat = this.add.sprite(buttonCheat_X,buttonCheat_Y ,'btnCheatOff');
        //Depth
        buttonCheat.setDepth(80);
        //Hitbox
        const buttonCheathitbox = this.add.zone(buttonCheat_X + 240, buttonCheat_Y + 105, 90, 110);
        buttonCheathitbox.setInteractive();  
        // Rectangle visuel pour debug
        const hitboxDebug = this.add.rectangle(
            buttonCheat_X + 240,
            buttonCheat_Y + 105,
            90,
            110,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        );
        hitboxDebug.setDepth(85);
        hitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        buttonCheathitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
                this.TRICHE = !this.TRICHE;
                console.log('Bouton TRICHE cliqué : TRICHE =',this.TRICHE);
                if (this.TRICHE){
                    buttonCheat.setTexture('btnCheatOn');
                } else {
                    buttonCheat.setTexture('btnCheatOff');
                }
            }
        });

        // BOUTON EMOTE --------------------------------------------------------------
        this.emotes = [];
        const buttonEmote = this.add.sprite(buttonEmote_X,buttonEmote_Y ,'btnEmote_0');
        //Depth
        buttonEmote.setDepth(80);
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
            console.log('Bouton TRICHE cliqué : EMOTE =',this.EMOTE);
            if (this.EMOTE){
                buttonEmote.setTexture('btnEmote_2');
                // Exemple : créer 5 boutons Emote
                for (let i = 0; i < 11; i++) {
                    const btn = new Emote(this, buttonEmote_X - 165 + i*32, buttonEmote_Y-95, i, PLAYER);
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

        // BOUTON PLAY --------------------------------------------------------------
        const buttonPlay = this.add.sprite(buttonPlay_X,buttonPlay_Y ,'btnPlay');
        //Depth
        buttonPlay.setDepth(79);
        //Hitbox
        const buttonPlayhitbox = this.add.zone(buttonPlay_X+ 7, buttonPlay_Y+ 101, 62, 98);
        buttonPlayhitbox.setInteractive(); 
        // Rectangle visuel pour debug
        const hitboxDebug_buttonPlay = this.add.rectangle(
            buttonPlay_X + 7,
            buttonPlay_Y + 101,
            62,
            98,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        hitboxDebug_buttonPlay.setDepth(85);
        hitboxDebug_buttonPlay.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        buttonPlayhitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected) {
                console.log('Bouton PLAY cliqué.');
                const playerData = {
                    SkinTeteIndex: this.SkinTeteIndex,
                    SkinCorpsIndex: this.SkinCorpsIndex,
                    Username: this.playerName,
                    Emotion: PLAYER.getEmotion(),
                    Triche : this.TRICHE
                };
                this.scene.start("GameRoom", {playerData : playerData});
            }
        });

        // BOUTON Switch Cosmetics --------------------------------------------------------------
        const switchCosmeticTete_1 = this.add.sprite(switchCosmeticTete_1_X,switchCosmeticTete_1_Y ,'SwitchCosmetic');
        const switchCosmeticTete_2 = this.add.sprite(switchCosmeticTete_2_X,switchCosmeticTete_2_Y ,'SwitchCosmetic');
        switchCosmeticTete_2.setFlipX(-1, 1);
        //Depth
        switchCosmeticTete_1.setDepth(79);
        switchCosmeticTete_2.setDepth(79);
        //Hitbox
        const switchCosmeticTete_1hitbox = this.add.zone(switchCosmeticTete_1_X, switchCosmeticTete_1_Y, 30, 30);
        switchCosmeticTete_1hitbox.setInteractive(); 
        const switchCosmeticTete_2hitbox = this.add.zone(switchCosmeticTete_2_X + 2, switchCosmeticTete_2_Y, 30, 30);
        switchCosmeticTete_2hitbox.setInteractive(); 
        // Rectangles visuels pour debug
        const hitboxDebug_switchCosmeticTete_1 = this.add.rectangle(
            switchCosmeticTete_1_X,
            switchCosmeticTete_1_Y,
            30,
            30,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        hitboxDebug_switchCosmeticTete_1.setDepth(85);
        hitboxDebug_switchCosmeticTete_1.setOrigin(0.5, 0.5); // centre sur la zone
        const hitboxDebug_switchCosmeticTete_2 = this.add.rectangle(
            switchCosmeticTete_2_X + 2,
            switchCosmeticTete_2_Y,
            30,
            30,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        hitboxDebug_switchCosmeticTete_2.setDepth(85);
        hitboxDebug_switchCosmeticTete_2.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        switchCosmeticTete_2hitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
                console.log('Bouton CosmeticTete_2 cliqué.');
                if (this.SkinTeteIndex < this.NbrSkinTete) {
                    this.SkinTeteIndex = this.SkinTeteIndex + 1;
                    PLAYER.setSkinTete(this.SkinTeteIndex);
                }
            }
        });
        switchCosmeticTete_1hitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
            console.log('Bouton CosmeticTete_1 cliqué.');
                if (this.SkinTeteIndex > 0) {
                    this.SkinTeteIndex = this.SkinTeteIndex - 1;
                    PLAYER.setSkinTete(this.SkinTeteIndex);
                }
            }
        });

        const switchCosmeticCorps_1 = this.add.sprite(switchCosmeticCorps_1_X,switchCosmeticCorps_1_Y ,'SwitchCosmetic');
        const switchCosmeticCorps_2 = this.add.sprite(switchCosmeticCorps_2_X,switchCosmeticCorps_2_Y ,'SwitchCosmetic');
        switchCosmeticCorps_2.setFlipX(-1, 1);
        //Depth
        switchCosmeticCorps_1.setDepth(79);
        switchCosmeticCorps_2.setDepth(79);
        //Hitbox
        const switchCosmeticCorps_1hitbox = this.add.zone(switchCosmeticCorps_1_X, switchCosmeticCorps_1_Y, 30, 30);
        switchCosmeticCorps_1hitbox.setInteractive(); 
        const switchCosmeticCorps_2hitbox = this.add.zone(switchCosmeticCorps_2_X + 2, switchCosmeticCorps_2_Y, 30, 30);
        switchCosmeticCorps_2hitbox.setInteractive(); 
        // Rectangles visuels pour debug
        const hitboxDebug_switchCosmeticCorps_1 = this.add.rectangle(
            switchCosmeticCorps_1_X,
            switchCosmeticCorps_1_Y,
            30,
            30,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        hitboxDebug_switchCosmeticCorps_1.setDepth(85);
        hitboxDebug_switchCosmeticCorps_1.setOrigin(0.5, 0.5); // centre sur la zone
        const hitboxDebug_switchCosmeticCorps_2 = this.add.rectangle(
            switchCosmeticCorps_2_X + 2,
            switchCosmeticCorps_2_Y,
            30,
            30,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        hitboxDebug_switchCosmeticCorps_2.setDepth(85);
        hitboxDebug_switchCosmeticCorps_2.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        switchCosmeticCorps_2hitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
                console.log('Bouton CosmeticTete_2 cliqué.');
                if (this.SkinCorpsIndex < this.NbrSkinCorps) {
                    this.SkinCorpsIndex = this.SkinCorpsIndex + 1;
                    PLAYER.setSkinCorps(this.SkinCorpsIndex);
                }
            }
        });
        switchCosmeticCorps_1hitbox.on('pointerdown', () => {
            if (!this.buttonRules.Selected){
                console.log('Bouton CosmeticTete_1 cliqué.');
                if (this.SkinCorpsIndex > 0) {
                    this.SkinCorpsIndex = this.SkinCorpsIndex - 1;
                    PLAYER.setSkinCorps(this.SkinCorpsIndex);
                }
            }
        });
    }

    update() {
        // Titre
        if (!this.titreStopped) {

            // Appliquer la gravité
            this.titreVelocityY += this.titreGravity;

            // Appliquer la vitesse
            this.titre.y += this.titreVelocityY;

            // Collision avec le sol (Y = 110)
            if (this.titre.y >= this.titreFinalY) {

                this.titre.y = this.titreFinalY;

                // Inverser la vitesse + perte d'énergie
                this.titreVelocityY *= -this.titreBounce;

                // Stop si presque plus de mouvement
                if (Math.abs(this.titreVelocityY) < 0.5) {
                    this.titreVelocityY = 0;
                    this.titreStopped = true;
                }
            }
        }
    }
}

function connectToServer(callback) {

    const socket = new WebSocket("ws://card-game-server.onrender.com");

    socket.onopen = () => {
        console.log("Connecté au serveur !");
        callback();
    };

    socket.onerror = () => {
        console.log("Erreur connexion serveur");
    };
}
