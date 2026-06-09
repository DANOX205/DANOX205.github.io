class Cle{
    constructor(scene, x, y){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'Cle');
        this.sprite.alpha = 0;

        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x,y, 22, 40);
        this.spritehitbox.setInteractive();
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x,
            y,
            22,
            40,
            0x0000ff, // couleur bleu
            0.2       // opacité 0.2
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.spritehitboxDebug.setVisible(false);
        this.setDepth();
        this.spritehitbox.on('pointerdown', () => {
            console.log("Je clique sur la clé !");
            this.sendUnlock(this.scene.myNum);
            this.destroy();
        });
        this.scene.tweens.killTweensOf(this.sprite);
        this.scene.tweens.add({
            targets: this.sprite,
            duration: 70000,
            alpha: 1,
            ease: 'Power2',
        });
    }

    setDepth(){
        this.sprite.setDepth(150);
        this.spritehitbox.setDepth(150);
        this.spritehitboxDebug.setDepth(151);
    }

    sendUnlock(source){
        this.scene.socket.send(JSON.stringify({
            type: "UNLOCK",
            payload: source
        }));
    }

    destroy(){
        this.sprite.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
    }

}