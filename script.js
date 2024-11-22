console.log('start')

function demo(){
	alert("bonjour");
}

const log1 = document.getElementById("log1");
const log2 = document.getElementById("log2");
const input1 = document.querySelector("sample1");
const input2 = document.getElementById("sample2");

input1.addEventListener("keypress", logKey);
input2.addEventListener("keypress", test);


function logKey(e) {
  log1.textContent += `${e.code}`;
}

function test(e){
	log2.textContent += `${e.code}`;
}