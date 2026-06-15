class HameconAnimation{
    constructor(scene,x,y,typeanimation){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.hook = scene.add.sprite(272, -200, 'GrosHamecon');
        this.card = scene.add.sprite(287, 300, 'CartesMinis_53').setVisible(false);
        switch (typeanimation){
            case 0:
                this.launchAnimation1();                
                break;
            case 1:
                this.scene.time.delayedCall(3000, () => {
                    this.launchAnimation2();                
                });
                break;
            case 2:
                this.scene.time.delayedCall(3000, () => {
                    this.launchAnimation3();   
                });
                break;
        }
        this.setDepth();
    }

    setDepth(){
        this.hook.setDepth(89);
        this.card.setDepth(90);
    }

    launchAnimation1(){
        this.hook.setTexture('GrosHamecon');
        this.card.setTexture('CartesMinis_53').setScale(2);
        this.scene.tweens.add({
            targets: this.hook,
            y: 160,
            duration: 1000,
            ease: 'Sine.Out',
            onComplete: () => {
                this.card.setPosition(287, 300).setVisible(true);
                this.scene.time.delayedCall(300, () => {
                    this.scene.tweens.add({
                        targets: this.hook,
                        y: -200,
                        duration: 1000,
                        ease: 'Sine.In',
                        onComplete: () => {
                            this.destroy();
                        }
                    });
                    this.scene.tweens.add({
                        targets: this.card,
                        y: -60,
                        duration: 1000,
                        ease: 'Sine.In',
                        onComplete: () => {
                            this.destroy();
                        }
                    });
                });
            }
        });
    }

    launchAnimation2(){
        this.hook.setTexture('GrosHamecon');
        this.card.setTexture('CartesMinis_53').setScale(2).setVisible(true);
        this.card.setPosition(287, -60);
        this.scene.tweens.add({
            targets: this.hook,
            y: 160,
            duration: 1000,
            ease: 'Sine.Out',
            onComplete: () => {
                this.card.setVisible(false);
                this.scene.time.delayedCall(300, () => {
                        this.scene.tweens.add({
                        targets: this.hook,
                        y: -200,
                        duration: 1000,
                        ease: 'Sine.In',
                        onComplete: () => {
                            this.destroy();
                        }
                    });
                });
            }
        });
        this.scene.tweens.add({
            targets: this.card,
            y: 287,
            duration: 1000,
            ease: 'Sine.Out'
        });
    }

    launchAnimation3(){
        this.hook.setTexture('PetitHamecon').setPosition(this.x-5,-200);
        this.card.setTexture('CartesMinis_53').setScale(1).setVisible(true);
        this.card.setPosition(this.x+10, -57);
        this.scene.tweens.add({
            targets: this.hook,
            y: 160 -50,
            duration: 1000,
            ease: 'Sine.Out',
            onComplete: () => {
                this.card.setVisible(false);
                this.scene.time.delayedCall(300, () => {
                        this.scene.tweens.add({
                        targets: this.hook,
                        y: -200,
                        duration: 1000,
                        ease: 'Sine.In',
                        onComplete: () => {
                            this.destroy();
                        }
                    });
                });
            }
        });
        this.scene.tweens.add({
            targets: this.card,
            y: 290 -50,
            duration: 1000,
            ease: 'Sine.Out'
        });
    }

    destroy(){
        this.hook.destroy();
        this.card.destroy();
    }
}