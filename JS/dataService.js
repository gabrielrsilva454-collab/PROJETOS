// =========================
// dataService.js
// Fonte única de acesso aos dados do dashboard.
// Ninguém mais no projeto deve dar fetch em data/db.json
// diretamente — sempre passar por estas funções.
// =========================

let _dbCache = null;

async function carregarDB() {

    if (_dbCache) {

        return _dbCache;

    }

    const response = await fetch("data/db.json");

    if (!response.ok) {

        throw new Error("Não foi possível carregar data/db.json");

    }

    _dbCache = await response.json();

    return _dbCache;

}


// Lista de pedidos recentes (usada na tabela + busca)

export async function getOrders() {

    const db = await carregarDB();

    return db.orders;

}


// Histórico mensal de vendas (usado no gráfico)

export async function getSalesHistory() {

    const db = await carregarDB();

    return db.salesHistory;

}


// Calcula a variação percentual entre dois valores

function calcularVariacao(atual, anterior) {

    if (!anterior) {

        return 0;

    }

    return Math.round(((atual - anterior) / anterior) * 100);

}


// Estatísticas dos 4 cards do topo.
// Faturamento e Pedidos vêm do salesHistory (último mês vs anterior),
// então o card e o gráfico NUNCA ficam com números que se contradizem.

export async function getStats() {

    const db = await carregarDB();

    const historico = db.salesHistory;

    const atual = historico[historico.length - 1];
    const anterior = historico[historico.length - 2];

    return {

        faturamento: {
            value: atual.faturamento,
            change: calcularVariacao(atual.faturamento, anterior.faturamento),
            type: "money"
        },

        pedidos: {
            value: atual.pedidos,
            change: calcularVariacao(atual.pedidos, anterior.pedidos),
            type: "number"
        },

        clientes: {
            value: db.kpis.clientes.value,
            change: db.kpis.clientes.change,
            type: "number"
        },

        produtos: {
            value: db.kpis.produtos.value,
            change: db.kpis.produtos.change,
            type: "number"
        }

    };

}