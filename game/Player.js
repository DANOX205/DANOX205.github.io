class Player {

    // Constructeur
    constructor(scene, x, y, skinTeteIndex = 0 ,skinCorpsIndex = 0,emotion = 0,NUM = 0,Name = null,lunettes = false, menottes = false, sweat = false) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.NUM = NUM;
        this.Looking_Down = false;
        this.lunettes = lunettes;
        this.menottes = menottes;
        this.sweat = sweat;
        this.mesCartes = []; // Liste d'objet

        // Tête
        this.teteBlank = scene.add.sprite(x, y, 'TeteBlank');
        this.teteSup = scene.add.sprite(x, y, 'TeteSup_0');
        this.teteFace = scene.add.sprite(x, y, 'TeteFace_0');
        this.oeilDroit = scene.add.sprite(x, y, 'OeilDroit_0');
        this.oeilGauche = scene.add.sprite(x, y, 'OeilGauche_0');
        this.teteSkin1 = scene.add.sprite(x, y, 'TeteSkin1_0').setVisible(skinTeteIndex);
        this.teteSkin2 = scene.add.sprite(x, y, 'TeteSkin1_1').setVisible(skinTeteIndex);
        this.teteSweat = scene.add.sprite(x, y, 'TeteSweat').setVisible(sweat);
        this.teteLunettes = scene.add.sprite(x, y, 'TeteLunettes').setVisible(lunettes);

        // Corps
        this.corpsMain = scene.add.sprite(x, y, 'Corps_0');
        this.corpsBras = scene.add.sprite(x, y, 'Corps_1');
        this.corpsSkin1 = scene.add.sprite(x, y, 'CorpsSkin1_0').setVisible(skinCorpsIndex);
        this.corpsSkin2 = scene.add.sprite(x, y, 'CorpsSkin1_1').setVisible(skinCorpsIndex);
        this.corpsMenottes = scene.add.sprite(x, y, 'CorpsMenottes').setVisible(menottes);

        this.cartesShow = new CartesShow(this.scene,this.x,this.y, this.NUM);

        // Nametag
        if (Name != null){
            this.playerName = Name;
            this.Nametag = scene.add.sprite(x-7, y - 10, 'Nametag_Game_0');
            this.Nametag.setDepth(80);
            this.nameText = scene.add.text(x -2, y - 101, Name, {
                fontFamily: 'Kristen',
                fontSize: '18px',
                //fontStyle: "bold",
                color: '#ffffff'
            }).setOrigin(0.5);
            this.nameText.setDepth(90);
        } else {
            this.playerName = "toi";
        }

        this.setSkinTete(skinTeteIndex);
        this.setSkinCorps(skinCorpsIndex);
        this.setEmotion(emotion);

        // Depth : tête devant corps
        this.setDepths();
    }

    getInformations(){
        const playerData = {
            NUM : this.NUM,
            SkinTeteIndex: this.skinTeteIndex,
            SkinCorpsIndex: this.skinCorpsIndex,
            Username: this.playerName,
            Emotion: this.getEmotion(),
            Looking_Down : this.Looking_Down
        };
        return playerData;
    }

    getEmotion(){
        return this.emotion;
    }

    getDepotHitbox(){
        return this.depothitbox;
    }

    setDepths() {
        // Depth allant de 44 à 67
        // corps derrière
        this.corpsMain.setDepth(45);
        this.corpsBras.setDepth(55);
        this.corpsSkin1.setDepth(46);
        this.corpsSkin2.setDepth(56);
        this.corpsMenottes.setDepth(67);

        // tête devant
        this.teteBlank.setDepth(60);
        this.teteSup.setDepth(62);
        this.teteFace.setDepth(65);
        this.oeilDroit.setDepth(61);
        this.oeilGauche.setDepth(61);
        this.teteSkin1.setDepth(63);
        this.teteSkin2.setDepth(44);
        this.teteSweat.setDepth(66);
        this.teteLunettes.setDepth(67);
        
        this.cartesShow.setDepth();
    }

    ChangeNameTagSprite(i){ // 0 == C'est par mon tour || 1 == C'est mon tour
        this.Nametag.setTexture('Nametag_Game_'+i);
    }

    setLookingDownChange(){
        this.Looking_Down = !this.Looking_Down;
        if (this.Looking_Down){
            this.oeilDroit.y = this.y + 10;
            this.oeilGauche.y = this.y + 10;
        } else {
            this.setEmotion(this.emotion);
        }
    }
    setLookingDown(Looking_Down){
        this.Looking_Down = Looking_Down;
        if (this.Looking_Down){
            this.oeilDroit.y = this.y + 10;
            this.oeilGauche.y = this.y + 10;
        } else {
            this.setEmotion(this.emotion);
        }
    }

    // Changer l’émotion de la tête
    setEmotion(emotion) { // Emotion est un int
        this.emotion = emotion;
        this.teteSup.setTexture('TeteSup_' + emotion);
        this.teteFace.setTexture('TeteFace_' + emotion);
        switch (emotion){
            case 0:
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_0'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_0');
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 5 : 
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_0'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_0');
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 6 :
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_0'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_0'); 
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 7 :
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_1'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_1'); 
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 8 : 
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_1'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_1');
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 9:
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_2'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_2'); 
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 10 :
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_2'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_2'); 
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            case 12:
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_0'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_0');
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y;
                    this.oeilGauche.y = this.y;
                }
                break;  
            default : 
                this.oeilDroit.x = this.x;
                this.oeilDroit.setTexture('OeilDroit_0'); 
                this.oeilGauche.x = this.x;
                this.oeilGauche.setTexture('OeilGauche_0'); 
                if (!this.Looking_Down){
                    this.oeilDroit.y = this.y + 5;
                    this.oeilGauche.y = this.y + 5;
                }
                break;  
        }
    }
    // Changer le Skin de la tête 
    setNametag(Name) { // Emotion est un int
        this.nameText.setText(Name);
    }

    // Changer le Skin de la tête 
    setSkinTete(value) { // Emotion est un int
        this.skinTeteIndex = value;
        switch (value){
            case 0:
                this.teteSkin1.setVisible(false);
                this.teteSkin2.setVisible(false); 
                break;  
            default :
                this.teteSkin1.setVisible(true);
                this.teteSkin2.setVisible(true); 
                this.teteSkin1.setTexture('TeteSkin'+ value +'_0'); 
                this.teteSkin2.setTexture('TeteSkin'+ value +'_1'); 
                break;  
        }
    }

    // Changer le Skin du corps
    setSkinCorps(value) { // Emotion est un int
        this.skinCorpsIndex = value;
        switch (value){
            case 0:
                this.corpsSkin1.setVisible(false);
                this.corpsSkin2.setVisible(false); 
                break;  
            default :
                this.corpsSkin1.setVisible(true);
                this.corpsSkin2.setVisible(true); 
                this.corpsSkin1.setTexture('CorpsSkin'+ value +'_0'); 
                this.corpsSkin2.setTexture('CorpsSkin'+ value +'_1'); 
                break;  
        }
    }

    // Déplacer le joueur
    setPosition(x, y) {
        this.x = x;
        this.y = y;

        // mettre à jour tous les sprites
        const allSprites = [
            this.teteBlank, this.teteSup, this.teteFace,
            this.oeilDroit, this.oeilGauche, this.teteSkin1, this.teteSkin2, this.teteSweat, this.teteLunettes,
            this.corpsMain, this.corpsBras, this.corpsSkin1, this.corpsSkin2, this.corpsMenottes,
            this.Nametag, this.nameText, this.cartesShow
        ];

        allSprites.forEach(s => s.setPosition(x, y));
        this.Nametag.setPosition(x-7,y-10);
        this.nameText.setPosition(x-2,y-101);
    }
    
    setVisiblePlayer(bool){
        this.clickAllowed = bool;
        this.SelectedCartes = false;
        this.SelectedEchanges = false;
        this.teteBlank.setVisible(bool);
        this.teteSup.setVisible(bool);
        this.teteFace.setVisible(bool);
        this.oeilDroit.setVisible(bool);
        this.oeilGauche.setVisible(bool);
        this.teteSkin1.setVisible(bool);
        this.teteSkin2.setVisible(bool);
        this.teteSweat.setVisible(this.sweat);
        this.teteLunettes.setVisible(this.lunettes);
        this.corpsMain.setVisible(bool);
        this.corpsBras.setVisible(bool);
        this.corpsSkin1.setVisible(bool);
        this.corpsSkin2.setVisible(bool);
        this.corpsMenottes.setVisible(this.menottes);
        this.cartesShow.setVisible(bool);
        this.Nametag.setVisible(bool);
        this.nameText.setVisible(bool);
        if (bool){
            this.setSkinTete(this.skinTeteIndex);
            this.setSkinCorps(this.skinCorpsIndex);
            this.setEmotion(this.emotion);
        }
    }

    updatePlayerGlobal(skinTeteIndex = 0 ,skinCorpsIndex = 0,emotion = 0, Looking_Down,NUM = 0,Name = null, Cartes = [-1],lunettes = false, menottes = false, sweat = false,Turn = 0){
        this.updatePlayerValues(skinTeteIndex,skinCorpsIndex,emotion, Looking_Down,NUM,Name,lunettes, menottes, sweat);
        this.updatePlayerSkin(Name);
        this.ChangeNameTagSprite(Turn);
        this.cartesShow.updateCartesShow(Cartes);
    }

    updatePlayerValues(skinTeteIndex = 0 ,skinCorpsIndex = 0,emotion = 0, Looking_Down,NUM = 0,Name = null,lunettes = false, menottes = false, sweat = false){
        this.skinCorpsIndex = skinCorpsIndex;
        this.skinTeteIndex = skinTeteIndex;
        this.emotion = emotion;
        this.NUM = NUM;
        this.Name = Name;
        this.lunettes = lunettes;
        this.menottes = menottes;
        this.Looking_Down = Looking_Down;
        this.sweat = sweat;
    }

    updatePlayerSkin(Name){
        this.setEmotion(this.emotion);
        this.setSkinCorps(this.skinCorpsIndex);
        this.setSkinTete(this.skinTeteIndex);
        this.setSkinTete(this.skinTeteIndex);
        this.setLookingDown(this.Looking_Down);
        this.setNametag(Name);
    }
}
