class DescriptifPower {
    constructor(scene,x,y,power) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.power = power;

        this.sprite = this.scene.add.sprite(x,y,'RoiDescription').setVisible(false);
        this.sprite.setAlpha(0);
        
        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(90);
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

    update(power){
        this.power = power;
        this.updatesprite();
    }

    updatesprite(){
        if (this.power == 0){
            this.FadeTo(0);
        } else if (this.power == 1){
            this.FadeTo(1);
            this.sprite.setTexture('ValetDescription');
        } else if (this.power == 2){
            this.FadeTo(1);
            this.sprite.setTexture('ReineDescription');
        } else if (this.power == 3){
            this.FadeTo(1);
            this.sprite.setTexture('RoiDescription');
        }
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
    }

}