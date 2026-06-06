class CarteEnJeu {
    // Constructeur
    constructor(scene, x, y,valeur = 0,seen = false){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'CartesMinis_'+ valeur).setVisible(seen);

        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x,y-2, 19, 25);
        this.spritehitbox.setInteractive();
        this.spritehitbox.setVisible(false);
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x,
            y-2,
            19,
            25,
            0x0000ff, // couleur bleu
            0.2       // opacité 0.2
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.spritehitboxDebug.setVisible(false);

        this.floatTween = null;
        this.sprite.setDepth(80);
        this.spritehitbox.setDepth(80);
        this.spritehitboxDebug.setDepth(81);
    }

    setVisible(bool){
        this.sprite.setVisible(bool);
        this.spritehitbox.setVisible(bool);
        if (bool){
            this.spritehitboxDebug.setVisible(this.scene.HITBOXES);
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

    ChangeSprite(Valeur){
        this.sprite.setTexture('CartesMinis_'+ Valeur);
    }

    CutCardAnimation(){
        const cutCard = this.scene.add.sprite(this.x,this.y,'CuttingCard_0');
        cutCard.setDepth(85);
        cutCard.play('CuttingCardAnim'); 
        cutCard.on('animationcomplete', () => {
            this.FadeTo(cutCard);
        });
    }

    FadeTo(object) {
        this.scene.tweens.killTweensOf(object);
        this.scene.tweens.add({
            targets: object,
            duration: 200,
            alpha: 0,
            ease: 'Power2',
            onComplete: ()=>{
                object.destroy();
            }
        });
    }
}