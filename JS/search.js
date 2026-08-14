function inicializarPedidos() {

    const searchInput = document.getElementById("search");
    const statusFilter = document.getElementById("statusFilter");
    const sortFilter = document.getElementById("sortFilter");
    const ordersTable = document.getElementById("ordersTable");

    // Verifica se os elementos existem
    if (
        !searchInput ||
        !statusFilter ||
        !sortFilter ||
        !ordersTable
    ) {
        return;
    }


    function atualizarPedidos() {

        const textoPesquisa =
            searchInput.value.toLowerCase().trim();

        const statusSelecionado =
            statusFilter.value;

        const ordemSelecionada =
            sortFilter.value;


        // FILTRAR

        let pedidosFiltrados = pedidos.filter((pedido) => {

            const pesquisaEncontrada =
                pedido.numero.toLowerCase().includes(textoPesquisa) ||
                pedido.cliente.toLowerCase().includes(textoPesquisa);

            const statusEncontrado =
                statusSelecionado === "all" ||
                pedido.status === statusSelecionado;

            return pesquisaEncontrada && statusEncontrado;

        });


        // ORDENAR POR DATA

        if (ordemSelecionada === "newest") {

            pedidosFiltrados.sort((a, b) => {

                return converterData(b.data) -
                       converterData(a.data);

            });

        }


        if (ordemSelecionada === "oldest") {

            pedidosFiltrados.sort((a, b) => {

                return converterData(a.data) -
                       converterData(b.data);

            });

        }


        // ORDENAR POR VALOR

        if (ordemSelecionada === "highest") {

            pedidosFiltrados.sort((a, b) => {

                return converterValor(b.valor) -
                       converterValor(a.valor);

            });

        }


        if (ordemSelecionada === "lowest") {

            pedidosFiltrados.sort((a, b) => {

                return converterValor(a.valor) -
                       converterValor(b.valor);

            });

        }


        // LIMPA A TABELA

        ordersTable.innerHTML = "";


        // NENHUM RESULTADO

        if (pedidosFiltrados.length === 0) {

            ordersTable.innerHTML = `
                <tr>
                    <td colspan="5">
                        Nenhum pedido encontrado.
                    </td>
                </tr>
            `;

            return;
        }


        // CRIA AS LINHAS

        pedidosFiltrados.forEach((pedido) => {

            const row =
                document.createElement("tr");


            let statusClass = "";


            if (pedido.status === "Pago") {

                statusClass = "paid";

            } else if (pedido.status === "Pendente") {

                statusClass = "pending";

            } else if (pedido.status === "Enviado") {

                statusClass = "shipped";

            }


            row.innerHTML = `

                <td>${pedido.numero}</td>

                <td>${pedido.cliente}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${pedido.status}
                    </span>
                </td>

                <td>${pedido.valor}</td>

                <td>${pedido.data}</td>

            `;


            ordersTable.appendChild(row);

        });

    }


    // CONVERTE R$ 520,00 PARA 520

    function converterValor(valor) {

        return Number(
            valor
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        );

    }


    // CONVERTE 13/07/2026 PARA DATA

    function converterData(data) {

        const partes = data.split("/");

        return new Date(
            partes[2],
            partes[1] - 1,
            partes[0]
        );

    }


    // EVENTOS

    searchInput.addEventListener(
        "input",
        atualizarPedidos
    );


    statusFilter.addEventListener(
        "change",
        atualizarPedidos
    );


    sortFilter.addEventListener(
        "change",
        atualizarPedidos
    );


    // MOSTRA OS PEDIDOS

    atualizarPedidos();

}