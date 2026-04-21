class CartesMini {
    constructor(scene, x, y,Valeur, Seen = false, Echange = false,cliquable = true, draggable = false,Player = null,PlayerEchange = null, Yours = false){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.Valeur = Valeur;
        this.Seen = Seen;
        this.Echange = Echange;
        this.cliquable = cliquable;
        this.draggable = draggable;
        this.isDragging = false;
        this.Player = Player;
        this.PlayerEchange = PlayerEchange;
        this.yours = Yours;

        this.echange = this.scene.add.sprite(x, y, 'EchangeEnCours').setVisible(false);
        if (Seen){
            this.sprite = this.scene.add.sprite(x, y, 'CartesMinis_'+ Valeur).setVisible(false);
        } else {
            this.sprite = this.scene.add.sprite(x, y, 'CartesMinis_53').setVisible(false);
        }
        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x,y, 19, 26);
        this.spritehitbox.setInteractive();
        this.spritehitbox.setVisible(false);
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x,
            y,
            19,
            26,
            0x0000ff, // couleur bleu
            0.5       // opacité 0.5
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.spritehitboxDebug.setVisible(false);
        // Action 
        this.spritehitbox.on('pointerdown', () => {
            if (this.cliquable){
                console.log("Mini Carte Appuyée.");
            }
        });
        // Action 
        scene.input.setDraggable(this.spritehitbox);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (draggable){
                if (gameObject === this.spritehitbox) {
                    this.setPosition_WithoutChangingInit(dragX, dragY);
                }
            }
        });
        scene.input.on('dragstart', (pointer, gameObject) => {
            if (draggable){
                if (gameObject === this.spritehitbox) {
                    this.isDragging = true;
                    this.sprite.setScale(1.2);
                }
            }
        });
        scene.input.on('dragend', (pointer, gameObject) => {
            if (this.draggable){
                if (this.Player && this.Player.depothitbox){
                    const carteBounds = this.spritehitbox.getBounds();
                    const depotBounds = this.Player.depothitbox.getBounds();
                    if ((Phaser.Geom.Intersects.RectangleToRectangle(carteBounds, depotBounds)) && (!this.Player.EchangeEnCours)) {
                        console.log("Collision avec dépôt !");
                        // 👉 Position d'échange
                        this.Player.cartesShow.EchangeEnCours = true;
                        this.scene.UpdateCardValues(this.x,this.y,this.Valeur,true,true,false,false,this.Player);
                        this.echange.setVisible(true);
                        this.updateEchange(true,this.Player);
                        this.echange.setAlpha(0.5);
                        this.setDraggableState(false);
                        this.setPosition(
                            this.Player.depothitbox.x,
                            this.Player.depothitbox.y
                        );
                        // Je dois envoyer l'information au Serveur
                        this.sendPropose();
                    }
                }
                if (gameObject === this.spritehitbox) {
                    this.isDragging = false;
                    scene.tweens.add({
                        targets: [
                            this.sprite,
                            this.spritehitbox,
                            this.spritehitboxDebug
                        ],
                        x: this.initialX,
                        y: this.initialY,
                        duration: 200,
                        ease: 'Sine.easeOut'
                    });
                }
                // remettre scale normal
                this.sprite.setScale(1);
            }
        });

        this.setDepth();
    }

    ChangeEchangeSprite(bool){
        if (bool){
            this.echange.setTexture('EchangeAccepte');
        } else {
            this.echange.setTexture('EchangeEnCours');
        }
    }

    setDepth() {
        this.sprite.setDepth(82);
        this.echange.setDepth(85);
        this.spritehitbox.setDepth(100);
        this.spritehitboxDebug.setDepth(102);
    }

    updateValue(value){
        this.Valeur = value;
        if (this.yours){
            this.sprite.setTexture('CartesMinis_'+ value);
        } else {
            if (this.Seen) {
                this.sprite.setTexture('CartesMinis_'+ value);
            } else {
                this.sprite.setTexture('CartesMinis_53');
            }
        }
    }

    updateEchange(bool,PlayerEchange) {
        this.PlayerEchange = PlayerEchange;
        this.Echange = bool; 
        this.setDraggableState(!bool);
    }

    setSpriteVisible(bool){
        this.sprite.setVisible(bool);
        this.spritehitbox.setVisible(bool);
        this.spritehitboxDebug.setVisible(bool);
        if (bool){
            this.echange.setAlpha(0.5);
            this.echange.setVisible(this.Echange);
        } else {
            this.echange.setAlpha(0);
            this.echange.setVisible(false);
        }
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.echange.setPosition(x,y);
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
    }

    setPosition_WithoutChangingInit(x,y){
        this.x = x;
        this.y = y;
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
    }

    setDraggableState(bool) {
        this.draggable = bool;
        this.scene.input.setDraggable(this.spritehitbox, bool);
    }

    sendPropose(){
        const payload = {
            playerNum : this.scene.myNum,
            Source: this.scene.myNum,
            Destination: this.scene.giveNumBasedOnNumPlayer(this.Player.NUM),
            Carte: this.Valeur,
            EchangePropose : true,
            Accepte : false,
            TimerValue : 1
        };
        this.scene.socket.send(JSON.stringify({
            type: "playerProposeEchange",
            payload: payload
        }));
    }

    destroy(){
        this.sprite.destroy();
        this.echange.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
    }

}