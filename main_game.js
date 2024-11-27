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


localStorage.removeItem('pseudo_perso1');
localStorage.removeItem('pseudo_perso2');
labelP1.textContent = J1pseudo;
labelP2.textContent = J2pseudo;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//fonction de fin de jeux, sauvegarde du temps et retour à la page principal
function GameOver(){
	//sauvegarde du temps pour le mettre dans le tableau (à codé)
	//retour à la page de départ
	window.location.href = 'Projet_Web.html';
}

function attaqueP(attq){
	attq.style.display = "block";
	sleep(5000).then( () => {
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


function updatePlayer() {
  // Move up
  if (keys["z"]) {
    playerState.y = Math.max(0, playerState.y - playerState.speed);
  }
  // Move down
  if (keys["s"]) {
    playerState.y = Math.min(gameWorld.offsetHeight - player.offsetHeight, playerState.y + playerState.speed);
  }
  // Move left
  if (keys["q"]) {
    playerState.x = Math.max(0, playerState.x - playerState.speed);
  }
  // Move right
  if (keys["d"]) {
    playerState.x = Math.min(gameWorld.offsetWidth - player.offsetWidth, playerState.x + playerState.speed);
  }

  // Apply new position
  player.style.top = `${playerState.y}px`;
  player.style.left = `${playerState.x}px`;
  
  //player's attack position
  	let att_T = (playerState.y * 1) + 20;
	let att_L = (playerState.x * 1);
	attq_p.style.top = `${att_T}px`;
	attq_p.style.left = `${att_L}px`;

	console.log(attq_p.style.top);
	console.log(attq_p.style.left);

  //player's attack
  if (keys["e"]) {
	attaqueP(attq_p);
  }
  /*
  labelP.style.top = `${playerState.y}px`;
  labelP.style.left = `${playerState.x}px`;
  */
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
            break;
        case 99:
            console.log("ATTAQUE 3");
		    if (can_attack3) {
				attack3();
			}
            break;
        case 100:
            console.log("ATTAQUE 4");
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
	const c= RandomNumber(5,34);
	const r= RandomNumber(17,28);
	const hhitbox = document.createElement('div'); // On crée l'élément div hurthitbox
	hhitbox.classList.add("warninghitbox");
	hhitbox.style.gridRow = `${r}`;
    hhitbox.style.gridColumn = `${c}`;
	console.log(r);
	console.log(c);
	gameBox.appendChild(hhitbox); // On ajoute l'élément sur la boîte de jeu
	setTimeout(() => {
		hhitbox.className = "hurthitbox";
	}, 1200);
	setTimeout(() => {
		hhitbox.remove();
	}, 1500);
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
	const c= RandomNumber(5,34);
	const r= RandomNumber(17,28);
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
