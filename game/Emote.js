class Emote {
    constructor(scene, x, y, i, p) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.Emote = scene.add.sprite(x, y, 'Emote_' + i);
        this.Emote.setDepth(101);

        this.Emotehitbox = scene.add.zone(this.x, this.y, 30, 30);
        this.Emotehitbox.setInteractive();  
        // Rectangle visuel pour debug
        this.hitboxDebug_Emote = scene.add.rectangle(
            this.x,
            this.y,
            30,
            30,
            0xff0000, // couleur rouge
            0.15       // opacité 0.5
        );
        this.hitboxDebug_Emote.setDepth(105);
        this.hitboxDebug_Emote.setOrigin(0.5, 0.5); // centre sur la zone

        // Action 
        this.Emotehitbox.on('pointerdown', () => {
            this.ButtonPressed(i, p);
        });
    }

    ButtonPressed(i,p){
        p.setEmotion(i); 
        this.EMOTE = !this.EMOTE;
        this.scene.DestroyAllButtons();
        this.scene.ChangeEmoteValue();
        // Envoyer l'information au serveur
    }

}