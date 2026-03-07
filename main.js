import { MenuRoom } from "./game/MenuRoom.js";
import { GameRoom } from "./game/GameRoom.js";

const config = {
    type: Phaser.AUTO,
    width: 569,
    height: 320,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt : true,
    backgroundColor: '#1e1e1e',
    scene: [MenuRoom, GameRoom]
};

const game = new Phaser.Game(config);


