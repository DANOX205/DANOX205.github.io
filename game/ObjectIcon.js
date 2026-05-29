class ObjectIcon {
    constructor(scene,x,y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.sprite = this.scene.add.sprite(this.x,this.y ,'ObjetIcon_0');

        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(70);
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
    }

    setSprite(id){
        this.sprites.setTexture('ObjetIcon_' + id);
    }

}