import { getSalesHistory } from "./dataService.js";

let salesChart = null;

async function carregarGrafico() {

    const canvas = document.getElementById("salesChart");

    if (!canvas) return;

    try {

        const historico = await getSalesHistory();

        const labels = historico.map((item) => item.mes);
        const valores = historico.map((item) => item.faturamento);


        // Se o gráfico já existir,
        // destrói antes de criar outro
        if (salesChart) {

            salesChart.destroy();

        }


        salesChart = new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label: "Faturamento",

                            data: valores,

                            borderColor: "#2563eb",

                            backgroundColor:
                                "rgba(37, 99, 235, 0.12)",

                            borderWidth: 3,

                            fill: true,

                            tension: 0.4,

                            pointRadius: 5,

                            pointHoverRadius: 7,

                            pointBackgroundColor:
                                "#2563eb",

                            pointBorderColor:
                                "#ffffff",

                            pointBorderWidth: 2

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    interaction: {

                        intersect: false,

                        mode: "index"

                    },


                    plugins: {

                        legend: {

                            display: true,

                            labels: {

                                usePointStyle: true,

                                padding: 20

                            }

                        },


                        tooltip: {

                            callbacks: {

                                label: function(context) {

                                    const valor =
                                        context.parsed.y;

                                    return (
                                        " Faturamento: " +
                                        valor.toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )
                                    );

                                }

                            }

                        }

                    },


                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                callback: function(value) {

                                    return value.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL",
                                            maximumFractionDigits: 0
                                        }
                                    );

                                }

                            }

                        }

                    }

                }

            }
        );


    } catch (error) {

        console.error(
            "Erro ao carregar gráfico:",
            error
        );

    }

}


// Carrega o gráfico quando a página abre
document.addEventListener(
    "DOMContentLoaded",
    carregarGrafico
);

// Exposto para o menu.js poder chamar de novo ao voltar pro dashboard
window.carregarGrafico = carregarGrafico;