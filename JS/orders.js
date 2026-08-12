const pedidos = [

    {
        numero: "#1024",
        cliente: "João Silva",
        status: "Pago",
        valor: "R$ 520,00",
        data: "12/07/2026"
    },

    {
        numero: "#1025",
        cliente: "Maria Souza",
        status: "Pendente",
        valor: "R$ 180,00",
        data: "13/07/2026"
    },

    {
        numero: "#1026",
        cliente: "Pedro Lima",
        status: "Enviado",
        valor: "R$ 760,00",
        data: "13/07/2026"
    }

];

let produtosAPI = [];

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {

        produtosAPI = data.products;

        console.log("Produtos recebidos da API:", produtosAPI);

    })
    .catch(error => {

        console.error("Erro ao buscar produtos:", error);

    });