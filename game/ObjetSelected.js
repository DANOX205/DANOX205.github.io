class ObjetSelected {
    constructor(scene,sac,x,y,id) {
        this.scene = scene;
        this.sac = sac;
        this.x = x;
        this.y = y;
        this.id = id;
        this.appear = null;
        this.disappear = null;

        //Hitbox Des BackgroundObjet
        this.backgroundObjet = this.scene.add.sprite(x,y,'ObjetBackground_NotSelected').setVisible(false);
        this.backgroundObjet.setAlpha(0);
        this.backgroundObjethitbox = this.scene.add.zone(x + 240, y + 105, 90, 110);
        this.backgroundObjethitbox.setInteractive();
        this.backgroundObjethitbox.setVisible(false);
        // Rectangle visuel pour debug
        this.hitboxbackgroundObjetDebug = this.scene.add.rectangle(
            x-2,
            y-2,
            105,
            105,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        ).setVisible(false);
        this.hitboxbackgroundObjetDebug.setDepth(105);
        this.hitboxbackgroundObjetDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.backgroundObjethitbox.on('pointerdown', () => {
            console.log('Objet cliqué');
        });
        this.setDepth();
    }

    setDepth(){
        this.backgroundObjet.setDepth(100);
    }

    FadeTo(value) {
        this.setVisible(true);
        this.scene.tweens.killTweensOf(this.backgroundObjet);
        this.scene.tweens.add({
            targets: this.backgroundObjet,
            duration: 600,
            alpha: value,
            ease: 'Power2',
            onComplete: ()=>{
                this.setVisible(value);
            }
        });
    }

    setVisible(bool){
        this.backgroundObjet.setVisible(bool);
        this.backgroundObjethitbox.setVisible(bool);// disableInteractive();
        this.hitboxbackgroundObjetDebug.setVisible(bool);
    }

}