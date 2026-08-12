let salesChart = null;

async function carregarGrafico() {

    const canvas = document.getElementById("salesChart");

    if (!canvas) return;

    try {

        const response = await fetch(
            "https://dummyjson.com/carts"
        );

        const data = await response.json();

        const carts = data.carts;

        console.log("Dados recebidos para o gráfico:", carts);


        // Divide os carrinhos em 6 períodos
        const grupos = [
            carts.slice(0, 4),
            carts.slice(4, 8),
            carts.slice(8, 12),
            carts.slice(12, 16),
            carts.slice(16, 20),
            carts.slice(20, 24)
        ];


        // Soma o faturamento de cada período
        const valores = grupos.map(grupo => {

            return grupo.reduce(
                (total, cart) => total + cart.total,
                0
            );

        });


        const labels = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun"
        ];


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