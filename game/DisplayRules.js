class DisplayRules{
    constructor(scene,x,y){
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.sprite = scene.add.sprite(x, y, 'Rules_0');
        this.Selected = false;
        this.RulesPage = 0;
        //Hitbox
        this.spritehitbox = this.scene.add.zone(x-207, y -142, 28, 28);
        this.spritehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxspriteDebug = this.scene.add.rectangle(
            x- 207,
            y- 142,
            28,
            28,
            0xff0000, // couleur rouge
            0.2       // opacité 0.2
        );
        this.hitboxspriteDebug.setOrigin(0.5, 0.5); // centre sur la zone

        this.spritehitbox.on('pointerdown', () => {
            this.Selected = !this.Selected;
            if (!this.Selected) {
                this.sprite.setTexture('Rules_0');
                this.RulesPage = 0;
                this.nexthitbox.setVisible(false);
                this.hitboxnextDebug.setVisible(false);
                this.previoushitbox.setVisible(false);
                this.hitboxpreviousDebug.setVisible(false);
            } else {
                this.sprite.setTexture('Rules_1');
                this.nexthitbox.setVisible(true);
                this.hitboxnextDebug.setVisible(true);
                this.previoushitbox.setVisible(true);
                this.hitboxpreviousDebug.setVisible(true);
                this.RulesPage = 1;

            }
            console.log("Bouton Règles appuyé !");
        });

        //Hitbox
        this.nexthitbox = this.scene.add.zone(x+228, y+125, 50, 28);
        this.nexthitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxnextDebug = this.scene.add.rectangle(
            x+ 228,
            y+ 125,
            50,
            28,
            0xff0000, // couleur rouge
            0.2       // opacité 0.2
        );
        this.hitboxnextDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.nexthitbox.on('pointerdown', () => {
            if (this.RulesPage <= 2){
                this.RulesPage = this.RulesPage + 1;
                this.sprite.setTexture('Rules_' + this.RulesPage);
            }
        });

        //Hitbox
        this.previoushitbox = this.scene.add.zone(x-200, y+125, 50, 28);
        this.previoushitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxpreviousDebug = this.scene.add.rectangle(
            x- 196,
            y+ 125,
            50,
            28,
            0xff0000, // couleur rouge
            0.2       // opacité 0.2
        );
        this.hitboxpreviousDebug.setOrigin(0.5, 0.5); // centre sur la zone
        this.previoushitbox.on('pointerdown', () => {
            if (this.RulesPage >= 2){
                this.RulesPage = this.RulesPage - 1;
                this.sprite.setTexture('Rules_' + this.RulesPage);
            }
        });

        this.nexthitbox.setVisible(false);
        this.hitboxnextDebug.setVisible(false);
        this.previoushitbox.setVisible(false);
        this.hitboxpreviousDebug.setVisible(false);

        this.setDepth();
    }

    setDepth(){
        this.sprite.setDepth(105);
        this.spritehitbox.setDepth(105);
        this.hitboxspriteDebug.setDepth(105);
        this.nexthitbox.setDepth(105);
        this.hitboxnextDebug.setDepth(105);
        this.previoushitbox.setDepth(105);
        this.hitboxpreviousDebug.setDepth(105);
    }

}