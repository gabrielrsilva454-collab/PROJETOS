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

// Exposto para o menu.js poder chamar de novo (dashboard e aba Pedidos)
window.iniciarPedidos = iniciarPedidos;


// =========================
// Produtos (usado pela aba "Produtos" do menu.js)
// =========================

window.produtosAPI = [];

fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {

        window.produtosAPI = data.products;

    })
    .catch((error) => {

        console.error("Erro ao buscar produtos:", error);

    });