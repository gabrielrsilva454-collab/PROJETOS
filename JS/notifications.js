const notificationButton =
    document.getElementById("notificationButton");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationBadge =
    document.querySelector(".notification-badge");


// Quantidade inicial de notificações
let notificacoesNaoLidas = 3;


// Abre / fecha o painel
notificationButton.addEventListener("click", function (event) {

    event.stopPropagation();

    const painelAberto =
        notificationPanel.classList.contains("show");

    if (painelAberto) {

        fecharNotificacoes();

    } else {

        abrirNotificacoes();

    }

});


// Abre o painel
function abrirNotificacoes() {

    notificationPanel.classList.add("show");

}


// Fecha o painel
function fecharNotificacoes() {

    notificationPanel.classList.remove("show");

}


// Marca todas como lidas
function marcarComoLidas() {

    notificacoesNaoLidas = 0;

    atualizarBadge();

}


// Atualiza o número vermelho
function atualizarBadge() {

    if (notificacoesNaoLidas > 0) {

        notificationBadge.textContent =
            notificacoesNaoLidas;

        notificationBadge.style.display =
            "flex";

    } else {

        notificationBadge.style.display =
            "none";

    }

}


// Clicar fora fecha o painel
document.addEventListener("click", function (event) {

    const clicouNoSino =
        notificationButton.contains(event.target);

    const clicouNoPainel =
        notificationPanel.contains(event.target);


    if (!clicouNoSino && !clicouNoPainel) {

        fecharNotificacoes();

    }

});

const markNotificationsRead =
    document.getElementById("markNotificationsRead");


markNotificationsRead.addEventListener(
    "click",
    function () {

        marcarComoLidas();

    }
);

// ESC fecha as notificações
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        fecharNotificacoes();

    }

});


// Inicializa o badge
atualizarBadge();