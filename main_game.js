//page javascript pour la page du jeux
console.log('start game')
const player = document.querySelector("#player");
const gameWorld = document.querySelector("#gameWorld");
const gameBox= document.querySelector(".game_box");
const Clock = document.querySelector("#clock");
const attq_p = document.querySelector("#att_player");
const keys = {}; // Keys being pressed


const labelP1 = document.getElementById("pseudoJ1");
const J2pseudo = localStorage.getItem('pseudo_perso2');
const labelP2 = document.getElementById('pseudoJ2');
const playerState = { //Move the player
	x: 260, // Starting X position
	y: 100, // Starting Y position
	speed: 4, // Movement speed
	PV: 3, // PV du joueur
	Pseudo: localStorage.getItem('pseudo_perso1'), //nom du joueur 1
	img_atk: ["Sprites_assets/Player/Attaque/atk_g.jpg", "Sprites_assets/Player/Attaque/atk_d.jpg"]
};


const AttPState = { //information sur l'attaque du joueur
	Att_x: 0, //coordonnée x de l'attaque
	Att_y: 0, //coordonnée y de l'attaque
};

const labelPV = document.getElementById('LifeJ1');
let degat = 'False';
let degatZ = 'False';
let degatP = 'False';
let coord = [];
let collision = [];
collision.length = 0;
const zombies = [];
zombies.length = 0;
let NumZombie = 0;

// Pour l'attaque 2
const moving_cloud = document.getElementById('hidden_cloud');
const moving_cloudState = {
	x: 260, // Starting X position
	y: 100, // Starting Y position
	speed: 5, // Movement speed
  };
let CanCloud_move = false;
labelP1.textContent = playerState.Pseudo;
labelP2.textContent = J2pseudo;
labelPV.textContent = playerState.PV;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//fonction de fin de jeux, sauvegarde du temps et retour à la page principal
function GameOver(){
	alert("Game Over");
	const formattedTime = formatTime(heures, minutes, secondes);
	let scores = JSON.parse(localStorage.getItem('scores')) || [];
	const newScore = { pseudoj1: playerState.Pseudo, pseudoj2: J2pseudo, time: formattedTime };
	if (scores.length < 10){
		scores.push(newScore);
	}
	scores.sort((a, b) => {
        const aSeconds = timeToSeconds(a.time);
        const bSeconds = timeToSeconds(b.time);
        return bSeconds - aSeconds;
    });
	if (scores.length === 10){
		if ((timeToSeconds(newScore.time) - timeToSeconds(scores[9].time)) >=0){
			scores[9] = newScore;
			scores.sort((a, b) => {
				const aSeconds = timeToSeconds(a.time);
				const bSeconds = timeToSeconds(b.time);
				return bSeconds - aSeconds;
			});
		}
	}

	localStorage.setItem('scores', JSON.stringify(scores));

	window.location.href = 'Projet_Web.html';
}

function timeToSeconds(time) {
    const [h, m, s] = time.split(':').map(Number);
    return h * 3600 + m * 60 + s;
}

