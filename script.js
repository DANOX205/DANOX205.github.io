console.log('start')

/* Gestion du Chrono */
let secondes = 0;
let minutes = 0;
let heures = 0;
let s_para = document.getElementById("timer_secondes");
let m_para = document.getElementById("timer_minutes");
let h_para = document.getElementById("timer_heures");
let chrono = window.setInterval(TIMER,1000);

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
