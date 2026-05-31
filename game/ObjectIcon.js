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

        this.Timer_interval = null;
        this.Timer_index = 0;

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
                if ((this.isOverlapping(this.spritehitbox, this.scene.CarteEnJeu.spritehitbox))) {
                    // Collision avec la carteEnjeu
                    if ((this.scene.sac.selectedObject === 1)){
                        //&& (this.scene.roomState === RoomState.GAME_STARTED)){ // Les ciseaux
                        console.log("Je dois faire l'action du ciseaux !");
                        this.sendCiseaux();
                        //this.scene.sac.removeObject(); // Faire ça après la réponse du serveur
                    }
                }

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
                this.stopTimer();
                this.scene.PLAYER.SweatDisappear(0);
                this.sendSweatInfo(0);
                break;
            case 1 :
                this.objectDrag.setTexture('CiseauxIcon');
                this.startTimer();
                break;
            case 2 :
                this.objectDrag.setTexture('BatteIcon');
                this.startTimer();
                break;
            case 3 :
                this.objectDrag.setTexture('CanneIcon');
                this.startTimer();
                break;
            case 4 :
                this.objectDrag.setTexture('TelephoneIcon');
                this.startTimer();
                break;
            case 5 :
                this.objectDrag.setTexture('CrayonIcon');
                this.startTimer();
                break;
            case 6 :
                this.objectDrag.setTexture('MenottesIcon');
                this.startTimer();
                break;
            case 7 :
                this.objectDrag.setTexture('LunettesIcon');
                this.startTimer();
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

    isOverlapping(obj1, obj2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(
            obj1.getBounds(),
            obj2.getBounds()
        );
    }

    sendCiseaux(){
        const payload = {
            ObjectID : 1,
            Source: this.scene.myNum,
            Destination: -1,
            Carte: -1
        };
        this.scene.socket.send(JSON.stringify({
            type: "CHEATING",
            payload: payload
        }));

    }

    sendSweatInfo(num){
        const payload = {
            Value : num,
            Source: this.scene.myNum,
        };
        this.scene.socket.send(JSON.stringify({
            type: "SWEATING",
            payload: payload
        }));

    }

    resetTimer() {
        this.Timer_index = 0;
        if (this.Timer_interval) {
            clearInterval(this.Timer_interval);
        }
    }

    startTimer() {
        this.Timer_interval = setInterval(() => {
            this.Timer_index++;
            if (this.Timer_index >= 100) {
                // Faire Suer son joueur et envoyer au serveur
                this.scene.PLAYER.SweatAppear(1);
                console.log("Fin du Timer !");
                this.stopTimer();
                this.sendSweatInfo(1);
            }
        }, 100);
    }

    stopTimer() {
        if (this.Timer_interval) {
            clearInterval(this.Timer_interval);
        }
        this.Timer_index = 0;
    }
}