function formatTime(h, m, s) {
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

function attaqueP(attq){ //faire une fonction pour permettre de stoper le temps pendant l'attaque du perso
	attq.style.display = "block";
	degatP = 'True';
	sleep(2000).then( () => {
		attq.style.display = "none";
		degatP = 'False';
	});
}

//--------------------------------------------------

document.addEventListener("keydown", (e) => {
  keys[e.key] = true; // Mark key as pressed
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false; // Mark key as released
});

let command = "z";
let facing = "left";
let moving = false;
function updatePlayer() {
	// Move up
	if (keys["z"] || keys["Z"]) {
		playerState.y = Math.max(0, playerState.y - playerState.speed);
		command = "z";
		moving = true;
	}
	// Move down
	if (keys["s"] || keys["S"]) {
		playerState.y = Math.min(gameWorld.offsetHeight - player.offsetHeight, playerState.y + playerState.speed);
		command = "s";
		moving = true;
	}
	// Move left
	if (keys["q"] || keys["Q"]) {
		playerState.x = Math.max(0, playerState.x - playerState.speed);
		command = "q";
		facing = "left";
		moving = true;
	}
	// Move right
	if (keys["d"] || keys["D"]) {
		playerState.x = Math.min(gameWorld.offsetWidth - player.offsetWidth, playerState.x + playerState.speed);
		command = "d";
		facing = "right";
		moving = true;
	}

	// On ne touche aucune des touches de déplacement.
	if (!((keys["q"] || keys["Q"] || keys["d"] || keys["D"] || keys["s"] || keys["S"] || keys["z"] || keys["Z"]) || ((keys["q"] || keys["Q"])&&(keys["d"] || keys["D"])) || ((keys["z"] || keys["Z"])&&(keys["s"] || keys["S"])))) {
		moving = false;
	}

	// Apply new position
	player.style.top = `${playerState.y}px`;
	player.style.left = `${playerState.x}px`;
	drawingPlayer.style.top = `${playerState.y-60}px`;
	drawingPlayer.style.left = `${playerState.x-29}px`;
	
  	//player's attack position
	if (command === "z") {
		AttPState.Att_y = (playerState.y * 1) - 20;
		AttPState.Att_x = (playerState.x * 1);
		att_player.style.backgroundImage = `url(${playerState.img_atk[0]})`;
	} else if (command === "q") {
		AttPState.Att_y = (playerState.y * 1);
		AttPState.Att_x = (playerState.x * 1) - 20;
		att_player.style.backgroundImage = `url(${playerState.img_atk[0]})`;
	} else if (command === "s") {
		AttPState.Att_y = (playerState.y * 1) + 20;
		AttPState.Att_x = (playerState.x * 1);
		att_player.style.backgroundImage = `url(${playerState.img_atk[1]})`;
	} else if (command === "d") {
		AttPState.Att_y = (playerState.y * 1);
		AttPState.Att_x = (playerState.x * 1) + 20;
		att_player.style.backgroundImage = `url(${playerState.img_atk[1]})`;
	}
	attq_p.style.top = `${AttPState.Att_y}px`;
	attq_p.style.left = `${AttPState.Att_x}px`;

	//player's attack
	if (keys["e"]) {
		attaqueP(attq_p);
	}

	// Pour le second joueur et la seconde attaque
	if (CanCloud_move){
		// Move up
		if (keys["ArrowUp"]) {
			moving_cloudState.y = Math.max(0, moving_cloudState.y - moving_cloudState.speed);
		}
		// Move down
		if (keys["ArrowDown"]) {
			moving_cloudState.y = Math.min(gameWorld.offsetHeight - moving_cloud.offsetHeight, moving_cloudState.y + moving_cloudState.speed);
		}
		// Move left
		if (keys["ArrowLeft"]) {
			moving_cloudState.x = Math.max(0, moving_cloudState.x - moving_cloudState.speed);
		}
		// Move right
		if (keys["ArrowRight"]) {
			moving_cloudState.x = Math.min(gameWorld.offsetWidth - moving_cloud.offsetWidth, moving_cloudState.x + moving_cloudState.speed);
		}
		// Apply new position
		moving_cloud.style.top = `${moving_cloudState.y}px`;
		moving_cloud.style.left = `${moving_cloudState.x}px`;
		drawingMovingCloud.style.top = `${moving_cloudState.y-248}px`;
		drawingMovingCloud.style.left = `${moving_cloudState.x-144}px`;
	}

	if (collision.length != 0){
		for (i in collision){
			if (((playerState.x >= collision[i][0] - 20 && playerState.x <= collision[i][0] + 30) && (playerState.y >= collision[i][1] - 20 && playerState.y <= collision[i][1] + 30)) && degat === 'True'){
				playerState.PV = playerState.PV - 1;
				degat = 'False';
				labelPV.textContent = playerState.PV;
				invincibleFrame();
				if (playerState.PV === 0) {
					GameOver();
				}
			}

			if (((playerState.x >= collision[i][0] - 20 && playerState.x <= collision[i][0] + 80) && (playerState.y >= collision[i][1] - 20 && playerState.y <= collision[i][1] + 34)) && degat === 'atk3'){
				playerState.speed = 1;
				degat = 'False';
				setTimeout(() =>{
					playerState.speed = 4;
				}, 3500);
			}
		}
	}


	if (zombies.length != 0){
		for (element_Z of zombies){
			if (((playerState.x >= element_Z.x - 20 && playerState.x <= element_Z.x + 20) && (playerState.y >= element_Z.y - 20 && playerState.y <= element_Z.y + 20)) && degatZ === 'True'){
				playerState.PV = playerState.PV - 1;
				degatZ = 'False';
				labelPV.textContent = playerState.PV;
				invincibleFrameZ();
				if (playerState.PV === 0) {
					GameOver();
				}
			}

			if (((AttPState.Att_x >= element_Z.x - 20 && AttPState.Att_x <= element_Z.x + 20) && (AttPState.Att_y >= element_Z.y - 20 && AttPState.Att_y <= element_Z.y + 20)) && degatP === 'True'){
				killZombie(element_Z);
			}
		}
	} else if (zombies.length === 0){
		degatZ = 'False';
	}
}

function invincibleFrame(){
	setTimeout(() => {
		degat = 'True';
	}, 1300);
}

function invincibleFrameZ(){
	setTimeout(() => {
		degatZ = 'True';
	}, 1300);
}

function gameLoop() {
  updatePlayer(); // Update player's position
  requestAnimationFrame(gameLoop); // Repeat the loop
}

gameLoop();

// On met à jour l'animation du Joueur
function animation_Joueur(){

	if (facing==="left"){
		drawingPlayer.style.transform  = `scale(1, 1)`;
		if (moving ===true){
			const frames = ["Sprites_assets/Player/Walking/1.png", "Sprites_assets/Player/Walking/2.png", "Sprites_assets/Player/Walking/3.png", "Sprites_assets/Player/Walking/4.png","Sprites_assets/Player/Walking/5.png","Sprites_assets/Player/Walking/6.png","Sprites_assets/Player/Walking/7.png"]; 
			const frameRate = 100; // Vitesse de l'animation ==> 50ms par frame
			let index = 0;	
			const Interval_Walking_animation = setInterval(() => {
				index = (index + 1) % frames.length;
				drawingPlayer.style.backgroundImage = `url(${frames[index]})`;
				if ((moving === false) || (facing==="right")) {
					clearInterval(Interval_Walking_animation);
					animation_Joueur();
				}
		}, frameRate);
		} else {
			const frames = ["Sprites_assets/Player/Idle/1.png", "Sprites_assets/Player/Idle/2.png", "Sprites_assets/Player/Idle/3.png", "Sprites_assets/Player/Idle/4.png","Sprites_assets/Player/Idle/5.png","Sprites_assets/Player/Idle/6.png","Sprites_assets/Player/Idle/7.png","Sprites_assets/Player/Idle/8.png","Sprites_assets/Player/Idle/9.png","Sprites_assets/Player/Idle/10.png"]; 
			const frameRate = 100; // Vitesse de l'animation ==> 50ms par frame
			let index = 0;	
			const Interval_Idle_animation = setInterval(() => {
				index = (index + 1) % frames.length;
				drawingPlayer.style.backgroundImage = `url(${frames[index]})`;
				if (moving === true) {
					clearInterval(Interval_Idle_animation);
					animation_Joueur();
				}
		}, frameRate);
		}
	}
	if (facing==="right"){
		drawingPlayer.style.transform = `scale(-1, 1)`;
	
	if (moving ===true){
		const frames = ["Sprites_assets/Player/Walking/1.png", "Sprites_assets/Player/Walking/2.png", "Sprites_assets/Player/Walking/3.png", "Sprites_assets/Player/Walking/4.png","Sprites_assets/Player/Walking/5.png","Sprites_assets/Player/Walking/6.png","Sprites_assets/Player/Walking/7.png"]; 
		const frameRate = 100; // Vitesse de l'animation ==> 50ms par frame
		let index = 0;	
		const Interval_Walking_animation = setInterval(() => {
			index = (index + 1) % frames.length;
			drawingPlayer.style.backgroundImage = `url(${frames[index]})`;
			if ((moving === false) || (facing==="left")) {
				clearInterval(Interval_Walking_animation);
				animation_Joueur();
			}
	}, frameRate);
	} else {
		const frames = ["Sprites_assets/Player/Idle/1.png", "Sprites_assets/Player/Idle/2.png", "Sprites_assets/Player/Idle/3.png", "Sprites_assets/Player/Idle/4.png","Sprites_assets/Player/Idle/5.png","Sprites_assets/Player/Idle/6.png","Sprites_assets/Player/Idle/7.png","Sprites_assets/Player/Idle/8.png","Sprites_assets/Player/Idle/9.png","Sprites_assets/Player/Idle/10.png"]; 
		const frameRate = 100; // Vitesse de l'animation ==> 50ms par frame
		let index = 0;	
		const Interval_Idle_animation = setInterval(() => {
			index = (index + 1) % frames.length;
			drawingPlayer.style.backgroundImage = `url(${frames[index]})`;
			if (moving === true) {
				clearInterval(Interval_Idle_animation);
				animation_Joueur();
			}
	}, frameRate);
	}
}
}
animation_Joueur();

// On charge les sprites pour charger les animations.(On peut mettre cette partie du code à la fin, un peu longue et très peu intéressante.)

//setInterval(() => {
// On charge le Nuage
const Cloud_frames = ["Sprites_assets/Boss/Cloud_Idle/1.png", "Sprites_assets/Boss/Cloud_Idle/2.png", "Sprites_assets/Boss/Cloud_Idle/3.png", "Sprites_assets/Boss/Cloud_Idle/4.png"]; 
const Cloud_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let Cloud_index = 0;	
setInterval(() => {
	Cloud_index = (Cloud_index + 1) % Cloud_frames.length;
	LoadingCloud.style.backgroundImage = `url(${Cloud_frames[Cloud_index]})`;
}, Cloud_frameRate);


// On charge l'attaque du Nuage
const Cloud_Attack_frames = ["Sprites_assets/Boss/Attack/1.png", "Sprites_assets/Boss/Attack/2.png", "Sprites_assets/Boss/Attack/3.png", "Sprites_assets/Boss/Attack/4.png", "Sprites_assets/Boss/Attack/5.png", "Sprites_assets/Boss/Attack/6.png", "Sprites_assets/Boss/Attack/7.png", "Sprites_assets/Boss/Attack/8.png","Sprites_assets/Boss/Attack/9.png"]; 
const Cloud_Attack_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let Cloud_Attack_index = 0;	
setInterval(() => {
    Cloud_Attack_index = (Cloud_Attack_index + 1) % Cloud_Attack_frames.length;
    LoadingAttackCloud.style.backgroundImage = `url(${Cloud_Attack_frames[Cloud_Attack_index]})`;
}, Cloud_Attack_frameRate);


// On charge l'animation de marche du player
const Player_Walking_frames = ["Sprites_assets/Player/Walking/1.png", "Sprites_assets/Player/Walking/2.png", "Sprites_assets/Player/Walking/3.png", "Sprites_assets/Player/Walking/4.png","Sprites_assets/Player/Walking/5.png","Sprites_assets/Player/Walking/6.png","Sprites_assets/Player/Walking/7.png"];
const Player_Walking_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let Player_Walking_index = 0;	
setInterval(() => {
    Player_Walking_index = (Player_Walking_index + 1) % Player_Walking_frames.length;
    LoadingWalkingPlayer.style.backgroundImage = `url(${Player_Walking_frames[Player_Walking_index]})`;
}, Player_Walking_frameRate);

// On charge l'animation d'attente du player
const Player_Idle_frames = ["Sprites_assets/Player/Idle/1.png", "Sprites_assets/Player/Idle/2.png", "Sprites_assets/Player/Idle/3.png", "Sprites_assets/Player/Idle/4.png","Sprites_assets/Player/Idle/5.png","Sprites_assets/Player/Idle/6.png","Sprites_assets/Player/Idle/7.png","Sprites_assets/Player/Idle/8.png","Sprites_assets/Player/Idle/9.png","Sprites_assets/Player/Idle/10.png"];
const Player_Idle_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let Player_Idle_index = 0;	
setInterval(() => {
    Player_Idle_index = (Player_Idle_index + 1) % Player_Idle_frames.length;
    LoadingIdlePlayer.style.backgroundImage = `url(${Player_Idle_frames[Player_Idle_index]})`;
}, Player_Idle_frameRate);

// On charge le Zombie
const Zombie_frames = ["Sprites_assets/Boss/Zombie/1.png", "Sprites_assets/Boss/Zombie/2.png", "Sprites_assets/Boss/Zombie/3.png", "Sprites_assets/Boss/Zombie/4.png","Sprites_assets/Boss/Zombie/5.png","Sprites_assets/Boss/Zombie/6.png","Sprites_assets/Boss/Zombie/7.png"]; 
const Zombie_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let Zombie_index = 0;	
setInterval(() => {
	Zombie_index = (Zombie_index + 1) % Zombie_frames.length;
	LoadingZombie.style.backgroundImage = `url(${Zombie_frames[Zombie_index]})`;
}, Zombie_frameRate);

// On charge le Nuage "pluie"
const SlowCloud_frames = ["Sprites_assets/Boss/Cloud_Idle_Rain/1.png", "Sprites_assets/Boss/Cloud_Idle_Rain/2.png", "Sprites_assets/Boss/Cloud_Idle_Rain/3.png", "Sprites_assets/Boss/Cloud_Idle_Rain/4.png"]; 
const SlowCloud_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
let SlowCloud_index = 0;	
setInterval(() => {
	SlowCloud_index = (SlowCloud_index + 1) % SlowCloud_frames.length;
	LoadingSlowCloud.style.backgroundImage = `url(${SlowCloud_frames[SlowCloud_index]})`;
}, SlowCloud_frameRate);
//--------------------------------------------------


/* Gestion du Chrono */
let secondes = 0;
let minutes = 0;
let heures = 0;
let s_para = 0;
let m_para = 0;
let h_para = 0;
let chrono = window.setInterval(Timer,1000);
let Clock_box = document.getElementById("clock");

function Timer(){
    secondes = secondes +1;
		s_para.innerHTML= secondes;
		m_para.innerHTML= minutes;
		h_para.innerHTML= heures;
		if (secondes == 60) {
			secondes = 0 ;
			minutes = minutes +1;
		}
		if (minutes ==60) {
			minutes =0;
			heures = heures +1;
		}
		if (heures == 24){
			alert("TRICHEUR ! C'est impossible.")
			//retourner dans la page de base.
		}
		Clock.innerHTML= heures + " : " + minutes + " : " + secondes;
	}

/* Gestion des attaques du BOSS */
let can_attack1 = false;
let can_attack2 = false;
let can_attack3 = false;
let can_attack4 = false;
reload1();
reload2();
reload3();
reload4();

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 97:
            console.log("ATTAQUE 1");
			if (can_attack1) {
				attack1();
			}
            break;
        case 98:
            console.log("ATTAQUE 2");
		    if (can_attack2) {
				attack2();
			}
            break;
        case 99:
            console.log("ATTAQUE 3");
		    if (can_attack3) {
				attack3();
			}
            break;
        case 100:
            console.log("ATTAQUE 4");
		    if (can_attack4) {
				attack4();
			}
            break;
    }
});

