//page javascript pour la page principal
console.log('start main');

function Pseudo_ok(pseudo){
	if (pseudo){
		return true; //fonction à codé
	} else {
		return false;
	}
}

function StartGame(){ //fonction de redirection vers la page du jeux
	const Jpseudo1 = document.getElementById("idpseudo1").value;
	const Jpseudo2 = document.getElementById("idpseudo2").value;
	if (Pseudo_ok(Jpseudo1 && Jpseudo2)){
		localStorage.setItem('pseudo_perso1', Jpseudo1); //stockage du pseudo
		localStorage.setItem('pseudo_perso2', Jpseudo2); //stockage du pseudo
		window.location.href = "main_game.html" //redirection sur la page du jeux
	} else {
		alert("Veuillez entrer un pseudo correct pour continuer !");
	}
}
