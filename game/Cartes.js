class Cartes {
    constructor(scene,x,y,Valeur, Seen = false, CanCombo = false, Echange = false){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.Valeur = Valeur;
        this.Seen = Seen;
        this.CanCombo = CanCombo;
        this.isComboing = false;
        this.isDragging = false;
        this.otherCardCombo = null;
        this.Echange = Echange;
        this.sprite = scene.add.sprite(x, y, 'CartesMinis_'+ Valeur);
        this.sprite.setScale(2);
        this.seen = scene.add.sprite(x, y, 'Carte_Seen').setVisible(Seen);
        this.seen.setScale(2);
        this.spritecanCombo = scene.add.sprite(x, y, 'Carte_CanCombo').setVisible(CanCombo);  
        this.spritecanCombo.setScale(2);  
        this.carteEnEchange = scene.add.sprite(x,y,'CarteEnEchange').setVisible(false);
        this.carteEnEchange.setScale(2);
        this.spritecantPlay = scene.add.sprite(x, y, 'CarteCantPlay').setVisible(CanCombo);  
        this.spritecantPlay.setScale(2);  
        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x,y, 34, 50);
        this.spritehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x,
            y,
            34,
            50,
            0x0000ff, // couleur bleu
            0.5       // opacité 0.5
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        scene.input.setDraggable(this.spritehitbox);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.spritehitbox) {
                if (!this.isComboing){
                    this.setPosition_WithoutChangingInit(dragX, dragY);
                } else {
                    this.setPosition_WithoutChangingInit(dragX-20, dragY);
                    if (this.otherCardCombo != null){
                        this.otherCardCombo.setPosition_WhileCombo(dragX+20, dragY);
                    }
                }

                // Vérifier collision avec les autres cartes
                if ((this.otherCardCombo === null) && (!this.isComboing)){
                    let OtherCards = this.scene.HoldCartes.cartes;
                    OtherCards.forEach(otherCard => {
                        if (otherCard === this) return;
                        if (this.isOverlapping(this.spritehitbox, otherCard.spritehitbox)) {
                            if (this.canComboWith(otherCard)) {
                                this.isComboing = true;
                                this.otherCardCombo = otherCard;
                                this.otherCardCombo.isComboing = true;
                            }
                        }
                    });
                }
            }
        });
        scene.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                this.isDragging = true;
                this.isComboing = false;
                this.sprite.setScale(2.2);
                this.seen.setScale(2.2);
                this.spritecanCombo.setScale(2.2);
            }
        });
        scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                this.isDragging = false;
                this.BacktoInitPositionAnimation(this);

                // Vérifier collision avec le Dépôt 
                if ((this.isOverlapping(this.spritehitbox, this.scene.Depot.spritehitbox)) && (this.scene.Turn == this.scene.myNum)) {
                    console.log("Je dois envoyer la carte au serveur");
                    this.sendCard() // Envoyer le message au Serveur.
                }
                // Important de mettre ça après la collision avec le dépôt
                this.isComboing = false;
                if (this.otherCardCombo != null){
                    this.otherCardCombo.isComboing = false;
                    this.BacktoInitPositionAnimation(this.otherCardCombo);
                    this.otherCardCombo = null;
                }
            }
        });
        this.setDepth();
    }

    setDepth(){
        this.spritehitboxDebug.setDepth(103);
        this.sprite.setDepth(99);
        this.seen.setDepth(102);
        this.spritecanCombo.setDepth(102);
        this.spritecantPlay.setDepth(100);
        this.carteEnEchange.setDepth(101);
        this.spritehitbox.setDepth(100);
    }

    setPosition_WithoutChangingInit(x,y){
        this.x = x;
        this.y = y;
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
        this.seen.setPosition(x+4,y);
        this.spritecanCombo.setPosition(x,y);
    }
    setPosition_WhileCombo(x,y){
        this.x = x;
        this.y = y;
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
        this.seen.setPosition(x+4,y);
        this.spritecanCombo.setPosition(x,y);
        this.sprite.setScale(2.2);
        this.seen.setScale(2.2);
        this.spritecanCombo.setScale(2.2);
    }

    BacktoInitPositionAnimation(Carte){
        this.scene.tweens.add({
            targets: [
                Carte.sprite,
                Carte.seen,
                Carte.spritecanCombo,
                Carte.spritehitbox,
                Carte.spritehitboxDebug
            ],
            x: Carte.initialX,
            y: Carte.initialY,
            duration: 200,
            ease: 'Sine.easeOut'
        });
        // remettre scale normal
        Carte.sprite.setScale(2);
        Carte.seen.setScale(2);
        Carte.spritecanCombo.setScale(2);
    }

    setPosition(x,y){
        //console.log("Carte", this.id, "drag?", this.isDragging);
        this.setInitPosition(x,y)
        if ((!this.isDragging) && (!this.isComboing)){
            this.x = x;
            this.y = y;
            this.sprite.setPosition(x,y);
            this.spritehitbox.setPosition(x,y);
            this.spritehitboxDebug.setPosition(x,y);
            this.seen.setPosition(x+4,y);
            this.spritecanCombo.setPosition(x,y);
            this.spritecantPlay.setPosition(x,y);
            this.carteEnEchange.setPosition(x,y);
        }
    }

    setInitPosition(x,y){
        this.initialX = x;
        this.initialY = y;
    }

    updateValue(value){
        this.Valeur = value;
        this.sprite.setTexture('CartesMinis_'+ value);
    }

    CarteEnEchange(bool){
        this.Echange = bool;
        this.carteEnEchange.setVisible(bool);
        this.setDraggableState(!bool);
    }

    setDraggableState(bool) {
        this.draggable = bool;
        this.scene.input.setDraggable(this.spritehitbox, bool);
    }

    updateCanCombo(){
        const val = this.Valeur % 13;
        if ((val === 1) || (val === 2) || (val === 3)){ // C'est un 1,2 ou 3
            // Regarder s'il y a une autre carte 1, 2 ou 3 dans son jeu
            let mesCartes = this.scene.MyCards();
            for (let i=0;i < mesCartes.length ;i++){
                if ((mesCartes[i].Valeur != this.Valeur) && (mesCartes[i].Valeur % 13 === val)){
                    // Je peux combo ma carte avec une autre carte existante.
                    return true;
                }
            }
        }
        return false;
    }

    canComboWith(Carte){
        if ((this != Carte) && (this.Valeur % 13 === Carte.Valeur % 13) && (!Carte.Echange) && (!this.Echange) && (this.updateCanCombo())) {
            return true;
        } else {
            return false;
        }
    }

    canPlay(){
        const val = this.Valeur % 13;
        let currentCard = this.scene.CurrentCard % 13;
        if ((currentCard === 11) || (currentCard === 12)){ // currentCard est un Valet, Reine
            currentCard = 5;
        }
        if ((val === 0) || (val === 11) || (val === 12)) { // C'est un Valet, Reine ou Roi
            return true;
        } else if (this.scene.CurrentCard >= 53){ // C'est une carte Combo
            return false;
        } else {
            if (val < currentCard) {
                return false;
            } else {
                return true;
            }
        }
    }

    updateStatus(){
        this.CanCombo = this.updateCanCombo();
        if (this.CanCombo) {
            // Afficher le sprite canCombo
            this.spritecanCombo.setVisible(true);
            this.spritecantPlay.setVisible(false);
            this.setDraggableState(!this.Echange);
            // On peut jouer la carte
        } else {
            this.spritecanCombo.setVisible(false);
            if (this.canPlay()){
                this.spritecantPlay.setVisible(false);
                this.setDraggableState(!this.Echange);
            } else {
                this.spritecantPlay.setVisible(true);
                this.setDraggableState(false);
            }
        }
        if (this.Seen){
            this.seen.setVisible(true);
        } else {
            this.seen.setVisible(false);
        }
    }

    isOverlapping(obj1, obj2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(
            obj1.getBounds(),
            obj2.getBounds()
        );
    }

    sendCard(){
        let otherValeur = null;
        if (this.otherCardCombo != null){
            otherValeur = this.otherCardCombo.Valeur;
        }
        const payload = {
            playerNum : this.scene.myNum,
            Valeur: this.Valeur,
            IsComboing: this.isComboing,
            OtherValeur: otherValeur
        };
        this.scene.socket.send(JSON.stringify({
            type: "CardPlayed",
            payload: payload
        })); 
    }

    destroy(){
        this.sprite.destroy();
        this.seen.destroy();
        this.spritecanCombo.destroy();
        this.spritecantPlay.destroy();
        this.carteEnEchange.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
    }
}