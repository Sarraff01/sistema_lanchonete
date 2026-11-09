
let nomesProdutos = [];
let precosProdutos = [];
let totaisVendas = [];

let qtdProdutos = 0;
let qtdVendas = 0;


// 1 - Cadastrar produto
function cadastrarProduto() {

    let nome = prompt("Informe o nome do produto:");

    if (nome == null || nome == "") {
        alert("Nome inválido!");
        return;
    }

    // Verifica se já existe
    for (let i = 0; i < qtdProdutos; i++) {
        if (nomesProdutos[i] == nome) {
            alert("Produto já cadastrado!");
            return;
        }
    }

    let preco = Number(prompt("Informe o preço:"));

    if (preco <= 0 || isNaN(preco)) {
        alert("Preço inválido!");
        return;
    }

    nomesProdutos[qtdProdutos] = nome;
    precosProdutos[qtdProdutos] = preco;

    qtdProdutos++;

    alert("Produto cadastrado!");
}


// 2 - Listar produtos
function listarProdutos() {

    if (qtdProdutos == 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    let mensagem = "PRODUTOS:\n\n";

    for (let i = 0; i < qtdProdutos; i++) {
        mensagem += "Código: " + (i + 1) + "\n";
        mensagem += nomesProdutos[i] + " - R$ " + precosProdutos[i].toFixed(2) + "\n\n";
    }

    alert(mensagem);
}


// 3 - Calcular subtotal
function calcularTotalVenda(preco, quantidade) {

    return preco * quantidade;
}


// 4 - Calcular desconto
function calcularDesconto(total) {

    if (total > 50) {
        return total * 0.10;
    }

    return 0;
}


// 5 - Mostrar resumo da venda
function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {

    let total = subtotal - desconto;

    alert(
        "RESUMO DA VENDA\n\n" +
        "Produto: " + nome +
        "\nPreço: R$ " + preco.toFixed(2) +
        "\nQuantidade: " + quantidade +
        "\nSubtotal: R$ " + subtotal.toFixed(2) +
        "\nDesconto: R$ " + desconto.toFixed(2) +
        "\nTotal: R$ " + total.toFixed(2)
    );
}


// 6 - Realizar venda
function realizarVenda() {

    if (qtdProdutos == 0) {
        alert("Cadastre produtos primeiro!");
        return;
    }

    listarProdutos();

    let codigo = Number(prompt("Informe o código do produto:"));

    if (codigo < 1 || codigo > qtdProdutos || codigo % 1 != 0) {
        alert("Código inválido!");
        return;
    }

    let quantidade = Number(prompt("Informe a quantidade:"));

    if (quantidade <= 0 || quantidade % 1 != 0) {
        alert("Quantidade inválida!");
        return;
    }

    let i = codigo - 1;

    let subtotal = calcularTotalVenda(precosProdutos[i], quantidade);

    let desconto = calcularDesconto(subtotal);

    let total = subtotal - desconto;

    exibirResumoVenda(
        nomesProdutos[i],
        precosProdutos[i],
        quantidade,
        subtotal,
        desconto
    );

    let confirmar = confirm("Deseja confirmar a venda?");

    if (confirmar == true) {

        totaisVendas[qtdVendas] = total;

        qtdVendas++;

        alert("Venda realizada com sucesso!");

    } else {
        alert("Venda cancelada!");
    }
}


// 7 - Calcular total de vendas
function obterTotalVendasDia() {

    let total = 0;

    for (let i = 0; i < qtdVendas; i++) {
        total = total + totaisVendas[i];
    }

    return total;
}


// 8 - Consultar total do dia
function exibirTotalVendasDia() {

    if (qtdVendas == 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    let total = obterTotalVendasDia();

    alert(
        "VENDAS DO DIA\n\n" +
        "Quantidade de vendas: " + qtdVendas +
        "\nTotal vendido: R$ " + total.toFixed(2)
    );
}


// 9 - Menu principal

function iniciarSistema() {

    let opcao = "";

    while (opcao != "5") {

        opcao = prompt(
            "SISTEMA DE LANCHONETE\n\n" +
            "1 - Cadastrar produto\n" +
            "2 - Listar produtos\n" +
            "3 - Realizar venda\n" +
            "4 - Consultar total do dia\n" +
            "5 - Encerrar"
        );

        if (opcao == null) {
            break;
        }

        switch (opcao) {

            case "1":
                cadastrarProduto();
                break;

            case "2":
                listarProdutos();
                break;

            case "3":
                realizarVenda();
                break;

            case "4":
                exibirTotalVendasDia();
                break;

            case "5":
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida!");
        }
    }
}