/* Première Attaque */ 

function reload1(){
	let filler1 = document.getElementById('fillerBar1');
	let attack1_loading = document.getElementById("AL1");
	filler1.style.transition = "width 5s ease-in-out";
	filler1.style.width = '100%';
	setTimeout(() => {
		attack1_loading.className = "attack_loaded";
		filler1.style.transition = "none";
		filler1.style.width = "0";
		can_attack1 = true;
	}, 5000);
}


function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function spawn_box(){
	console.log("spawn a box 2");
	let c= RandomNumber(0,213); //top (y)
	let r= RandomNumber(0,478); //left (x)
	const hhitbox = document.createElement('div'); // On crée l'élément div hurthitbox
	const draw_cloud = document.createElement('div'); // On dessine le sprite associé
	hhitbox.classList.add("warninghitbox");
	draw_cloud.classList.add("drawingCloud");
	hhitbox.style.left = `${r}px`;
   	hhitbox.style.top = `${c}px`;
	draw_cloud.style.left = `${r-144}px`;
    draw_cloud.style.top = `${c-248}px`;
	console.log(r);
	console.log(c);
	gameWorld.appendChild(hhitbox); // On ajoute l'élément sur la boîte de jeu
	gameWorld.appendChild(draw_cloud);

	// On dessine l'attaque du Nuage frame par frame (au secours!)
	const frames = ["Sprites_assets/Boss/Cloud_Idle/1.png", "Sprites_assets/Boss/Cloud_Idle/2.png", "Sprites_assets/Boss/Cloud_Idle/3.png", "Sprites_assets/Boss/Cloud_Idle/4.png"]; 
	const frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
	let index = 0;	
	const Interval_first_animation = setInterval(() => {
		index = (index + 1) % frames.length;
		draw_cloud.style.backgroundImage = `url(${frames[index]})`;
	}, frameRate);

	//On change l'animation pour celle de l'attaque.
	setTimeout(() => {
		clearInterval(Interval_first_animation);
		const frames = ["Sprites_assets/Boss/Attack/1.png", "Sprites_assets/Boss/Attack/2.png", "Sprites_assets/Boss/Attack/3.png", "Sprites_assets/Boss/Attack/4.png", "Sprites_assets/Boss/Attack/5.png", "Sprites_assets/Boss/Attack/6.png", "Sprites_assets/Boss/Attack/7.png", "Sprites_assets/Boss/Attack/8.png","Sprites_assets/Boss/Attack/9.png"]; 
		const frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
		let index = 0;	
		setInterval(() => {
		        index = (index + 1) % frames.length;
		        draw_cloud.style.backgroundImage = `url(${frames[index]})`;
	    	}, frameRate);
		// L'animation va durer 9 * framerate (dans notre cas framerate=50ms donc elle va durer 450ms et l'attaque apparaît au bout de 300ms)
	},900);
	
	setTimeout(() => {
		hhitbox.className = "hurthitbox";
		degat = 'True';
		coord = [r, c];
		collision.push(coord);
	}, 1200);
	setTimeout(() => {
		collision = [];
		collision.length = 0;
		degat = 'False';
		hhitbox.remove();
		draw_cloud.remove();
	}, 1350);
}


