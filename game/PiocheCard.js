class PiocheCard {
    // Constructeur
    constructor(scene, x, y,seen = false){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'CartesPioche_0').setVisible(seen);
        this.floatTween = null;
        this.sprite.setDepth(80);
        // Création de l'hitbox pour la pioche.
        this.spritehitbox = scene.add.zone(x,y-2, 19, 25).setVisible(seen);
        this.spritehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x,
            y-2,
            19,
            25,
            0xFF6347, // couleur orange
            0.5       // opacité 0.5
        ).setVisible(seen);
        this.spritehitboxDebug.setDepth(85);
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        // Action 
        this.spritehitbox.on('pointerdown', () => {
            // Si c'est mon tour, j'envoie un paquet au Serveur !
            // Mettre une protection pour n'appuyer qu'une seule fois sur la pioche.
            console.log("On a appuyé sur la pioche.");
        });
        // Quand la souris passe dessus
        this.spritehitbox.on('pointerover', () => {
            this.sprite.setTexture('CartesPioche_1');
        });
        // Quand la souris sort
        this.spritehitbox.on('pointerout', () => {
            this.sprite.setTexture('CartesPioche_0');
        });
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
        this.spritehitbox.setVisible(bool);
        this.spritehitboxDebug.setVisible(bool);
    }

    StartAnimationDistribution() {
        this.distribution = [];
        let finished = 0;
        for (let i = 0; i < 7; i++) {
            const sprite = this.scene.add.sprite(this.x, this.y, 'CartesMinis_53');
            sprite.setDepth(100);
            this.distribution.push(sprite);
            const startY = sprite.y;
            const targetY = startY + 100;
            this.scene.time.delayedCall(i * 150, () => {
                this.scene.tweens.add({
                    targets: sprite,
                    y: targetY,
                    duration: 600,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        finished++;
                        if (finished === this.distribution.length) {
                            console.log("Distribution Terminée.");
                            this.scene.events.emit("distributionTerminee");
                            this.distribution.forEach(s => s.destroy());
                        }
                    }
                });
            });
            
        }
    }


    StartAnimation(){
        this.floatTween = this.scene.tweens.add({
            targets: this.sprite,          // si on est dans l'objet CarteEnJeu
            y: this.y - 3,          // amplitude du mouvement
            duration: 800,          // vitesse
            yoyo: true,             // revient en arrière
            repeat: -1,             // boucle infinie
            ease: 'Sine.easeInOut'  // mouvement doux
        });
    }

    StopAnimation(){
        this.floatTween.stop();
    }

}