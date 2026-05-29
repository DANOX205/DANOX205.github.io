class DescriptifObjet {
    constructor(scene,sac,x,y) {
        this.scene = scene;
        this.sac = sac;
        this.x = x;
        this.y = y;

        this.sprite = this.scene.add.sprite(0,0,'DescriptifObjet_0').setVisible(false);
        this.sprite.setAlpha(0);
        
        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(100);
    }

    updateSprite(value){
        this.sprite.setTexture('DescriptifObjet_' + value);
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

}