function attack1(){
	let attack1_loading = document.getElementById("AL1");
	let nbNuage = 0
	attack1_loading.className = "attack_loading";
	can_attack1 = false;
	while (nbNuage < 20){
		spawn_box();
		nbNuage++;
	}
	reload1();
}

/* Deuxième Attaque */ 
function reload2(){
	let filler2 = document.getElementById('fillerBar2');
	let attack2_loading = document.getElementById("AL2");
	filler2.style.transition = "width 5s ease-in-out";
	filler2.style.width = '100%';
	setTimeout(() => {
		attack2_loading.className = "attack_loaded";
		filler2.style.transition = "none";
		filler2.style.width = "0";
		can_attack2 = true;
	}, 5000);
}

function spawn_moving_cloud(){
	CanCloud_move = true; // Le nuage peut bouger
    moving_cloud.style.display = 'block'; //Le nuage est visible
    moving_cloud.classList.add('warninghitbox');
	drawingMovingCloud.style.display = 'block'; // Le dessin / sprite devient visible
	const Cloud_frames = ["Sprites_assets/Boss/Cloud_Idle/1.png", "Sprites_assets/Boss/Cloud_Idle/2.png", "Sprites_assets/Boss/Cloud_Idle/3.png", "Sprites_assets/Boss/Cloud_Idle/4.png"]; 
	const Cloud_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
	let Cloud_index = 0;	
	Interval_first_animation =setInterval(() => {
		Cloud_index = (Cloud_index + 1) % Cloud_frames.length;
		drawingMovingCloud.style.backgroundImage = `url(${Cloud_frames[Cloud_index]})`;
	}, Cloud_frameRate);

    // HURTHITBOX
    setTimeout(() => {
		CanCloud_move = false; // Stop movement
		clearInterval(Interval_first_animation);
		const Cloud_Attack_frames = ["Sprites_assets/Boss/Attack/1.png", "Sprites_assets/Boss/Attack/2.png", "Sprites_assets/Boss/Attack/3.png", "Sprites_assets/Boss/Attack/4.png", "Sprites_assets/Boss/Attack/5.png", "Sprites_assets/Boss/Attack/6.png", "Sprites_assets/Boss/Attack/7.png", "Sprites_assets/Boss/Attack/8.png","Sprites_assets/Boss/Attack/9.png"]; 
		const Cloud_Attack_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
		let Cloud_Attack_index = 0;	
		Interval_second_animation = setInterval(() => {
			Cloud_Attack_index = (Cloud_Attack_index + 1) % Cloud_Attack_frames.length;
			drawingMovingCloud.style.backgroundImage = `url(${Cloud_Attack_frames[Cloud_Attack_index]})`;
		}, Cloud_Attack_frameRate);

	}, 2100);

    setTimeout(() => {
		moving_cloud.classList.remove('warninghitbox');
        moving_cloud.classList.add('hurthitbox');
		degat = 'True'
		coord = [moving_cloudState.x, moving_cloudState.y];
		collision.push(coord);
		
    }, 2350);

    setTimeout(() => {
        moving_cloud.style.display = 'none'; // On cache le nuage
		drawingMovingCloud.style.display='none';
		drawingMovingCloud.style.backgroundImage="Sprites_assets/Boss/Cloud_Idle/1.png";
		clearInterval(Interval_second_animation);

		moving_cloud.classList.remove('hurthitbox');
	        moving_cloudState.x = 260;
	        moving_cloudState.y = 100;
	        moving_cloud.style.left = `${moving_cloudState.x}px`;
	        moving_cloud.style.top = `${moving_cloudState.y}px`;
		collision = [];
		collision.length = 0;
		degat = 'False';
    }, 2600);
}

