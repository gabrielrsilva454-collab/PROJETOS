const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");
const ordersTable = document.getElementById("ordersTable");

function atualizarPedidos() {

    const textoPesquisa = searchInput.value.toLowerCase();
    const statusSelecionado = statusFilter.value;
    const ordemSelecionada = sortFilter.value;

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

            const dataA = converterData(a.data);
            const dataB = converterData(b.data);

            return dataB - dataA;
        });

    }


    if (ordemSelecionada === "oldest") {

        pedidosFiltrados.sort((a, b) => {

            const dataA = converterData(a.data);
            const dataB = converterData(b.data);

            return dataA - dataB;
        });

    }


    // ORDENAR POR VALOR

    if (ordemSelecionada === "highest") {

        pedidosFiltrados.sort((a, b) => {

            const valorA = converterValor(a.valor);
            const valorB = converterValor(b.valor);

            return valorB - valorA;
        });

    }


    if (ordemSelecionada === "lowest") {

        pedidosFiltrados.sort((a, b) => {

            const valorA = converterValor(a.valor);
            const valorB = converterValor(b.valor);

            return valorA - valorB;
        });

    }


    // LIMPA A TABELA

    ordersTable.innerHTML = "";


    // CRIA AS LINHAS

    pedidosFiltrados.forEach((pedido) => {

        const row = document.createElement("tr");

        let statusClass;

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
            .replace(".", "")
            .replace(",", ".")
            .trim()
    );

}


// CONVERTE 13/07/2026 PARA UMA DATA

function converterData(data) {

    const partes = data.split("/");

    return new Date(
        partes[2],
        partes[1] - 1,
        partes[0]
    );

}


// EVENTOS

searchInput.addEventListener("input", atualizarPedidos);

statusFilter.addEventListener("change", atualizarPedidos);

sortFilter.addEventListener("change", atualizarPedidos);


searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        atualizarPedidos();

    }

});


// MOSTRA OS PEDIDOS AO ABRIR A PÁGINA

atualizarPedidos();