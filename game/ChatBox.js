class ChatBox{
    constructor(scene, x, y, num, objectIcon){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.num = num;
        this.objectIcon = objectIcon;
        this.sprite = scene.add.sprite(x, y, 'ChatBox');
        this.messageValue = "";
        this.message = scene.add.text(this.x - 155, this.y-30, "", {
            fontFamily: 'Kristen',
            fontSize: '15px',
            fontStyle: "bold",
            color: '#000000',
            wordWrap: {
                width: 310,
                useAdvancedWrap: true
            }
        }).setOrigin(0, 0);

        // Création de l'hitbox pour la carte.
        this.spritehitbox = scene.add.zone(x+169,y-48, 19, 19);
        this.spritehitbox.setInteractive();
        // Rectangle visuel pour debug
        this.spritehitboxDebug = scene.add.rectangle(
            x+169,
            y-48,
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

        const input = document.getElementById("nameInput");
        input.focus();
        scene.tweens.add({
            targets: this.message,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.editHint = scene.add.text(this.x + 5, this.y-10, "Entrez votre message", {
            fontSize: '15px',
            color: '#616161'
        }).setOrigin(0.5);
        this.editHint.setVisible(true);

        this.editOverlay = scene.add.rectangle(
            scene.scale.width / 2,
            scene.scale.height / 2,
            scene.scale.width,
            scene.scale.height,
            0x000000,
            0.5
        );
        scene.tweens.add({
            targets: this.editOverlay,
            alpha: 0.5,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        /*
        this.keyHandler = (event) => {
            const oldValue = this.messageValue;
            if (event.key === "Enter" || event.key === "Return") {
                const trimmedName = this.messageValue.trim();
                if (trimmedName.length > 0) {
                    //this.sendMessage();
                    this.destroy();
                } else {
                    console.log("Nom invalide !");
                }
            }else if (event.key === "Backspace") {
                this.messageValue = this.messageValue.slice(0, -1);
            }
            else if (event.key.length === 1 && this.messageValue.length < 150) {
                this.messageValue += event.key;
            }
            this.message.setText(this.messageValue);
            if (this.message.getWrappedText().length > 3) {
                this.messageValue = oldValue;
                this.message.setText(this.messageValue);
            }
            this.editHint.setVisible(this.messageValue.length === 0);
        };
        scene.input.keyboard.on('keydown', this.keyHandler);
        */
        this.htmlInput = document.createElement("input");
        this.htmlInput.type = "text";
        this.htmlInput.setAttribute("enterkeyhint", "done");
        this.htmlInput.maxLength = 150;
        Object.assign(this.htmlInput.style, {
            position: "absolute",
            opacity: "0",
            left: "-1000px",
            top: "-1000px",
            zIndex: "9999"
        });
        document.body.appendChild(this.htmlInput);
        this.htmlInput.focus();

        this.inputHandler = () => {
            const oldValue = this.messageValue;
            this.messageValue = this.htmlInput.value;
            this.message.setText(this.messageValue);
            if (this.message.getWrappedText().length > 3) {
                this.htmlInput.value = oldValue;
                this.messageValue = oldValue;
                this.message.setText(this.messageValue);
            }
            this.editHint.setVisible(this.messageValue.length === 0);
        };
        this.htmlInput.addEventListener("input", this.inputHandler);

        this.keydownHandler = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const trimmedMessage = this.messageValue.trim();
                if (trimmedMessage.length > 0) {
                    this.sendMessage(num, this.messageValue);
                    this.destroy();
                } else {
                    console.log("Message invalide !");
                }
            }
        };
        this.htmlInput.addEventListener("keydown", this.keydownHandler);

        this.setDepth();
    }

    setDepth(){
        this.editOverlay.setDepth(90);
        this.sprite.setDepth(105);
        this.spritehitbox.setDepth(106);
        this.spritehitboxDebug.setDepth(106);
        this.editHint.setDepth(107);
        this.message.setDepth(107);
    }

    sendMessage(Destination, message){
        const payload = {
            ObjectID : 4,
            Source: this.scene.myNum,
            Destination: Destination,
            Carte: -1,
            Message : message
        };
        this.scene.socket.send(JSON.stringify({
            type: "CHEATING",
            payload: payload
        }));
    }

    destroy(){
        //this.scene.input.keyboard.off('keydown', this.keyHandler);
        this.objectIcon.ChatBox = null;
        this.htmlInput.removeEventListener("input", this.inputHandler);
        this.htmlInput.removeEventListener("keydown", this.keydownHandler);
        this.htmlInput.blur();
        this.htmlInput.remove();
        this.scene.tweens.killTweensOf(this.message);
        this.editOverlay.destroy();
        this.editHint.destroy();
        this.sprite.destroy();
        this.spritehitbox.destroy();
        this.spritehitboxDebug.destroy();
        this.message.destroy();
    }

}