function attack2(){
	let attack2_loading = document.getElementById("AL2");
	attack2_loading.className = "attack_loading";
	can_attack2 = false;
	spawn_moving_cloud();
	reload2();
}

/* Troisième Attaque */ 

function reload3(){
	let filler3 = document.getElementById('fillerBar3');
	let attack3_loading = document.getElementById("AL3");
	filler3.style.transition = "width 8s ease-in-out";
	filler3.style.width = '100%';
	setTimeout(() => {
		attack3_loading.className = "attack_loaded";
		filler3.style.transition = "none";
		filler3.style.width = "0";
		can_attack3 = true;
	}, 8000);
}

function spawn_box3(){
	console.log("spawn a box 3");
	let c= RandomNumber(0,195); // (9,31) anciennes valeurs, en fonction de la gameBox
	let r= RandomNumber(0,420); // (19,28)
	const slowhitbox = document.createElement('div'); // On crée l'élément div slowhitbox
	const draw_slow_cloud = document.createElement('div'); // On dessine le sprite associé
	slowhitbox.classList.add("warningslowhitbox");
	draw_slow_cloud.classList.add("drawingSlowCloud");
	slowhitbox.style.left = `${r}px`; //gridRow
    	slowhitbox.style.top = `${c}px`; //gridColumn
	draw_slow_cloud.style.left = `${r-118}px`;
   	draw_slow_cloud.style.top = `${c-252}px`;
	console.log(r);
	console.log(c);
	gameWorld.appendChild(slowhitbox); // On ajoute l'élément sur la boîte de jeu //gameWorld
	gameWorld.appendChild(draw_slow_cloud);
	// On dessine l'attaque du Nuage frame par frame
	const Cloud_frames = ["Sprites_assets/Boss/Cloud_Idle_Rain/1.png", "Sprites_assets/Boss/Cloud_Idle_Rain/2.png", "Sprites_assets/Boss/Cloud_Idle_Rain/3.png", "Sprites_assets/Boss/Cloud_Idle_Rain/4.png"]; 
	const Cloud_frameRate = 50; // Vitesse de l'animation ==> 50ms par frame
	let Cloud_index = 0;	
	const Interval_first_animation = setInterval(() => {
		Cloud_index = (Cloud_index + 1) % Cloud_frames.length;
		draw_slow_cloud.style.backgroundImage = `url(${Cloud_frames[Cloud_index]})`;
	}, Cloud_frameRate);
	// On ajoute les goutes de pluies avec deux set_Interval
	const Rain_animation = setInterval(() => {
		const Rain = document.createElement('div'); // On dessine le sprite associé
		Rain.classList.add("Rain");
		let Rr= RandomNumber(-40,40); 
		let Rc= RandomNumber(-12,12); 
		Rain.style.left = `${r-118+Rr}px`;
    	Rain.style.top = `${c-252+Rc}px`;
		gameWorld.appendChild(Rain);
		const Rain_frames = ["Sprites_assets/Boss/Rain_Drop_Animation/1.png", "Sprites_assets/Boss/Rain_Drop_Animation/2.png", "Sprites_assets/Boss/Rain_Drop_Animation/3.png", "Sprites_assets/Boss/Rain_Drop_Animation/4.png", "Sprites_assets/Boss/Rain_Drop_Animation/5.png", "Sprites_assets/Boss/Rain_Drop_Animation/6.png", "Sprites_assets/Boss/Rain_Drop_Animation/7.png", "Sprites_assets/Boss/Rain_Drop_Animation/8.png", "Sprites_assets/Boss/Rain_Drop_Animation/9.png", "Sprites_assets/Boss/Rain_Drop_Animation/10.png", "Sprites_assets/Boss/Rain_Drop_Animation/11.png", "Sprites_assets/Boss/Rain_Drop_Animation/12.png", "Sprites_assets/Boss/Rain_Drop_Animation/13.png", "Sprites_assets/Boss/Rain_Drop_Animation/14.png", "Sprites_assets/Boss/Rain_Drop_Animation/15.png", "Sprites_assets/Boss/Rain_Drop_Animation/16.png", "Sprites_assets/Boss/Rain_Drop_Animation/17.png"]; 
		const Rain_frameRate = 30; // Vitesse de l'animation ==> 30ms par frame
		let Rain_index = 0;	
		const Falling_Rain_animation = setInterval(() => {
			Rain_index = Rain_index + 1;
			Rain.style.backgroundImage = `url(${Rain_frames[Rain_index]})`;
			if (Rain_index === Rain_frames.length){
				Rain.remove();
				clearInterval(Falling_Rain_animation);
			}
		}, Rain_frameRate);
	}, 20);
	setTimeout(() => {
		slowhitbox.className = "slowhitbox";
		clearInterval(Rain_animation);
		degat = 'atk3'
		coord = [r, c];
		collision.push(coord);
	}, 1200);
	setTimeout(() => {
		slowhitbox.remove();
		draw_slow_cloud.remove();
		collision = [];
		collision.length = 0;
	}, 1500);
}

