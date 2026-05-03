class FullScreen{
    constructor(scene,x,y){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'btnFullScreenOFF');
        //Hitbox
        this.spritehitbox = this.scene.add.zone(x-252, y -128, 57, 57);
        this.spritehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxspriteDebug = this.scene.add.rectangle(
            x- 252,
            y- 128,
            57,
            57,
            0xff0000, // couleur rouge
            0.2       // opacité 0.2
        );
        this.hitboxspriteDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxspriteDebug.setVisible(this.scene.HITBOXES);

        this.spritehitbox.on('pointerdown', () => {
            if (!this.scene.scale.isFullscreen) {
                this.scene.scale.startFullscreen();
                this.sprite.setTexture('btnFullScreenON');
            } else {
                this.scene.scale.stopFullscreen();
                this.sprite.setTexture('btnFullScreenOFF');
            }
            console.log("Bouton FullScreen appuyé !");
        });
        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(105);
        this.spritehitbox.setDepth(105);
        this.hitboxspriteDebug.setDepth(105);
    }


}