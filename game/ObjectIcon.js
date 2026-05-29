class ObjectIcon {
    constructor(scene,x,y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initialX = x + 206;
        this.initialY = y + 87;
        this.timer = 0;

        this.sprite = this.scene.add.sprite(this.x,this.y ,'ObjetIcon_0');
        this.objectDrag = this.scene.add.sprite(this.x+206, this.y+87, 'ObjetIcon_0');
        this.objectDrag.setVisible(false);

        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x+206,y+87, 39, 39);
        this.spritehitbox.setInteractive();
        //this.spritehitbox.setVisible(false);
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x+206,
            y+87,
            39,
            39,
            0x0000ff, // couleur bleu
            0.2       // opacité 0.2
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.spritehitboxDebug.setVisible(this.scene.HITBOXES);

        
        // Action 
        scene.input.setDraggable(this.spritehitbox);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.spritehitbox) {
                this.setPosition_WithoutChangingInit(dragX, dragY);
            }
        });
        scene.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                this.objectDrag.setScale(1.2);
                this.objectDrag.setVisible(true);
            }
        });
        scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.spritehitbox) {
                scene.tweens.add({
                    targets: [
                        this.objectDrag,
                        this.spritehitbox,
                        this.spritehitboxDebug
                    ],
                    x: this.initialX,
                    y: this.initialY,
                    duration: 200,
                    ease: 'Sine.easeOut'
                });
                // remettre scale normal
                this.objectDrag.setScale(1);
                this.objectDrag.setVisible(false);
            }
        });

        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(70);
        this.spritehitbox.setDepth(75);
        this.spritehitboxDebug.setDepth(76);
        this.objectDrag.setDepth(200);
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
    }

    setSprite(id){
        this.sprite.setTexture('ObjetIcon_' + id);
        switch (id) {
            case 0 :
                this.objectDrag.setTexture('ObjetIcon_0');
                break;
            case 1 :
                this.objectDrag.setTexture('CiseauxIcon');
                break;
            case 2 :
                this.objectDrag.setTexture('BatteIcon');
                break;
            case 3 :
                this.objectDrag.setTexture('CanneIcon');
                break;
            case 4 :
                this.objectDrag.setTexture('TelephoneIcon');
                break;
            case 5 :
                this.objectDrag.setTexture('CrayonIcon');
                break;
            case 6 :
                this.objectDrag.setTexture('MenottesIcon');
                break;
            case 7 :
                this.objectDrag.setTexture('LunettesIcon');
                break;
        }
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.objectDrag.setPosition(x,y);
        this.sprite.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
    }

    setPosition_WithoutChangingInit(x,y){
        this.x = x;
        this.y = y;
        this.objectDrag.setPosition(x,y);
        this.spritehitbox.setPosition(x,y);
        this.spritehitboxDebug.setPosition(x,y);
    }

}