function attack3(){
	let attack3_loading = document.getElementById("AL3");
	let nbNuage = 0;
	console.log("oui je marche");
	attack3_loading.className = "attack_loading";
	can_attack3 = false;
	while (nbNuage < 10){
		spawn_box3();
		nbNuage++;
	}
	reload3();
}

/* Quatrième Attaque */ 

function reload4(){
	let filler4 = document.getElementById('fillerBar4');
	let attack4_loading = document.getElementById("AL4");
	filler4.style.transition = "width 10s ease-in-out";
	filler4.style.width = '100%';
	setTimeout(() => {
		attack4_loading.className = "attack_loaded";
		filler4.style.transition = "none";
		filler4.style.width = "0";
		can_attack4 = true;
	}, 10000);
}

function attack4(){
	let attack4_loading = document.getElementById("AL4");
	let nbNuage = 0;
	attack4_loading.className = "attack_loading";
	can_attack4 = false;
	while (nbNuage < 5){
		spawn_Zombies();
		nbNuage++;
	}
	reload4();
}

function spawn_Zombies(){
	console.log("spawn a zombie");
	const y= RandomNumber(0,213);
	const x= RandomNumber(0,478);
	const Zombie = document.createElement('div'); // On crée l'élément div Zombie
	Zombie.classList.add("zombie"); 
	Zombie.style.top = `${y}px`;
   	Zombie.style.left = `${x}px`;

	// On dessine le Zombie
	const Draw_Zombie = document.createElement('div'); // On dessine le sprite associé
	Draw_Zombie.classList.add("drawingZombie");
	Draw_Zombie.style.left = Zombie.style.left;
	Draw_Zombie.style.top = Zombie.style.top;
	Draw_Zombie.id = "DZnum" + NumZombie;
	gameWorld.appendChild(Draw_Zombie);
	const Zombie_Walking_frames = ["Sprites_assets/Boss/Zombie/1.png", "Sprites_assets/Boss/Zombie/2.png", "Sprites_assets/Boss/Zombie/3.png", "Sprites_assets/Boss/Zombie/4.png","Sprites_assets/Boss/Zombie/5.png","Sprites_assets/Boss/Zombie/6.png","Sprites_assets/Boss/Zombie/7.png"];
	const Zombie_Walking_frameRate = 200; // Vitesse de l'animation ==> 50ms par frame
	let Zombie_Walking_index = 0;	
	setInterval(() => {
		Zombie_Walking_index = (Zombie_Walking_index + 1) % Zombie_Walking_frames.length;
		Draw_Zombie.style.backgroundImage = `url(${Zombie_Walking_frames[Zombie_Walking_index]})`;
	}, Zombie_Walking_frameRate);
	Zombie.id = "Znum" + NumZombie;
	gameWorld.appendChild(Zombie); // On ajoute l'élément sur la boîte de jeu
	zombies.push({
		element: Zombie,
		x: x,
		y: y,
		drawing: Draw_Zombie,
		number: NumZombie,
	}); // Ajoute le tuple (element, x, y) dans la liste zombies. (pb => il faut l'index du zombie pour le tuer)
	degatZ = 'True';
	NumZombie += 1;
}

