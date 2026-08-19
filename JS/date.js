const dayWeek = document.getElementById("day-week");
const fullDate = document.getElementById("full-date");

const agora = new Date();

const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

dayWeek.textContent = `📅 ${dias[agora.getDay()]}`;

fullDate.textContent =
    `${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;