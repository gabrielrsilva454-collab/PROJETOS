import { getOrders } from "./dataService.js";
import { inicializarPedidos } from "./search.js";

async function iniciarPedidos() {

    try {

        const pedidos = await getOrders();

        inicializarPedidos(pedidos);

    } catch (error) {

        console.error("Erro ao carregar pedidos:", error);

    }

}

document.addEventListener("DOMContentLoaded", iniciarPedidos);