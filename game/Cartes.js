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
        this.Echange = Echange;
        this.sprite = scene.add.sprite(x, y, 'CartesMinis_'+ Valeur);
        this.sprite.setScale(2);
        this.seen = scene.add.sprite(x, y, 'Carte_Seen').setVisible(Seen);
        this.seen.setScale(2);
        this.canCombo = scene.add.sprite(x, y, 'Carte_CanCombo').setVisible(CanCombo);  
        this.canCombo.setScale(2);  
        this.carteEnEchange = scene.add.sprite(x,y,'CarteEnEchange').setVisible(false);
        this.carteEnEchange.setScale(2);
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
                this.setPosition_WithoutChangingInit(dragX, dragY);
            }
        });
        scene.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                this.sprite.setScale(2.2);
                this.seen.setScale(2.2);
                this.canCombo.setScale(2.2);
            }
        });
        scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                scene.tweens.add({
                    targets: [
                        this.sprite,
                        this.seen,
                        this.canCombo,
                        this.spritehitbox,
                        this.spritehitboxDebug
                    ],
                    x: this.initialX,
                    y: this.initialY,
                    duration: 200,
                    ease: 'Sine.easeOut'
                });
                // remettre scale normal
                this.sprite.setScale(2);
                this.seen.setScale(2);
                this.canCombo.setScale(2);
            }
        });
        this.setDepth();
    }

    setDepth(){
        this.spritehitboxDebug.setDepth(102);
        this.sprite.setDepth(99);
        this.seen.setDepth(101);
        this.canCombo.setDepth(101);
        this.carteEnEchange.setDepth(100);
        this.spritehitbox.setDepth(100);
    }

    setPosition_WithoutChangingInit(x,y){
        this.x = x;
        this.y = y;
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
        this.seen.setPosition(x,y);
        this.canCombo.setPosition(x,y);
    }
    setPosition(x,y){
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
        this.seen.setPosition(x,y);
        this.canCombo.setPosition(x,y);
        this.carteEnEchange.setPosition(x,y);
    }

    updateValue(value){
        this.Valeur = value;
        this.sprite.setTexture('CartesMinis_'+ value);
    }

    CarteEnEchange(bool){
        this.carteEnEchange.setVisible(bool);
        this.setDraggableState(!bool);
    }

    setDraggableState(bool) {
        this.draggable = bool;
        this.scene.input.setDraggable(this.spritehitbox, bool);
    }

    destroy(){
        this.sprite.destroy();
        this.seen.destroy();
        this.canCombo.destroy();
        this.carteEnEchange.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
    }
}