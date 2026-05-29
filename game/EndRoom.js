export const RoomState = Object.freeze({
    WAITING_PLAYERS: "WAITING_PLAYERS",
    GAME_STARTED: "GAME_STARTED",
    GAME_PAUSED: "GAME_PAUSED",
    GAME_ENDED: "GAME_ENDED"
});

export class EndRoom extends Phaser.Scene {
    constructor() {
        super("EndRoom");
        this.roomState = RoomState.GAME_ENDED;
    }

    init(data) {
        this.playerData = data.playerData;
        this.HITBOXES = data.playerData.ShowHitboxes;
        this.TRICHE = data.playerData.Triche;
        this.playerName = data.playerData.Username;
        this.SkinCorpsIndex = data.playerData.SkinCorpsIndex;
        this.SkinTeteIndex = data.playerData.SkinTeteIndex;
        this.WINNER = data.serverData.Winner;
        this.socket = data.serverData.socket;
        this.myNum = data.serverData.NUM;
        this.myId = data.serverData.ID;
        this.playerCount = data.serverData.playerCount;
    }

    preload() {
        //Nametag
        this.load.image('Nametag_Game_0','./assets/sNametag_Game_0.png');
        this.load.image('Nametag_Game_1','./assets/sNametag_Game_1.png');

        //Winning podium
        this.load.image('Podium', 'assets/sWinner_Podium_0.png');

        // Confettis 
        for (let i = 0; i <= 4; i++) {  // 5 images (0 à 4)
            this.load.image('Confetti_Bleu_' + i, 'assets/sConfetti_Blue_' + i + '.png');
        }
        for (let i = 0; i <= 4; i++) {  // 5 images (0 à 4)
            this.load.image('Confetti_Rouge_' + i, 'assets/sConfetti_Red_' + i + '.png');
        }
        for (let i = 0; i <= 4; i++) {  // 5 images (0 à 4)
            this.load.image('Confetti_Vert_' + i, 'assets/sConfetti_Green_' + i + '.png');
        }
        for (let i = 0; i <= 4; i++) {  // 5 images (0 à 4)
            this.load.image('Confetti_Jaune_' + i, 'assets/sConfetti_Yellow_' + i + '.png');
        }

        // Leave
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('btnLeave_' + i, 'assets/sLeave_New_' + i + '.png');
        }

        // Reset
        for (let i = 0; i <= 1; i++) {  // 2 images (0 à 1)
            this.load.image('btnReset_' + i, 'assets/sReset_' + i + '.png');
        }

    }

