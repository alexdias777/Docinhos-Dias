$(document).ready(function() {
    // JavaScript para adicionar sombra no menu de navegação superior
    const sections = $('section'); // Seleciona todas as seções
    const navItems = $('.nav-item'); // Seleciona os itens de navegação

    $(window).on('scroll', function() {
        const header = $('header'); // Seleciona o cabeçalho
        const scrollPosition = $(window).scrollTop() - header.outerHeight(); // Posição de rolagem
        let activeSectionIndex = 0; // Índice da seção ativa

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none'); // Remove sombra se no topo
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0,0,0,0.1)'); // Adiciona sombra
        }

        sections.each(function(i) {
            const section = $(this); // Seção atual
            const sectionTop = section.offset().top - 96; // Topo da seção
            const sectionBottom = sectionTop + section.outerHeight(); // Fundo da seção

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i; // Atualiza o índice da seção ativa
                return false; // Interrompe o loop
            }
        });

        // Adiciona efeito de transição suave ao trocar o menu ativo
        navItems.removeClass('active'); // Remove a classe active de todos os itens
        $(navItems[activeSectionIndex]).addClass('active'); // Adiciona a classe active ao item correspondente

        // Adiciona a classe 'fade' para transição
        navItems.addClass('fade');

        // Remove a classe 'fade' após a animação
        setTimeout(() => {
            navItems.removeClass('fade');
        }, 300); // Duração da animação em milissegundos
    });

    // Adiciona evento de clique para os itens de navegação
    navItems.on('click', function() {
        navItems.removeClass('active'); // Remove a classe active de todos os itens
        $(this).addClass('active'); // Adiciona a classe active ao item clicado
    });

    // Aqui animação da página
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.produto', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.descricao_chef', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });

    // Função para adicionar produtos ao carrinho
    window.adicionarAoCarrinho = function(produto, descricao, preco) {
        const carrinhoTbody = $('#carrinho_tbody'); // Seleciona o corpo da tabela do carrinho
        const totalValor = $('#total_valor'); // Seleciona o elemento que exibe o total

        // Verifica se o produto já está no carrinho
        const existingRow = carrinhoTbody.find(`tr[data-produto="${produto}"]`);
        if (existingRow.length > 0) {
            // Se o produto já está no carrinho, apenas aumenta a quantidade
            const quantidadeInput = existingRow.find('.quantidade');
            const novaQuantidade = parseInt(quantidadeInput.val()) + 1;
            quantidadeInput.val(novaQuantidade);
        } else {
            // Adiciona uma nova linha ao carrinho
            carrinhoTbody.append(`
                <tr data-produto="${produto}">
                    <td>${produto}</td> <!-- Nome do produto -->
                    <td>${descricao}</td> <!-- Descrição do produto -->
                    <td>
                        <input type="number" value="1" min="1" class="quantidade" onchange="atualizarTotal()"> <!-- Campo de quantidade -->
                    </td>
                    <td>R$ ${preco.toFixed(2)}</td> <!-- Preço do produto -->
                    <td><button class="remover" onclick="removerProduto(this)">Remover</button></td> <!-- Botão de remover -->
                </tr>
            `);
        }
        atualizarTotal(); // Atualiza o total após adicionar
    }

    // Função para remover um produto do carrinho
    window.removerProduto = function(button) {
        $(button).closest('tr').remove(); // Remove a linha do produto
        atualizarTotal(); // Atualiza o total após remover
    }

    // Função para atualizar o total do carrinho
    window.atualizarTotal = function() {
        let total = 0; // Inicializa o total
        $('#carrinho_tbody tr').each(function() {
            const preco = parseFloat($(this).find('td:eq(3)').text().replace('R$ ', '').replace(',', '.')); // Obtém o preço e converte para float
            const quantidade = parseInt($(this).find('.quantidade').val()); // Obtém a quantidade
            total += preco * quantidade; // Atualiza o total
        });
        $('#total_valor').text(total.toFixed(2)); // Atualiza o valor total exibido
    }
});
