class TruckAnimation{
    constructor(scene,x,y,typeanimation){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.truck = scene.add.sprite(272, -600, '4x4_truck');
        this.wheels = scene.add.sprite(287, -300, '4x4_wheels');
        if (typeanimation === 0){
            this.launchAnimation1();
        } else {
            this.scene.time.delayedCall(1000, () => {
                this.launchAnimation2();
            });
        }
        this.setDepth();
    }

    setDepth(){
        this.truck.setDepth(89);
        this.wheels.setDepth(90);
    }

    launchAnimation1(){
        // Les roues apparaissent dès le début
        this.wheels.setVisible(true);
        // Chute des Roues
        this.scene.tweens.add({
            targets: this.wheels,
            y: 140,
            duration: 800,
            ease: 'Sine.In',
            onComplete: () => {
                this.playSmoke();
                this.scene.time.delayedCall(300, () => {
                    this.scene.tweens.add({
                        targets: this.wheels,
                        y: 120,
                        duration: 400,
                        ease: 'Sine.Out',
                        onComplete: () => {
                            this.scene.time.delayedCall(50, () => {
                            this.scene.tweens.add({
                                targets: this.wheels,
                                y: 140,
                                duration: 400,
                                ease: 'Sine.Out',
                                onComplete: () => {
                                    
                                }});
                            });
                        }
                    });
                });
            }
        });
        // Chute du truck 4x4
        this.scene.tweens.add({
            targets: this.truck,
            y: 180,
            duration: 800,
            ease: 'Sine.In',
            onComplete: () => {
                this.scene.time.delayedCall(100, () => {
                    this.scene.tweens.add({
                        targets: this.truck,
                        y: 110,
                        duration: 400,
                        ease: 'Sine.Out',
                        onComplete: () => {
                            this.scene.time.delayedCall(50, () => {
                            this.scene.tweens.add({
                                targets: this.truck,
                                y: 140,
                                duration: 400,
                                ease: 'Sine.Out',
                                onComplete: () => {
                                    
                                }});
                            });
                        }});
                });
            }
        });
    }

    playSmoke() {
        this.scene.cameras.main.shake(
            150,
            0.01
        );
        const wheelPositions = [
            this.truck.x-80,
            this.truck.x+160
        ];
        const shockwave1 = this.scene.add.circle(
            wheelPositions[0],
            280,
            10,
            0xffffff
        );
        const shockwave2 = this.scene.add.circle(
            wheelPositions[1],
            280,
            10,
            0xffffff
        );
        shockwave1.setStrokeStyle(4, 0xffffff).setDepth(91);
        shockwave1.setFillStyle();
        shockwave2.setStrokeStyle(4, 0xffffff).setDepth(91);
        shockwave2.setFillStyle();
        this.scene.tweens.add({
            targets: [shockwave1,shockwave2],
            scale: 12,
            alpha: 0,
            duration: 500,
            ease: 'Quad.Out',
            onComplete: () => {
                shockwave1.destroy();
                shockwave2.destroy();
            }
        });

        for(let i = 0; i < 8; i++){
            const smoke = this.scene.add.sprite(
                this.truck.x + 40 + 185 + Phaser.Math.Between(-250,250),
                180,
                '4x4_smoke_' + Phaser.Math.Between(0,4)
            );
            smoke.alpha = Phaser.Math.Between(50,100) / 100;
            smoke.setDepth(91);
            this.scene.tweens.add({
                targets: smoke,
                y: smoke.y - Phaser.Math.Between(120,10),
                x: smoke.x + Phaser.Math.Between(-10,10),
                alpha: 0,
                //scale: Phaser.Math.FloatBetween(1.5,3),
                duration: Phaser.Math.Between(500,800),
                onComplete: () => smoke.destroy()
            });
        }
    }

    launchAnimation2(){
        const black_screen = this.scene.add.sprite(
            284.5,
            160,
            'WhiteScreen_1'
        ).setDepth(10000);
        this.scene.time.delayedCall(5000, () => {
            black_screen.destroy();
        });
    }

    destroy(){
        this.truck.destroy();
        this.wheels.destroy();
    }
}