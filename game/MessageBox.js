class MessageBox{
    constructor(scene, x, y, message){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.message = message;
        this.sprite = scene.add.sprite(x, y-100, 'MessageBox');

        this.message = scene.add.text(this.x - 110, this.y-255, message, {
            fontFamily: 'Kristen',
            fontSize: '10px',
            fontStyle: "bold",
            color: '#00A2E8',
            wordWrap: {
                width: 310,
                useAdvancedWrap: true
            }
        }).setOrigin(0, 0);
        this.setDepth();
        this.startAnimation();
    }
    
    startAnimation() {
        // Descente
        this.scene.tweens.add({
            targets: [this.sprite, this.message],
            y: '+=100',
            duration: 500,
            ease: 'Back.Out',
            onComplete: () => {
                // Attente puis remontée
                this.scene.time.delayedCall(8000, () => {
                    this.scene.tweens.add({
                        targets: [this.sprite, this.message],
                        y: '-=220',
                        duration: 500,
                        ease: 'Back.In',
                        onComplete: () => {
                            this.destroy();
                        }
                    });
                });
            }
        });
    }

    setDepth(){
        this.sprite.setDepth(102);
        this.message.setDepth(103);
    }

    destroy(){
        this.sprite.destroy();
        this.message.destroy();
    }
}