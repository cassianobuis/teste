
    // Menu Mobile
let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menuBtn.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// Efeito 3D nos treinadores
document.querySelectorAll('.trainer-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        box.querySelector('.trainer-3d').style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});

// Resetar posição quando o mouse sair
document.querySelectorAll('.trainer-box').forEach(box => {
    box.addEventListener('mouseleave', () => {
        box.querySelector('.trainer-3d').style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});

// Validação do formulário
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação simples
    let inputs = document.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.border = '1px solid red';
            isValid = false;
        } else {
            input.style.border = '1px solid #ddd';
        }
    });
    
    if (isValid) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        e.target.reset();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Efeito de rolagem suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});