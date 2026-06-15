class CanneBox{
    constructor(scene, x, y, num, objectIcon){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.num = num;
        this.objectIcon = objectIcon;
        this.scene_cartes_joueur = []; // Liste d'objet
        this.sprite = scene.add.sprite(x, y, 'CanneBox');

        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x+35,y-73, 19, 19);
        this.spritehitbox.setInteractive();
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x+35,
            y-73,
            19,
            19,
            0x0000ff, // couleur bleu
            0.2       // opacité 0.2
        );
        this.spritehitboxDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.spritehitboxDebug.setVisible(this.scene.HITBOXES);

        this.spritehitbox.on('pointerdown', () => {
            this.destroy();
        });

        this.createCards();
        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(90);
        this.spritehitbox.setDepth(91);
        this.spritehitboxDebug.setDepth(91);
    }

    createCards(){
        for (let i = 0;i < this.scene.cartes_joueur.length; i++) {
            let carteSource = this.scene.cartes_joueur[i];
            if (!this.scene_cartes_joueur[i]) {
                let reste = i%3;
                let div_ent = Math.floor(i/3);
                let X = (this.x - 25) + reste * 25; 
                let Y = (this.y - 45) + div_ent * 30;
                // Si elle n'existe pas encore → on la crée
                this.scene_cartes_joueur[i] = new CanneCard(
                    this.scene,
                    X,
                    Y,
                    carteSource.Valeur,
                    this
                );
            }
        }
    }

    destroyCards(){
        for (let i = 0;i < this.scene_cartes_joueur.length; i++) {
            if (this.scene_cartes_joueur[i]) {
                this.scene_cartes_joueur[i].destroy();
            }
        }
    }

    destroy(){
        this.objectIcon.CanneBox = null;
        this.destroyCards();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
        this.sprite.destroy();
    }
}