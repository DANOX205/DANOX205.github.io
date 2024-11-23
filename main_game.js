//page javascript pour la page du jeux
console.log('start')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//key code des lettre de l'alphabet
const z = 122;
const q = 113;
const s = 115;
const d = 100;
const e = 101;

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
	if (command === s){ //s press
		if (row_val < 100){ //vérification que le personnage ne quitte pas la zone de jeux
			row_val = (row_val * 1) + 1;
		}
	}
	if (command === d){ //d press
		if (col_val < 100){ //vérification que le personnage ne quitte pas la zone de jeux
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
		attq.style.gridRow = (perso.style.gridRow * 1) + 1;
		attq.style.gridColumn = (perso.style.gridColumn * 1);
	}
	if (command === d){
		attq.style.gridRow = (perso.style.gridRow * 1);
		attq.style.gridColumn = (perso.style.gridColumn * 1) + 1;
	}
	
	
	return [row_val * 1, col_val * 1];
}

function attaqueP(command, attq){
	attq.style.display = "block";
	sleep(2000).then( () => {
		attq.style.display = "none";
	});
}

function PersoPrinc(event){
	const command = event.keyCode;
	const perso_p = document.getElementById("perso");
	const attq_p = document.getElementById("att_perso");
	if (command === z || command === q || command === s || command === d){
		let tab_coord = deplacement(command, perso_p, attq_p);
		perso_p.style.gridRow = tab_coord[0];
		perso_p.style.gridColumn = tab_coord[1];
	} else if (command === e){
		attaqueP(command, attq_p);
	}
}

/* Gestion du Chrono */
let secondes = 0;
let minutes = 0;
let heures = 0;
let s_para = document.getElementById("timer_secondes");
let m_para = document.getElementById("timer_minutes");
let h_para = document.getElementById("timer_heures");
let chrono = window.setInterval(Timer,1000);

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
	}
