// ============================================================
// produto.js
// Monta a página de produto dinamicamente a partir do produtos.json
// Uso: paginas-produtos/produto.html?id=25
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // 1) Pega o id do produto que veio na URL (?id=25)
    var parametros = new URLSearchParams(window.location.search);
    var id = parametros.get('id');

    if (!id) {
        mostrarErro('Nenhum produto foi especificado na URL (faltou o ?id=).');
        return;
    }

    // 2) Busca o arquivo com os dados de todos os produtos
    fetch('../produtos.json')
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Não foi possível carregar produtos.json');
            }
            return resposta.json();
        })
        .then(function (produtos) {
            var produto = produtos[id];

            if (!produto) {
                mostrarErro('Produto com id "' + id + '" não foi encontrado.');
                return;
            }

            preencherPagina(produto);
        })
        .catch(function (erro) {
            console.error(erro);
            mostrarErro('Erro ao carregar os dados do produto. Verifique se a página está sendo aberta por um servidor local (ex: Live Server), e não direto pelo arquivo.');
        });
});


function preencherPagina(produto) {
    // Título da aba do navegador
    document.getElementById('titulo-pagina').textContent = produto.nome + ' - SOFTBYKE';

    // Breadcrumb
    document.getElementById('breadcrumb-produto').textContent = produto.nome;

    // Imagem
    var imagem = document.getElementById('produto-imagem');
    imagem.src = '../' + produto.imagem;
    imagem.alt = produto.nome;

    // Categoria, nome, preço, descrição
    document.getElementById('produto-categoria').textContent = produto.categoria;
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-preco').textContent = produto.preco;
    document.getElementById('produto-descricao').textContent = produto.descricao;

    // Avaliação (nem todo produto tem)
    if (produto.rating) {
        var ratingEl = document.getElementById('produto-rating');
        ratingEl.textContent = produto.rating;
        ratingEl.style.display = '';
    }

    // Parcelamento (nem todo produto tem)
    if (produto.parcelamento) {
        var parcelamentoEl = document.getElementById('produto-parcelamento');
        parcelamentoEl.textContent = produto.parcelamento;
        parcelamentoEl.style.display = '';
    }

    // Tabela de opções (cor/tamanho/aro) - só aparece se existir
    if (produto.opcoes && produto.opcoes.length > 0) {
        var tabelaOpcoes = document.getElementById('produto-opcoes-tabela');
        produto.opcoes.forEach(function (opcao) {
            var linha = document.createElement('tr');
            linha.innerHTML = '<th align="left">' + opcao[0] + ':</th><td>' + opcao[1] + '</td>';
            tabelaOpcoes.appendChild(linha);
        });
        tabelaOpcoes.style.display = '';
    }

    // Ficha técnica
    var tabelaSpecs = document.getElementById('produto-specs-tabela');
    produto.specs.forEach(function (spec) {
        var linha = document.createElement('tr');
        linha.innerHTML = '<th align="left">' + spec[0] + '</th><td>' + spec[1] + '</td>';
        tabelaSpecs.appendChild(linha);
    });
}


function mostrarErro(mensagem) {
    document.getElementById('breadcrumb-produto').textContent = 'Produto não encontrado';
    document.getElementById('produto-nome').textContent = 'Produto não encontrado';
    document.getElementById('produto-descricao').textContent = mensagem;
    document.getElementById('produto-preco').textContent = '';
}
