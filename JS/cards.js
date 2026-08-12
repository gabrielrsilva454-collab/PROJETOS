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

function animateValue(element) {

    const target = Number(element.dataset.value);
    const type = element.dataset.type;

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


// =========================
// Executar Animação
// =========================

const values = document.querySelectorAll(".value");

values.forEach((value) => {

    animateValue(value);

});