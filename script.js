console.log('start')

function deplacerP(command, perso){
	let col_val = perso.style.gridColumn;
	let row_val = perso.style.gridRow;
	
//vérification des valeur des coordonnée et attribution si celle-ci n'existe pas
	if (col_val === null || row_val === null){
		col_val = 0;
		row_val = 0;
	}
	
	//commende de déplacement en fonction du code clavier des touches
	//on ajoute/retranche 1 à la ligne/colonne de l'objet pour le déplacer
	
	
	if (command === 122){ //z press
		if (row_val > 0){ //vérification que les coordonnée ne soit pas négative
			row_val = (row_val * 1) - 1;
		}
	}
	if (command === 113){ //q press
		if (col_val > 0){ //vérification que les coordonnée ne soit pas négative
			col_val = (col_val * 1) - 1;
		}
	}
	if (command === 115){ //s press
		if (row_val < 100){ //vérification que le personnage ne quitte pas la zone de jeux
			row_val = (row_val * 1) + 1;
		}
	}
	if (command === 100){ //d press
		if (col_val < 100){ //vérification que le personnage ne quitte pas la zone de jeux
			col_val = (col_val * 1) + 1;
		}
	}
	
	//attribution des valeur après déplacement
	perso.style.gridRow = row_val;
	perso.style.gridColumn = col_val;
	return [row_val * 1, col_val * 1];
}

function attaqueP(command, perso){
	alert("raiponse ATTAQUE");//à compléter
}

function PersoPrinc(event){
	const command = event.keyCode;
	const perso_p = document.getElementById("perso");
	if (command === 122 || command === 113 || command === 115 || command === 100){
		let tab_coord = deplacerP(command, perso_p);
		perso_p.style.gridRow = tab_coord[0];
		perso_p.style.gridColumn = tab_coord[1];
	} else if (command === 101){ //e press
		attaqueP(command, perso_p);
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