// Variables Globales pour le jeu

    create() {
        window.scrollTo(0, 1);
        this.players = {};
        this.special_card_power = [];
        this.special_card_power[0] = ({
            playernum : 0,
            power : 0
        });
        this.lastNetworkUpdate = 0;
        // Transition du Début
        this.anims.create({
            key: 'transitionAnim',
            frames: [
                { key: 'Transition_0' },
                { key: 'Transition_1' },
                { key: 'Transition_2' },
                { key: 'Transition_3' },
                { key: 'Transition_4' },
                { key: 'Transition_5' },
                { key: 'Transition_6' },
                { key: 'Transition_7' },
                { key: 'Transition_8' },
                { key: 'Transition_9' },
                { key: 'Transition_10' },
                { key: 'Transition_11' },
                { key: 'Transition_12' },
                { key: 'Transition_13' },
                { key: 'Transition_14' },
                { key: 'Transition_15' },
                { key: 'Transition_16' },
                { key: 'Transition_17' },
                { key: 'Transition_18' }
            ],
            frameRate: 10, // 10 images par seconde
            repeat: 0      // 0 = joue une fois, -1 = boucle infinie
        });
        this.anims.create({
            key: 'TitreAnim',
            frames: [
                { key: 'Titre_0' },
                { key: 'Titre_1' }
            ],
            frameRate: 10, // 10 images par seconde
            repeat: -1      // 0 = joue une fois, -1 = boucle infinie
        });

        const transition = this.add.sprite(284.5,160 ,'Transition_0');
        transition.setDepth(1000);
        transition.play('transitionAnim'); 
        transition.on('animationcomplete', () => {
            transition.destroy();
        });

        // Titre 
        this.titre = this.add.sprite(277,110 ,'Titre_0');
        this.titre.setDepth(5);
        this.titre.play('TitreAnim');

        // Décor 
        const background = this.add.sprite(284.5,160 ,'Background');
        background.setDepth(0);
        const background2 = this.add.sprite(284.5,160 ,'Background2');
        background2.setDepth(1);
        background2.setAlpha(0.1);
        const podium = this.add.sprite(295,250,'Podium');
        podium.setDepth(50);
        const lampe = this.add.sprite(284.5,110 ,'Lampe');
        lampe.setDepth(50);
        const light = this.add.sprite(284.5,200 ,'Light');
        light.setDepth(70);
        light.setAlpha(0.2);
        this.tweens.add({
            targets: podium,
            y: 190,
            duration: 3000, // 3 secondes
            ease: 'Power2'
        });
        

        // Positionnement des éléments intéractifs
        const Player_X = 295;
        const Player_Y = 205; // 205
        const Player1_X = 70;
        const Player1_Y = 240;
        const buttonLeave_X = 520;
        const buttonLeave_Y = -50;
        const buttonReset_X = 520;
        const buttonReset_Y = 172;

        // BOUTON LEAVE --------------------------------------------------------------
        const buttonLeave = this.add.sprite(buttonLeave_X,buttonLeave_Y ,'btnLeave_0');
        //Depth
        buttonLeave.setDepth(79);
        //Hitbox
        const buttonLeavehitbox = this.add.zone(buttonLeave_X+ 7, buttonLeave_Y+ 101, 62, 98);
        buttonLeavehitbox.setInteractive(); 
        // Rectangle visuel pour debug
        this.hitboxDebug_buttonLeave = this.add.rectangle(
            buttonLeave_X + 7,
            buttonLeave_Y + 101,
            62,
            98,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        this.hitboxDebug_buttonLeave.setDepth(85);
        this.hitboxDebug_buttonLeave.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxDebug_buttonLeave.setVisible(this.HITBOXES);
        // Action 
        buttonLeavehitbox.on('pointerdown', () => {
                console.log('Bouton LEAVE cliqué.');
                this.socket.close();
                const playerData = {
                    SkinTeteIndex: this.SkinTeteIndex,
                    SkinCorpsIndex: this.SkinCorpsIndex,
                    Username: this.playerName,
                    Emotion: this.PLAYER.getEmotion(),
                    Triche : this.TRICHE,
                    ShowHitboxes : this.HITBOXES,
                };
                this.scene.start("MenuRoom", {playerData : playerData});
        });
        // BOUTON RESET --------------------------------------------------------------
        const buttonReset = this.add.sprite(buttonReset_X,buttonReset_Y ,'btnReset_0');
        //Depth
        buttonReset.setDepth(79);
        //Hitbox
        const buttonResethitbox = this.add.zone(buttonReset_X+ 8, buttonReset_Y+ 103, 72, 82);
        buttonResethitbox.setInteractive(); 
        // Rectangle visuel pour debug
        this.hitboxDebug_buttonReset = this.add.rectangle(
            buttonReset_X+8,
            buttonReset_Y + 103,
            72,
            82,
            0x0000ff, // couleur bleu
            0.25       // opacité 0.5
        );
        this.hitboxDebug_buttonReset.setDepth(85);
        this.hitboxDebug_buttonReset.setOrigin(0.5, 0.5); // centre sur la zone
        this.hitboxDebug_buttonReset.setVisible(this.HITBOXES);
        // Action 
        buttonResethitbox.on('pointerdown', () => {
                console.log('Bouton RESET cliqué.');
                const playerData = {
                    SkinTeteIndex: this.SkinTeteIndex,
                    SkinCorpsIndex: this.SkinCorpsIndex,
                    Username: this.playerName,
                    Emotion: this.PLAYER.getEmotion(),
                    Triche : this.TRICHE,
                    ShowHitboxes : this.HITBOXES,
                };
                const serverData = {
                    socket: this.socket,
                    NUM: this.myNum,
                    ID: this.myId,
                    Winner : this.Winner,
                    playerCount : this.playerCount,
                };
                this.sendReset();
                this.scene.start("GameRoom", {playerData : this.playerData, serverData});
        });

        this.PLAYER = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,0, this.playerData.Username);
        this.PLAYER.setEmotion(2);
        this.PLAYER.cartesShow.clickAllowed = false;
        // Joueur1 --------------------------------------------------------------
        this.PLAYER1 = new Player(this,Player1_X ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,1, this.playerData.Username);
        this.PLAYER1.setEmotion(2);
        this.PLAYER1.cartesShow.clickAllowed = false;
        console.log(this.playerData);
        this.PLAYER1.setVisiblePlayer(false);
        // Joueur2 --------------------------------------------------------------
        this.PLAYER2 = new Player(this,Player1_X+100,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,2, this.playerData.Username);
        this.PLAYER2.setEmotion(2);
        this.PLAYER2.cartesShow.clickAllowed = false;
        this.PLAYER2.setVisiblePlayer(false);
        // Joueur3 --------------------------------------------------------------
        this.PLAYER3 = new Player(this,Player1_X+340 ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,3, this.playerData.Username);
        this.PLAYER3.setEmotion(2);
        this.PLAYER3.cartesShow.clickAllowed = false;
        this.PLAYER3.setVisiblePlayer(false);
        // Joueur4 --------------------------------------------------------------
        this.PLAYER4 = new Player(this,Player1_X+440 ,Player1_Y, this.playerData.SkinTeteIndex,this.playerData.SkinCorpsIndex,this.playerData.Emotion,4, this.playerData.Username);
        this.PLAYER4.setEmotion(2);
        this.PLAYER4.cartesShow.clickAllowed = false;
        this.PLAYER4.setVisiblePlayer(false);

        console.log("WINNER :" + this.WINNER + " // MYNUM : " + this.myNum);
        console.log("playerCount :" + this.playerCount);
        console.log("(this.myNum + 1) % (this.playerCount+1) :" + (this.myNum + 1) % (this.playerCount+1));
        console.log("(this.myNum + 2) % (this.playerCount+1) :" + (this.myNum + 2) % (this.playerCount+1));
        console.log("(this.myNum + 3) % (this.playerCount+1) :" + (this.myNum + 3) % (this.playerCount+1));
        
        if (this.WINNER == this.myNum) {
            this.WPLAYER = this.PLAYER; 
        } else if (this.WINNER == ((this.myNum) % (this.playerCount))+1){
            this.WPLAYER = this.PLAYER1;
        } else if (this.WINNER == ((this.myNum + 1) % (this.playerCount))+1){
            this.WPLAYER = this.PLAYER2;
        } else if (this.WINNER == ((this.myNum + 2) % (this.playerCount))+1){
            this.WPLAYER = this.PLAYER3;
        } else {
            this.WPLAYER = this.PLAYER4;
        } 
        this.WPLAYER.setPosition(Player_X,Player_Y);

        this.ALL_PLAYERS = [
            this.PLAYER,
            this.PLAYER1,
            this.PLAYER2,
            this.PLAYER3,
            this.PLAYER4
        ];
        let counter = 0;
        let padding = 0;
        this.ALL_PLAYERS.forEach(player => {
            if (player.NUM < this.playerCount) {
                player.setVisiblePlayer(true);
            }
            if (player === this.WPLAYER) return;
            if (counter > 1){
                padding = 340;
            }
            player.setPosition(
                Player1_X + (padding + (counter%2) * 100),
                Player1_Y
            );
            counter = counter + 1;
            player.setEmotion(2);
        });

        this.tweens.add({
            targets: this.WPLAYER,
            y: 145,
            duration: 3000,
            ease: 'Power2',
            onUpdate: () => {
                this.WPLAYER.setPosition(this.WPLAYER.x, this.WPLAYER.y);
                this.WPLAYER.setEmotion(4);
            }
        });
        this.createConfetti();

        // ====================================================== //
        // ===================== NETWORK ======================== //
        // ====================================================== //
        this.socket.addEventListener("message", (event) => {
            //console.log("Message reçu :", event.data);
            const data = JSON.parse(event.data);
            if (data.type === "worldUpdate_END") {
                this.players = data.payload.players;
                this.updatePlayers();
            }
        });
        this.events.on('shutdown', () => {
            if (this.socket) {
                this.socket.onmessage = null;
            }
        });
    }

    update(time, delta) {

        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
        if (time > this.lastNetworkUpdate + 50) { // 50ms = 20 fois/sec
            this.lastNetworkUpdate = time;
            this.socket.send(JSON.stringify({
                type: "playerUpdate_END",
                payload: this.PLAYER.getInformations()
            }));
        }

        // CONFETTIS
        this.confettis.forEach(confetti => {
            confetti.y += confetti.speed;
            confetti.x += Math.sin(confetti.y * 0.02);
            confetti.angle += confetti.speed;
            // Reset quand sort de l'écran
            if (confetti.y > 380) {
                confetti.y = Phaser.Math.Between(-200, -20);
                confetti.x = Phaser.Math.Between(0, 590);
                confetti.speed = Phaser.Math.Between(1, 4);
                confetti.depth = 500;
                confetti.color = Phaser.Utils.Array.GetRandom([
                    'Confetti_Rouge',
                    'Confetti_Bleu',
                    'Confetti_Vert',
                    'Confetti_Jaune'
                ]);
                confetti.setScale(
                    Phaser.Math.FloatBetween(0.5, 1.5)
                );
            }
        });

    }

    createConfetti() {
        const colors = [
            'Confetti_Rouge',
            'Confetti_Bleu',
            'Confetti_Vert',
            'Confetti_Jaune'
        ];
        this.confettis = [];
        for (let i = 0; i < 50; i++) {
            const color = Phaser.Utils.Array.GetRandom(colors);
            const frame = Phaser.Math.Between(0, 4);
            const texture = color + '_' + frame;
            const confetti = this.add.sprite(
                Phaser.Math.Between(0, 590),
                Phaser.Math.Between(-400, -20),
                texture
            );
            confetti.color = color;
            confetti.frameIndex = frame;
            confetti.speed = Phaser.Math.Between(1, 4);
            confetti.setScale(
                Phaser.Math.FloatBetween(0.5, 1.5)
            );
            confetti.setAngle(
                Phaser.Math.Between(0, 360)
            );
            this.confettis.push(confetti);
        }

        // Animation des frames
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.confettis.forEach(confetti => {
                    confetti.frameIndex++;
                    if (confetti.frameIndex > 4) {
                        confetti.frameIndex = 0;
                    }
                    confetti.setTexture(
                        confetti.color + '_' + confetti.frameIndex
                    );
                });
            }
        });
    }

    // ====================================================== //
    // ================== UPDATE PLAYERS ==================== //
    // ====================================================== //

    updatePlayers(){
        const playersArray = Object.values(this.players).sort((a, b) => a.num - b.num); // important pour un ordre stable
        //const cartesArray = Object.values(this.cartes).sort((a, b) => a.num - b.num);
        const myIndex = playersArray.findIndex(p => p.id === this.myId);
        const circularList = this.buildCircularList(playersArray, myIndex);
        //const NbrCartesAutres = this.buildCircularList_Cards(cartesArray,myIndex);
        let TurnList = [0,0,0,0];
        switch (circularList.length){
            case 1 :
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                }
                
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    false,
                    circularList[0].num,
                    circularList[0].playerName,
                    [-1],
                    false, false,false,TurnList[0]);
                break;
            case 2 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    false,
                    circularList[0].num,
                    circularList[0].playerName,
                    [-1],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    false,
                    circularList[1].num,
                    circularList[1].playerName,
                    [-1],
                    false, false,false,TurnList[1]);
                break;
            case 3 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                } else if (this.Turn === circularList[2].num){
                    TurnList[2] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    false,
                    circularList[0].num,
                    circularList[0].playerName,
                    [-1],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    false,
                    circularList[1].num,
                    circularList[1].playerName,
                    [-1],
                    false, false,false,TurnList[1]);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    false,
                    circularList[2].num,
                    circularList[2].playerName,
                    [-1],
                    false, false,false,TurnList[2]);
                break;
            case 4 : 
                if (this.Turn === circularList[0].num){
                    TurnList[0] = 1;
                } else if (this.Turn === circularList[1].num){
                    TurnList[1] = 1;
                } else if (this.Turn === circularList[2].num){
                    TurnList[2] = 1;
                } else if (this.Turn === circularList[3].num){
                    TurnList[3] = 1;
                }
                this.PLAYER1.updatePlayerGlobal(
                    circularList[0].skinTeteIndex,
                    circularList[0].skinCorpsIndex,
                    circularList[0].emotion, 
                    false,
                    circularList[0].num,
                    circularList[0].playerName,
                    [-1],
                    false, false,false,TurnList[0]);
                this.PLAYER2.updatePlayerGlobal(
                    circularList[1].skinTeteIndex,
                    circularList[1].skinCorpsIndex,
                    circularList[1].emotion, 
                    false,
                    circularList[1].num,
                    circularList[1].playerName,
                    [-1],
                    false, false,false,TurnList[1]);
                this.PLAYER3.updatePlayerGlobal(
                    circularList[2].skinTeteIndex,
                    circularList[2].skinCorpsIndex,
                    circularList[2].emotion, 
                    false,
                    circularList[2].num,
                    circularList[2].playerName,
                    [-1],
                    false, false,false,TurnList[2]);
                this.PLAYER4.updatePlayerGlobal(
                    circularList[3].skinTeteIndex,
                    circularList[3].skinCorpsIndex,
                    circularList[3].emotion, 
                    false,
                    circularList[3].num,
                    circularList[3].playerName,
                    [-1],
                    false, false,false,TurnList[3]);
                break;
        }
    }

    buildCircularList(playersArray, myIndex){
        const circularPlayers = [];
        for (let i = 1; i < playersArray.length; i++) {
            const index = (myIndex + i) % playersArray.length;
            circularPlayers.push(playersArray[index]);
        }
        return circularPlayers;
    }

    sendReset(){
        this.socket.send(JSON.stringify({
            type: "Reset"
        }));
    }
}

