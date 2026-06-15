class CanneCard{
    constructor(scene,x,y,Valeur,canneBox){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.Valeur = Valeur;
        this.canneBox = canneBox;
        this.sprite = this.scene.add.sprite(x, y, 'CartesMinis_' + Valeur);
        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x,y, 19, 26);
        this.spritehitbox.setInteractive();
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
        this.spritehitboxDebug.setVisible(this.scene.HITBOXES);

        this.spritehitbox.on('pointerdown', () => {
            console.log("Je dois envoyer : " + this.Valeur + " au serveur !");
            this.sendCanne(this.canneBox.num);
            this.canneBox.destroy();
        });

        this.setDepth()
    }

    setDepth(){
        this.sprite.setDepth(91);
        this.spritehitbox.setDepth(92);
        this.spritehitboxDebug.setDepth(92);
    }

    sendCanne(Destination){
        const payload = {
            ObjectID : 3,
            Source: this.scene.myNum,
            Destination: Destination,
            Carte: this.Valeur
        };
        this.scene.socket.send(JSON.stringify({
            type: "CHEATING",
            payload: payload
        }));
    }

    destroy(){
        this.sprite.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
    }

}