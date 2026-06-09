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
        this.DescriptifObjet = new DescriptifObjet(this.scene,this,x,y);

        this.selectedBackground = 0;
        this.selectedObject = 0;
               
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
        this.hitboxSacDebug.setVisible(this.scene.HITBOXES);
        // Action 
        this.buttonSachitbox.on('pointerdown', () => {
            this.TRICHE = !this.TRICHE;
            console.log('Bouton SAC cliqué : TRICHE =',this.TRICHE);
            this.player.SacSelected = this.TRICHE;
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
        this.Objets_test(6); // A SUP
        this.setDepth();
    }

    setDepth(){
        this.buttonSac.setDepth(80);
    }

    objectsAppear(){
        this.backgroundObjet1.FadeTo(1);
        this.backgroundObjet2.FadeTo(1);
        this.backgroundObjet3.FadeTo(1);
        this.DescriptifObjet.FadeTo(1);
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
        this.DescriptifObjet.FadeTo(0);
    }

    updateDescription(value, id){
        this.selectedObject = value;
        this.selectedBackground = id;
        this.DescriptifObjet.updateSprite(value);
    }

    ClickOnObject(ObjectSelected){
        this.backgroundObjet1.backgroundObjet.setTexture('ObjetBackground_NotSelected');
        this.backgroundObjet2.backgroundObjet.setTexture('ObjetBackground_NotSelected');
        this.backgroundObjet3.backgroundObjet.setTexture('ObjetBackground_NotSelected');
        if (ObjectSelected === null){
            this.scene.objetIcon.setSprite(this.selectedObject);
        } else {
            ObjectSelected.backgroundObjet.setTexture('ObjetBackground_Selected');
            this.scene.objetIcon.setSprite(this.selectedObject);
        }
    }

    setRandom_Objects(){
        this.backgroundObjet1.setObjectID(Math.floor(Math.random() * 7) + 1);
        this.backgroundObjet2.setObjectID(Math.floor(Math.random() * 7) + 1);
        this.backgroundObjet3.setObjectID(Math.floor(Math.random() * 7) + 1);
    }

    Objets_test(id){
        switch (id) {
            case 0 :
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(2);
                this.backgroundObjet3.setObjectID(3);
                break;
            case 1 :
                this.backgroundObjet1.setObjectID(4);
                this.backgroundObjet2.setObjectID(5);
                this.backgroundObjet3.setObjectID(6);
                break;
            case 2 :
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(7);
                this.backgroundObjet3.setObjectID(5);
                break;
            case 3 : 
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(1);
                this.backgroundObjet3.setObjectID(1);
                break;
            case 4 :
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(2);
                this.backgroundObjet3.setObjectID(7);
                break;
            case 5 :
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(2);
                this.backgroundObjet3.setObjectID(6);
                break;
            case 6 :
                this.backgroundObjet1.setObjectID(1);
                this.backgroundObjet2.setObjectID(7);
                this.backgroundObjet3.setObjectID(6);
                break;
        }
    }

    removeObject(){
        switch (this.selectedBackground) {
            case 1 :
                this.backgroundObjet1.setObjectID(0);
                break;
            case 2 : 
                this.backgroundObjet2.setObjectID(0);
                break;
            case 3 : 
                this.backgroundObjet3.setObjectID(0);
                break;
        }
        this.updateDescription(0);
        this.scene.objetIcon.setSprite(0);
    }
}