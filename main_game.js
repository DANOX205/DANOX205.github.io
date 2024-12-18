//page javascript pour la page du jeux
console.log('start game')
const player = document.querySelector("#player");
const gameWorld = document.querySelector("#gameWorld");
const gameBox= document.querySelector(".game_box");
const Clock = document.querySelector("#clock");
const attq_p = document.querySelector("#att_player");
const keys = {}; // Keys being pressed
const playerState = { //Move the player
	x: 260, // Starting X position
	y: 100, // Starting Y position
	speed: 4, // Movement speed
};
const J1pseudo = localStorage.getItem('pseudo_perso1');
const labelP1 = document.getElementById("pseudoJ1");
const J2pseudo = localStorage.getItem('pseudo_perso2');
const labelP2 = document.getElementById('pseudoJ2');

let PV = 3;
const labelPV = document.getElementById('LifeJ1');

// Pour l'attaque 2
const moving_cloud = document.getElementById('hidden_cloud');
const moving_cloudState = {
	x: 260, // Starting X position
	y: 100, // Starting Y position
	speed: 3, // Movement speed
  };
let CanCloud_move = false;

//localStorage.removeItem('pseudo_perso1');
//localStorage.removeItem('pseudo_perso2');
labelP1.textContent = J1pseudo;
labelP2.textContent = J2pseudo;
labelPV.textContent = PV;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//fonction de fin de jeux, sauvegarde du temps et retour à la page principal
function GameOver(){
	const formattedTime = formatTime(heures, minutes, secondes);
	let scores = JSON.parse(localStorage.getItem('scores')) || [];
	const newScore = { pseudoj1: J1pseudo, pseudoj2: J2pseudo, time: formattedTime };
    scores.push(newScore);

	scores.sort((a, b) => {
        const aSeconds = timeToSeconds(a.time);
        const bSeconds = timeToSeconds(b.time);
        return bSeconds - aSeconds;
    });

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
	sleep(2000).then( () => {
		attq.style.display = "none";
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
function updatePlayer() {
	// Move up
	if (keys["z"] || keys["Z"]) {
		playerState.y = Math.max(0, playerState.y - playerState.speed);
		command = "z";
	}
	// Move down
	if (keys["s"] || keys["S"]) {
		playerState.y = Math.min(gameWorld.offsetHeight - player.offsetHeight, playerState.y + playerState.speed);
		command = "s"
	}
	// Move left
	if (keys["q"] || keys["Q"]) {
		playerState.x = Math.max(0, playerState.x - playerState.speed);
		command = "q"
	}
	// Move right
	if (keys["d"] || keys["D"]) {
		playerState.x = Math.min(gameWorld.offsetWidth - player.offsetWidth, playerState.x + playerState.speed);
		command = "d"
	}

	// Apply new position
	player.style.top = `${playerState.y}px`;
	player.style.left = `${playerState.x}px`;
	
  	//player's attack position
	let att_T = 0;
	let att_L = 0;
	if (command === "z") {
		att_T = (playerState.y * 1) - 20;
		att_L = (playerState.x * 1);
	} else if (command === "q") {
		att_T = (playerState.y * 1);
		att_L = (playerState.x * 1) - 20;
	} else if (command === "s") {
		att_T = (playerState.y * 1) + 20;
		att_L = (playerState.x * 1);
	} else if (command === "d") {
		att_T = (playerState.y * 1);
		att_L = (playerState.x * 1) + 20;
	}
	attq_p.style.top = `${att_T}px`;
	attq_p.style.left = `${att_L}px`;

	//console.log(attq_p.style.top);
	//console.log(attq_p.style.left);

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
	}
}

function gameLoop() {
  updatePlayer(); // Update player's position
  requestAnimationFrame(gameLoop); // Repeat the loop
}

gameLoop();


//end game
document.addEventListener ("keypress", (event) => {
	let command = event.code;
	if (command === 'Space'){
		alert("Game Over");
		GameOver();
	}
});
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
				alert('Je rajoute la dernière attaque plus tard.');
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
	let c= RandomNumber(0,213); //top
	let r= RandomNumber(0,478); //left
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
	}, 1200);
	setTimeout(() => {
		hhitbox.remove();
		draw_cloud.remove();
	}, 1350);
}


function attack1(){
	let attack1_loading = document.getElementById("AL1");
	attack1_loading.className = "attack_loading";
	can_attack1 = false;
	for (i=0;i<20; i++){
		spawn_box();
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

    // HURTHITBOX
    setTimeout(() => {
		CanCloud_move = false; // Stop movement
		moving_cloud.classList.remove('warninghitbox');
        moving_cloud.classList.add('hurthitbox'); 
    }, 2000);

    setTimeout(() => {
        moving_cloud.style.display = 'none'; // On cache le nuage
		moving_cloud.classList.remove('hurthitbox');
        // On change sa position pour qu'elle soit random
		//const XC= RandomNumber(0,598);
		//const YC= RandomNumber(0,235);
        moving_cloudState.x = 260;
        moving_cloudState.y = 100;
        moving_cloud.style.left = `${moving_cloudState.x}px`;
        moving_cloud.style.top = `${moving_cloudState.y}px`;
    }, 2500);
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
	const c= RandomNumber(9,31);
	const r= RandomNumber(19,28);
	const slowhitbox = document.createElement('div'); // On crée l'élément div slowhitbox
	slowhitbox.classList.add("warningslowhitbox");
	slowhitbox.style.gridRow = `${r}`;
    slowhitbox.style.gridColumn = `${c}`;
	console.log(r);
	console.log(c);
	gameBox.appendChild(slowhitbox); // On ajoute l'élément sur la boîte de jeu
	setTimeout(() => {
		slowhitbox.className = "slowhitbox";
	}, 1200);
	setTimeout(() => {
		slowhitbox.remove();
	}, 1500);
}

function attack3(){
	let attack3_loading = document.getElementById("AL3");
	console.log("oui je marche");
	attack3_loading.className = "attack_loading";
	can_attack3 = false;
	for (i=0;i<5; i++){
		spawn_box3();
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
