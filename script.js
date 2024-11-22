console.log('start')


function deplacement_perso(event){
	const command = event.keyCode;
	const perso_p = document.getElementById("perso");
	let col_val = perso_p.getAttribute("grid-columns");
	let row_val = perso_p.getAttribute("grid-rows");
	console.log("col " + col_val);
	console.log("row " + row_val);
	if (command === 122){ //z press
		if (row_val){
			row_val = (row_val * 1) - 1;
		}
		perso_p.setAttribute("grid-rows", row_val);
	} else if (command === 113){ //q press
		if (col_val){
			col_val = (col_val * 1) - 1;
		}
		perso_p.setAttribute("grid-columns", col_val);
	} else if (command === 115){ //s press
		row_val = (row_val * 1) + 1;
		perso_p.setAttribute("grid-rows", row_val);
	} else if (command === 100){ //d press
		col_val = (col_val * 1) + 1;
		perso_p.setAttribute("grid-columns", col_val);
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
