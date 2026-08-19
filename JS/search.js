// Formata valor numérico para exibição (R$ 520,00)

function formatarValor(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// Formata data ISO (2026-07-13) para exibição (13/07/2026)

function formatarData(dataISO) {

    const [ano, mes, dia] = dataISO.split("-");

    return `${dia}/${mes}/${ano}`;

}


export function inicializarPedidos(pedidos) {

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


        // ORDENAR (valor já é number, data já é ISO -> ambos comparáveis direto)

        if (ordemSelecionada === "newest") {

            pedidosFiltrados.sort((a, b) => {

                return new Date(b.data) - new Date(a.data);

            });

        }


        if (ordemSelecionada === "oldest") {

            pedidosFiltrados.sort((a, b) => {

                return new Date(a.data) - new Date(b.data);

            });

        }


        if (ordemSelecionada === "highest") {

            pedidosFiltrados.sort((a, b) => {

                return b.valor - a.valor;

            });

        }


        if (ordemSelecionada === "lowest") {

            pedidosFiltrados.sort((a, b) => {

                return a.valor - b.valor;

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

                <td>${formatarValor(pedido.valor)}</td>

                <td>${formatarData(pedido.data)}</td>

            `;


            ordersTable.appendChild(row);

        });

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