document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("menu");
    const main = document.querySelector("main");

    if (!menu || !main) return;

    // Guarda o dashboard original
    const dashboardHTML = main.innerHTML;

    const links = menu.querySelectorAll("a");

    function atualizarMenu(pagina) {

        links.forEach(link => {

            link.classList.remove("active");

            if (link.dataset.page === pagina) {
                link.classList.add("active");
            }

        });

    }

    function mostrarPagina(pagina) {

        atualizarMenu(pagina);

        switch (pagina) {

            case "dashboard":

                main.innerHTML = dashboardHTML;

                setTimeout(() => {

                    inicializarDashboard();

                }, 100);

                break;


            case "clientes":

                main.innerHTML = `
                    <section class="page-header">
                        <h1>👥 Clientes</h1>
                        <p>Gerencie os clientes da sua empresa.</p>
                    </section>

                    <section class="card">
                        <div class="page-content">

                            <h2>Lista de Clientes</h2>

                            <div class="table-container">

                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Email</th>
                                            <th>Telefone</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>#001</td>
                                            <td>João Silva</td>
                                            <td>joao@email.com</td>
                                            <td>(11) 99999-1111</td>
                                            <td>
                                                <span class="status pago">
                                                    Ativo
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>#002</td>
                                            <td>Maria Souza</td>
                                            <td>maria@email.com</td>
                                            <td>(11) 98888-2222</td>
                                            <td>
                                                <span class="status pago">
                                                    Ativo
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>#003</td>
                                            <td>Pedro Lima</td>
                                            <td>pedro@email.com</td>
                                            <td>(11) 97777-3333</td>
                                            <td>
                                                <span class="status pago">
                                                    Ativo
                                                </span>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </section>
                `;

                break;


            case "produtos":

                main.innerHTML = `
        <section class="page-header">

            <h1>📦 Produtos</h1>

            <p>
                Produtos carregados diretamente da API.
            </p>

        </section>

        <section class="products-grid" id="productsGrid">

            <p class="loading-products">
                Carregando produtos...
            </p>

        </section>

        <div class="product-modal" id="productModal">

            <div class="product-modal-content">

                <button
                    class="close-modal"
                    id="closeProductModal">
                    ×
                </button>

                <div id="productDetails"></div>

            </div>

        </div>
    `;


                const productsGrid =
                    document.getElementById("productsGrid");


                function mostrarProdutos() {

                    productsGrid.innerHTML = "";


                    produtosAPI.forEach(produto => {

                        const card =
                            document.createElement("article");

                        card.className = "product-card";


                        card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${produto.thumbnail}"
                        alt="${produto.title}"
                    >

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${produto.category}
                    </span>


                    <h3>
                        ${produto.title}
                    </h3>


                    <div class="product-rating">
                        ⭐ ${produto.rating.toFixed(1)}
                    </div>


                    <div class="product-bottom">

                        <strong>
                            $${produto.price.toFixed(2)}
                        </strong>

                        <span>
                            📦 ${produto.stock}
                        </span>

                    </div>


                    <button
                        class="product-details-button"
                        data-product-id="${produto.id}">

                        Ver detalhes

                    </button>

                </div>

            `;


                        productsGrid.appendChild(card);

                    });


                    adicionarEventosProdutos();

                }


                function adicionarEventosProdutos() {

                    const buttons =
                        document.querySelectorAll(
                            ".product-details-button"
                        );


                    buttons.forEach(button => {

                        button.addEventListener("click", () => {

                            const productId =
                                Number(button.dataset.productId);


                            const produto =
                                produtosAPI.find(
                                    item => item.id === productId
                                );


                            if (!produto) return;


                            mostrarDetalhes(produto);

                        });

                    });

                }


                function mostrarDetalhes(produto) {

                    const modal =
                        document.getElementById("productModal");

                    const details =
                        document.getElementById("productDetails");


                    details.innerHTML = `

            <img
                class="modal-product-image"
                src="${produto.thumbnail}"
                alt="${produto.title}"
            >


            <span class="product-category">
                ${produto.category}
            </span>


            <h2>
                ${produto.title}
            </h2>


            <p class="modal-description">
                ${produto.description}
            </p>


            <div class="modal-product-info">

                <div>
                    <span>Preço</span>
                    <strong>
                        $${produto.price.toFixed(2)}
                    </strong>
                </div>


                <div>
                    <span>Estoque</span>
                    <strong>
                        ${produto.stock}
                    </strong>
                </div>


                <div>
                    <span>Avaliação</span>
                    <strong>
                        ⭐ ${produto.rating.toFixed(1)}
                    </strong>
                </div>


                <div>
                    <span>Desconto</span>
                    <strong>
                        ${produto.discountPercentage.toFixed(1)}%
                    </strong>
                </div>

            </div>

        `;


                    modal.classList.add("show");

                }


                const closeButton =
                    document.getElementById("closeProductModal");


                const modal =
                    document.getElementById("productModal");


                closeButton.addEventListener(
                    "click",
                    () => {

                        modal.classList.remove("show");

                    }
                );


                modal.addEventListener("click", event => {

                    if (event.target === modal) {

                        modal.classList.remove("show");

                    }

                });


                if (produtosAPI.length > 0) {

                    mostrarProdutos();

                } else {

                    const intervalo =
                        setInterval(() => {

                            if (produtosAPI.length > 0) {

                                clearInterval(intervalo);

                                mostrarProdutos();

                            }

                        }, 100);

                }

                break;


            case "pedidos":

    main.innerHTML = `
        <section class="page-header">
            <h1>Pedidos</h1>
            <p>Acompanhe todos os pedidos realizados.</p>
        </section>

        <section class="card orders-table-card">

            <div class="orders-header">
                <h2>Todos os Pedidos</h2>
            </div>

            <div class="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
                            <th>Status</th>
                            <th>Valor</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody id="ordersTable"></tbody>

                </table>

            </div>

        </section>
    `;

    if (typeof window.iniciarPedidos === "function") {
        window.iniciarPedidos();
    }

    break;


            case "relatorios":

                main.innerHTML = `
                    <section class="page-header">
                        <h1>📈 Relatórios</h1>
                        <p>Visualize os principais resultados da empresa.</p>
                    </section>

                    <section class="cards">

                        <div class="card">
                            <div class="card-info">
                                <h3>Faturamento</h3>
                                <p class="value">
                                    R$ 48.500,00
                                </p>
                                <span class="positive">
                                    +12% este mês
                                </span>
                            </div>
                            <div class="card-icon">💰</div>
                        </div>

                        <div class="card">
                            <div class="card-info">
                                <h3>Pedidos</h3>
                                <p class="value">328</p>
                                <span class="positive">
                                    +5% este mês
                                </span>
                            </div>
                            <div class="card-icon">🛒</div>
                        </div>

                        <div class="card">
                            <div class="card-info">
                                <h3>Clientes</h3>
                                <p class="value">1.245</p>
                                <span class="positive">
                                    +8% este mês
                                </span>
                            </div>
                            <div class="card-icon">👥</div>
                        </div>

                    </section>

                    <section class="card orders-table-card">

    <div class="orders-header">
        <h2>📊 Resumo do período</h2>
    </div>

    <div class="table-container">

        <table>

            <thead>
                <tr>
                    <th>Indicador</th>
                    <th>Resultado</th>
                    <th>Variação</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td>Faturamento</td>
                    <td>R$ 48.500,00</td>
                    <td>
                        <span class="status pago">
                            +12% este mês
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>Clientes</td>
                    <td>1.245</td>
                    <td>
                        <span class="status pago">
                            +8%
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>Pedidos</td>
                    <td>328</td>
                    <td>
                        <span class="status pago">
                            +5% este mês
                        </span>
                    </td>
                </tr>

            </tbody>

        </table>

    </div>

</section>
                `;

                break;


            case "configuracoes":

                main.innerHTML = `
                    <section class="page-header">
                        <h1>⚙️ Configurações</h1>
                        <p>Configure sua conta e o sistema.</p>
                    </section>

                    <section class="card settings-card">

                        <h2>👤 Perfil</h2>

                        <div class="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                value="Rodrigues"
                            >
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value="admin@nexora.com"
                            >
                        </div>

                        <div class="form-group">
                            <label>Cargo</label>
                            <input
                                type="text"
                                value="Administrador"
                            >
                        </div>

                        <button class="save-button">
                            Salvar alterações
                        </button>

                    </section>
                `;

                break;

        }
    }


    function inicializarDashboard() {

        // cards.js, chart.js e orders.js são módulos ES,
        // por isso expõem essas funções em window explicitamente
        if (typeof window.iniciarCards === "function") {
            window.iniciarCards();
        }

        if (typeof window.carregarGrafico === "function") {
            window.carregarGrafico();
        }

        if (typeof window.iniciarPedidos === "function") {
            window.iniciarPedidos();
        }

        // Reativa os ícones lucide (o HTML salvo em cache tem
        // <i data-lucide="..."> "crus", sem o SVG gerado)
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }


    // Clique no menu
    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const pagina = link.dataset.page;

            window.location.hash = pagina;

            mostrarPagina(pagina);

        });

    });


    // Abre a página correspondente ao hash
    function carregarPagina() {

        const pagina = window.location.hash.replace("#", "") || "dashboard";

        const paginasValidas = [
            "dashboard",
            "clientes",
            "produtos",
            "pedidos",
            "relatorios",
            "configuracoes"
        ];

        if (paginasValidas.includes(pagina)) {
            mostrarPagina(pagina);
        } else {
            mostrarPagina("dashboard");
        }

    }


    window.addEventListener("hashchange", carregarPagina);

    carregarPagina();

});