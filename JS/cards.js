import { getStats } from "./dataService.js";

// Formatar Valores

function formatValue(value, type) {

    if (type === "money") {

        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }

    return value.toLocaleString("pt-BR");

}

// Animar Cards

function animateValue(element, target, type) {

    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(progress * target);

        element.textContent = formatValue(currentValue, type);

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


// Atualiza o texto de variação (+12% este mês / -2% este mês)

function atualizarVariacao(element, change) {

    const changeEl = element.parentElement.querySelector(
        ".positive, .negative"
    );

    if (!changeEl) {

        return;

    }

    const sinal = change >= 0 ? "+" : "";

    changeEl.textContent = `${sinal}${change}% este mês`;

    changeEl.className = change >= 0 ? "positive" : "negative";

}


// =========================
// Executar Animação
// =========================

async function iniciarCards() {

    try {

        const stats = await getStats();

        document.querySelectorAll(".value").forEach((element) => {

            const key = element.dataset.key;

            const stat = stats[key];

            if (!stat) {

                return;

            }

            animateValue(element, stat.value, stat.type);

            atualizarVariacao(element, stat.change);

        });

    } catch (error) {

        console.error("Erro ao carregar os cards:", error);

    }

}

document.addEventListener("DOMContentLoaded", iniciarCards);

// Exposto para o menu.js poder chamar de novo ao voltar pro dashboard
window.iniciarCards = iniciarCards;