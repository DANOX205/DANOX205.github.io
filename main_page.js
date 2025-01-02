window.onload = function() {


	const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const tbody = document.getElementById('scoreTableBody');
	tbody.innerHTML = '';

	scores.forEach((score, index) => {
		const row = `
		  <tr>
			<th scope="row">${index + 1}</th>
			<td>${score.pseudoj1}</td>
			<td>${score.pseudoj2}</td>
			<td>${score.time}</td>
		  </tr>
		`;
		tbody.innerHTML += row;
	});

};

function ResetTable(){
	localStorage.removeItem('scores');
	localStorage.removeItem('scoreTableBody');
	location.reload();
}


const offensive_words = ["con", "conne", "merde", "connard", "salaud", "putain", "enfoiré", "tocard", "abruti",
    "crétin", "batard", "ordure", "nique", "foutu", "trouduc", "bouffon", "couillon",
    "taré", "morue", "raclure", "pouffias", "naïf", "salope", "cul", "débile", "blaireau",
    "péquenaud", "bâtard", "chieur", "baltringue", "cinglé"];


function isEqual(str1, str2) {
	return str1.toUpperCase() == str2.toUpperCase();
}


function Pseudo_ok(pseudo){ //fonction pour empêcher le joueur de mettre n'importe quoi pour pseudo (pas d'insulte ni d'espace)
	let cmp_fw = 0;
	for (nom of offensive_words){
		if ( isEqual(pseudo, nom) || (!pseudo) ){
			cmp_fw++;
		}
	}
	for (i of pseudo){
		if (i === " "){
			cmp_fw++;
		}
	}
	if (cmp_fw != 0){
		return false;
	} else{
		return true;
	}
}

function StartGame(){ //fonction de redirection vers la page du jeux
	const Jpseudo1 = document.getElementById("idpseudo1").value;
	const Jpseudo2 = document.getElementById("idpseudo2").value;
	if (Pseudo_ok(Jpseudo1) && Pseudo_ok(Jpseudo2)){
		localStorage.setItem('pseudo_perso1', Jpseudo1); //stockage du pseudo
		localStorage.setItem('pseudo_perso2', Jpseudo2); //stockage du pseudo
		window.location.href = "main_game.html" //redirection sur la page du jeux
	} else {
		alert("Veuillez entrer des pseudo correct pour continuer ! (pas de pseudo vide, d'espaces ou d'insulte)");
	}
}
