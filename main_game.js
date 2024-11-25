//page javascript pour la page du jeux
console.log('start game')
const gameBox= document.querySelector(".game_box");
const Clock = document.querySelector("#clock");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//key code des lettre de l'alphabet
const z = 122;
const q = 113;
const s = 115;
const d = 100;
const e = 101;
const space = 32; //barre d'espace


//récupération du pseudo de la page principal
const Jpseudo = localStorage.getItem('pseudo_perso');
const labelP = document.getElementById("pseudo");
localStorage.removeItem('pseudo_perso'); //libération du stockage
labelP.textContent = Jpseudo; //écritude du pseudo au dessus du personnage


//fonction de fin de jeux, sauvegarde du temps et retour à la page principal
function GameOver(){
	//sauvegarde du temps pour le mettre dans le tableau (à codé)
	//retour à la page de départ
	window.location.href = 'Projet_Web.html';
}

//fonction de déplacement et d'attaque du personnage
function deplacement(command, perso, attq){
	let col_val = perso.style.gridColumn;
	let row_val = perso.style.gridRow;
	
//vérification des valeur des coordonnée et attribution si celle-ci n'existe pas
	if (col_val === null || row_val === null){
		col_val = 0;
		row_val = 0;
	}
	
	
	//commende de déplacement en fonction du code clavier des touches
	//on ajoute/retranche 1 à la ligne/colonne de l'objet pour le déplacer
	if (command === z){
		if (row_val > 0){ //vérification que les coordonnée ne soit pas négative
			row_val = (row_val * 1) - 1;
		}
	}
	if (command === q){
		if (col_val > 0){ //vérification que les coordonnée ne soit pas négative
			col_val = (col_val * 1) - 1;
		}
	}
	if (command === s){
		if (row_val < 22){ //vérification que le personnage ne quitte pas la zone de jeux
			row_val = (row_val * 1) + 1;
		}
	}
	if (command === d){
		if (col_val < 55){ //vérification que le personnage ne quitte pas la zone de jeux
			col_val = (col_val * 1) + 1;
		}
	}
	
	//attribution des valeur après déplacement
	perso.style.gridRow = row_val;
	perso.style.gridColumn = col_val;
	
	//déplacement de l'attaque du personnage
	if (command === z){
		attq.style.gridRow = (perso.style.gridRow * 1) - 1;
		attq.style.gridColumn = (perso.style.gridColumn * 1);
	}
	if (command === q){
		attq.style.gridRow = (perso.style.gridRow * 1);
		attq.style.gridColumn = (perso.style.gridColumn * 1) - 1;
	}
	if (command === s){
		attq.style.gridRow = (perso.style.gridRow * 1) + 2;
		attq.style.gridColumn = (perso.style.gridColumn * 1);
	}
	if (command === d){
		attq.style.gridRow = (perso.style.gridRow * 1);
		attq.style.gridColumn = (perso.style.gridColumn * 1) + 2;
	}
	
	return [row_val * 1, col_val * 1];
}

function attaqueP(command, attq){
	attq.style.display = "block";
	sleep(2000).then( () => {
		attq.style.display = "none";
	});
}

function Player(event){
	const command = event.keyCode;
	console.log(command);
	const perso = document.getElementById("player");
	const attq_p = document.getElementById("att_player");
	if (command === z || command === q || command === s || command === d){
		let tab_coord = deplacement(command, perso, attq_p);
		//initialisation de la position du personnage
		perso.style.gridRow = tab_coord[0];
		perso.style.gridColumn = tab_coord[1];
		
		//initialisation de la position du pseudo
		labelP.style.gridRow = (tab_coord[0] * 1) - 2
		labelP.style.gridColumn = (tab_coord[1] * 1) - 1;
	} else if (command === e){
		attaqueP(command, attq_p);
	} else if (command === space){ //ou dituation d'echec
		alert("Game Over");
		GameOver();
	}
}


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
