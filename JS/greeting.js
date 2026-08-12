const greeting = document.getElementById("greeting");

const horaAtual = new Date().getHours();

if (horaAtual < 12) {

    greeting.textContent = "👋 Bom dia";

} else if (horaAtual < 18) {

    greeting.textContent = "☀️ Boa tarde";

} else {

    greeting.textContent = "🌙 Boa noite";

}