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
	const Jpseudo = document.getElementById("idpseudo").value;
	if (Pseudo_ok(Jpseudo)){
		localStorage.setItem('pseudo_perso', Jpseudo); //stockage du pseudo
		window.location.href = "main_game.html" //redirection sur la page du jeux
	} else {
		alert("Veuillez entrer un pseudo correct pour continuer !");
	}
}
