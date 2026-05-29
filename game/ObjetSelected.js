class ObjetSelected {
    constructor(scene,sac,x,y,id) {
        this.scene = scene;
        this.sac = sac;
        this.x = x;
        this.y = y;
        this.id = id;
        this.appear = null;
        this.disappear = null;
        this.object_id = 0;

        //Hitbox Des BackgroundObjet
        this.backgroundObjet = this.scene.add.sprite(x,y,'ObjetBackground_NotSelected').setVisible(false);
        this.backgroundObjet.setAlpha(0);
        this.backgroundObjethitbox = this.scene.add.zone(x -2, y -2, 105, 105);
        this.backgroundObjethitbox.setInteractive();
        this.backgroundObjethitbox.setVisible(false);

        this.objectImage = new ObjectImage(this.scene,this.x,this.y,this.object_id);
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
        this.hitboxbackgroundObjetDebug.setVisible(false);
        // Action 
        this.backgroundObjethitbox.on('pointerdown', () => {
            console.log('Objet cliqué');
            if (this.backgroundObjet.texture.key === 'ObjetBackground_Selected') {
                this.sac.updateDescription(0);
                this.sac.ClickOnObject(null);
            } else {
                this.sac.updateDescription(this.object_id);
                this.sac.ClickOnObject(this);
            }
        });
        this.setDepth();
    }

    setObjectID(id){
        this.object_id = id;
        this.objectImage.setObjectID(id);
    }

    setDepth(){
        this.backgroundObjet.setDepth(100);
    }

    FadeTo(value) {
        this.objectImage.FadeTo(value);
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
        this.objectImage.setVisible(bool);
        this.backgroundObjet.setVisible(bool);
        this.backgroundObjethitbox.setVisible(bool);// disableInteractive();
        if (this.scene.HITBOXES){
            this.hitboxbackgroundObjetDebug.setVisible(bool);
        }
    }

}