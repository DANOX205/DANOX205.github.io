class Sac {
    constructor(scene,Player,x,y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = Player;
        this.TRICHE = false;
        // BOUTON SAC --------------------------------------------------------------
        this.buttonSac = this.scene.add.sprite(x,y ,'SacBoutonOff');
        this.backgroundObjet1 = new ObjetSelected(this.scene,this,x+10,y-10,1);
        this.backgroundObjet2 = new ObjetSelected(this.scene,this,x-130,y-10,2);
        this.backgroundObjet3 = new ObjetSelected(this.scene,this,x+150,y-10,3);
               
        //Hitbox
        this.buttonSachitbox = this.scene.add.zone(x + 240, y + 105, 90, 110);
        this.buttonSachitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxSacDebug = this.scene.add.rectangle(
            x + 240,
            y + 105,
            90,
            110,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        );
        this.hitboxSacDebug.setDepth(85);
        this.hitboxSacDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.buttonSachitbox.on('pointerdown', () => {
            this.TRICHE = !this.TRICHE;
            console.log('Bouton SAC cliqué : TRICHE =',this.TRICHE);
            if (this.TRICHE){
                this.buttonSac.setTexture('SacBoutonOn');
                this.objectsAppear();
                this.player.setLookingDownChange();
            } else {
                this.buttonSac.setTexture('SacBoutonOff');
                this.objectsDisappear();
                this.player.setLookingDownChange();
            }
        });


        this.setDepth();
    }

    setDepth(){
        this.buttonSac.setDepth(80);
    }

    objectsAppear(){
        this.backgroundObjet1.FadeTo(1);
        this.backgroundObjet2.FadeTo(1);
        this.backgroundObjet3.FadeTo(1);
    }

    objectsDisappear(){
        this.backgroundObjet1.FadeTo(0);
        this.backgroundObjet1.backgroundObjethitbox.setVisible(false);
        this.backgroundObjet1.hitboxbackgroundObjetDebug.setVisible(false);
        this.backgroundObjet2.FadeTo(0);
        this.backgroundObjet2.backgroundObjethitbox.setVisible(false);
        this.backgroundObjet2.hitboxbackgroundObjetDebug.setVisible(false);
        this.backgroundObjet3.FadeTo(0);
        this.backgroundObjet3.backgroundObjethitbox.setVisible(false);
        this.backgroundObjet3.hitboxbackgroundObjetDebug.setVisible(false);
    }


}