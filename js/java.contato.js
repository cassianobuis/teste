document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Validação do formulário
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pegar valores dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validação simples
        if(nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Simular envio (substituir por AJAX em produção)
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
        contactForm.reset();
    });
    
    // Efeito de scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});