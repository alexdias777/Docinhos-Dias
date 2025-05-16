const scrollToTopButton = document.getElementById('VoltarTopo');

window.addEventListener('scroll', () => {
    // Verificando se o usuário chegou ao footer
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    // Adiciona a classe 'clicked' ao botão
    scrollToTopButton.classList.add('clicked');

    // Voltando para a cor para verde 
    setTimeout(() => {
        scrollToTopButton.classList.remove('clicked');
    }, 300);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

