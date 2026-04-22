class HoldCartes {
    constructor(scene, Player,x,y){
        this.scene = scene;
        this.Player = Player;
        this.x = x;
        this.y = y;
        this.HoldCartes = this.scene.add.sprite(x,y ,'CartesHitboxON');
        this.cartes = [];
        this.GeneralY = 335;
        //Depth
        this.HoldCartes.setDepth(101);
        this.HoldCartes.setAlpha(0.8);
        this.HoldCartes.setVisible(false);
        //Hitbox
        this.HoldCarteshitbox = this.scene.add.zone(x, y + 152, 360, 16);
        this.HoldCarteshitbox.disableInteractive();  
        this.HoldCarteshitbox.setDepth(150);
        // Rectangle visuel pour debug
        this.hitboxHoldCartesDebug = this.scene.add.rectangle(
            x,
            y+152,
            360,
            16,
            0xff0000, // couleur rouge
            0.5       // opacité 0.5
        );
        this.hitboxHoldCartesDebug.setDepth(105);
        this.hitboxHoldCartesDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxHoldCartesDebug.setVisible(false);
        // Action 
        this.HoldCarteshitbox.on('pointerdown', () => {
            this.HoldCartesSelected = !this.HoldCartesSelected;
            console.log('Bouton HoldCartes cliqué : HoldCartesSelected =',this.HoldCartesSelected);
            if (this.HoldCartesSelected){
                this.HoldCartes.setTexture('CartesHitboxOFF');
                this.HoldCardsUp();
                this.Player.setLookingDownChange();
            } else {
                this.HoldCartes.setTexture('CartesHitboxON');
                this.HoldCardsDown();
                this.Player.setLookingDownChange();
            }
        });

    }

    addCartes(Valeurs) {
        for (let i = 0;i<Valeurs.length;i++){
            const Carte = new Cartes(this.scene,this.x,this.GeneralY,Valeurs[i].Valeur);
            this.cartes.push(Carte);
        }
    }

    updateCartes(Valeurs){
        if (this.scene.roomState != RoomState.WAITING_PLAYERS) {
            for (let i = 0; i < Valeurs.length; i++) {
                if (!this.cartes[i]) {
                    this.cartes[i] = new Cartes(this.scene,this.x,this.GeneralY,Valeurs[i].Valeur);
                    //this.setXValueCards();
                } else if (this.cartes[i].Valeur !== Valeurs[i].Valeur) {
                    this.cartes[i].updateValue(Valeurs[i].Valeur);
                }
                this.cartes[i].Seen = Valeurs[i].Seen;
                this.cartes[i].updateStatus();
            }
            this.setXValueCards();
            // supprimer les cartes en trop
            for (let i = this.cartes.length - 1; i >= Valeurs.length; i--) {
                if (this.cartes[i]) {
                    this.cartes[i].destroy();
                }
                this.cartes.pop();
            }
        }
    }

    setXValueCards() {
        const spacing = 40;
        const total = this.cartes.length;
        for (let i = 0; i < total; i++) {
            const Carte = this.cartes[i];
            const offset = (i - (total - 1) / 2) * spacing;
            Carte.setPosition(this.x + 3 + offset, this.GeneralY);
        }
    }

    HoldCardsDown(){
        this.GeneralY = 335;
        for (let i = 0;i<this.cartes.length;i++){
            const Carte = this.cartes[i];
            Carte.setPosition(Carte.initialX,this.GeneralY);
        }
    }

    HoldCardsUp(){
        this.GeneralY = 295;
        for (let i = 0;i<this.cartes.length;i++){
            const Carte = this.cartes[i];
            Carte.setPosition(Carte.initialX,this.GeneralY);
        }
    }
}