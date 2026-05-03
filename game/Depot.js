class Depot {
    constructor(scene, x, y){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = this.scene.add.sprite(x,y ,'Depot');
        this.sprite.setScale(2.2);
        this.sprite.setAlpha(0.7);

        //Hitbox Des BackgroundObjet
        this.spritehitbox = this.scene.add.zone(x, y, 52, 72);
        this.spritehitbox.setInteractive();

        // Rectangle visuel pour debug
        this.hitboxspriteDebug = this.scene.add.rectangle(
            x,
            y,
            52,
            72,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        );
        this.hitboxspriteDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxspriteDebug.setVisible(false);
        // Action 
        this.spritehitbox.on('pointerdown', () => {
            console.log('Depot cliqué');
        });
        this.setVisible(false);
        this.setDepth();   
    }

    setDepth(){
        this.sprite.setDepth(95);
        this.spritehitbox.setDepth(96);
        this.hitboxspriteDebug.setDepth(96);
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
        this.spritehitbox.setVisible(bool);
        if (this.scene.HITBOXES){
            this.hitboxspriteDebug.setVisible(bool);
        }
    }

}