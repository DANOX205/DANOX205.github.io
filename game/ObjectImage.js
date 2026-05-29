class ObjectImage {
    constructor(scene,x,y,object_id) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.object_id = object_id;

        let objet_string = this.idToString(object_id);
        this.sprite = this.scene.add.sprite(x,y,objet_string).setVisible(false);
        this.setDepth();
    }

    setObjectID(id){
        this.object_id = id;
        let objet_string = this.idToString(id);
        this.sprite.setTexture(objet_string);
    }

    setDepth(){
        this.sprite.setDepth(101);
    }

    FadeTo(value) {
        this.setVisible(true);
        this.scene.tweens.killTweensOf(this.sprite);
        this.scene.tweens.add({
            targets: this.sprite,
            duration: 600,
            alpha: value,
            ease: 'Power2',
            onComplete: ()=>{
                this.setVisible(value);
            }
        });
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
    }
    
    idToString(id){
        switch (id){
            case 1 :
                return 'Batte';
                break;
            case 2 :
                return 'Canne';
                break;
            case 3 :
                return 'Ciseaux';
                break;
            case 4 :
                return 'Crayon';
                break;
            case 5 :
                return 'Lunettes';
                break;
            case 6 :
                return 'Menottes';
                break;
            case 7 :
                return 'Telephone';
                break;
        }
        return 'DescriptifObjet_0';
    }
}