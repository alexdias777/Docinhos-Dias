// Menu mobile
$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // JavaScript para adicionar sombra no menu de navegação superior
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0,0,0,0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false; // Interrompe o loop ao encontrar a seção ativa
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

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.testimonials_chef', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });
});
