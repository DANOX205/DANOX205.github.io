const config = {
    type: Phaser.AUTO,
    width: 569,
    height: 320,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt : true,
    backgroundColor: '#1e1e1e',
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // On load les images
    this.load.image('Background','assets/sBackground_0.png');
    this.load.image('Background2','assets/sBackground2_0.png');
    this.load.image('Table','assets/sTable_0.png');
    this.load.image('Lampe','assets/sLampe_0.png');
    this.load.image('Light','assets/sLight_0.png');
    this.load.image('Version','assets/sVersion_0.png');

    // Pour le Joueur
    this.load.image('TeteBlank','assets/sTete_Blank_0.png');
    this.load.image('TeteLunettes','assets/sLunettes_Perso_0.png');
    this.load.image('CorpsMenottes','assets/sMenottes_Perso_0.png');
    for (let i = 0; i <= 11; i++) {  // 12 images (0 à 11)
        this.load.image('TeteSup_' + i, 'assets/sTete_Sup_' + i + '.png');
        this.load.image('TeteFace_' + i, 'assets/sTete_Face_' + i + '.png');
    }
    for (let i = 0; i <= 2; i++) {  // 3 images (0 à 2)
        this.load.image('OeilDroit_' + i, 'assets/sOeil_Droit_' + i + '.png');
        this.load.image('OeilGauche_' + i, 'assets/sOeil_Gauche_' + i + '.png');
    }
    // Skins pour la tête
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('TeteSkin1_' + i, 'assets/sTete_Roi_Coeur_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('TeteSkin2_' + i, 'assets/sTete_Roi_Trefle_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('TeteSkin3_' + i, 'assets/sTete_Roi_Pique_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('TeteSkin4_' + i, 'assets/sTete_Roi_Carreau_' + i + '.png');
    }

    this.load.image('TeteSweat','assets/sTete_sweat_0.png');

    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('Corps_' + i, 'assets/sCorps_' + i + '.png');
    }

    // Skins pour le corps
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('CorpsSkin1_' + i, 'assets/sCorps_Roi_Rouge_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('CorpsSkin2_' + i, 'assets/sCorps_Roi_Noir_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('CorpsSkin3_' + i, 'assets/sCorps_Suit_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('CorpsSkin4_' + i, 'assets/sCorps_Armor_' + i + '.png');
    }

    this.load.image('Cartes','assets/sCartes_Default_0.png');
    //Nametag
    this.load.image('Nametag','assets/sNametag_Game_0.png');

    // On load les animations 
    for (let i = 0; i <= 18; i++) {  // 19 images (0 à 18)
        this.load.image('Transition_' + i, 'assets/sTransition_' + i + '.png');
    }
    for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
        this.load.image('Titre_' + i, 'assets/sNewTitle_' + i + '.png');
    }
}

// Variables Globales pour le jeu

function create() {
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
    this.titre = this.add.sprite(277,110 ,'Titre_0');
    this.titre.setDepth(5);
    this.titre.play('TitreAnim');

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

    const Player_X = 295;
    const Player_Y = 162;
    const Nametag_X = 287;
    const Nametag_Y = 130;

    // Joueur --------------------------------------------------------------
    const PLAYER = new Player(this,Player_X ,Player_Y, false);

    // Nametag --------------------------------------------------------------
    this.playerName = "toi";
    this.isEditingName = false;
    // Background nametag
    this.nameTag = this.add.sprite(Nametag_X, Nametag_Y, 'Nametag');
    this.nameTag.setDepth(80);
    // Texte
    this.nameText = this.add.text(Nametag_X + 5, Nametag_Y - 96, this.playerName, {
        fontFamily: 'Kristen',
        fontSize: '20px',
        fontStyle: "bold",
        color: '#ffffff'
    }).setOrigin(0.5);
    this.nameText.setDepth(100);
}

function update() {

}

