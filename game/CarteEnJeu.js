class CarteEnJeu {
    // Constructeur
    constructor(scene, x, y,valeur = 0,seen = false){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'CartesMinis_'+ valeur).setVisible(seen);
        this.floatTween = null;
        this.sprite.setDepth(80);
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
}