function moveZombiesTowardsPlayer() {
	// On récupère la position du joueur sur la grille. Pour cela, on utilise ses coordonnées (x,y). On divise par 20 car c'est la taille de la grille (20px) et on ajoute un décalage que j'ai trouvé manuellement.
	const playerRow = Math.round(playerState.y / 20) +17; 
	const playerCol = Math.round(playerState.x / 20) +5;

	// Pour chaque élément zombie dans la liste zombies.
	zombies.forEach((zombie, index) => {
		const Zombie = zombie.element;
		const Draw_Zombie = zombie.drawing;

		// on regarde la direction du joueur à l'aide de différences.
		const coordYDiff = playerState.y - zombie.y; // Si cette valeur est négative alors le joueur est en haut, si elle est positive, le joueur est en bas
		const coordXDiff = playerState.x - zombie.x; // Si cette valeur est négative alors le joueur est à gauche, si elle est positive, le joueur est à droite

		// On normalise le pas du zombie.
		const moveRow = coordYDiff === 0 ? 0 : coordYDiff / Math.abs(coordYDiff);
		const moveCol = coordXDiff === 0 ? 0 : coordXDiff / Math.abs(coordXDiff);


		// On met à jour la position du Zombie
		zombie.y += moveRow;
		zombie.x += moveCol;

		// On met à jour la position du Zombie sur la grille
		Zombie.style.top = `${zombie.y}px`;
		Zombie.style.left = `${zombie.x}px`;

		if (coordXDiff<0){
			Draw_Zombie.style.transform = `scale(-1, 1)`;
			Draw_Zombie.style.top = `${zombie.y-60}px`;
			Draw_Zombie.style.left = `${zombie.x-26}px`;
		} else {
			Draw_Zombie.style.transform = `scale(1, 1)`;
			Draw_Zombie.style.top = `${zombie.y-60}px`;
			Draw_Zombie.style.left = `${zombie.x-36}px`;
		}
	});
}

// On appelle la fonction toute les 50 ms
setInterval(moveZombiesTowardsPlayer, 50);

function killZombie(element_zombie) {
	document.getElementById("DZnum" + element_zombie.number).remove();
	document.getElementById("Znum" + element_zombie.number).remove();
	let ZombieIndex = zombies.indexOf(element_zombie)
	zombies.splice(ZombieIndex, 1);

}
