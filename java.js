document.addEventListener('DOMContentLoaded', function() {
    // Carrossel de imagens
    var swiper = new Swiper(".home-slider", {
        loop: true,
        grabCursor: true,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Menu mobile
    let menuBtn = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.navbar');
    
    menuBtn.onclick = () => {
        menuBtn.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }
    
    window.onscroll = () => {
        menuBtn.classList.remove('fa-times');
        navbar.classList.remove('active');
    }

    // Carrinho de compras
    let cartBtn = document.querySelector('#cart-btn');
    let cart = document.querySelector('.shopping-cart');
    let closeCart = document.querySelector('.close-cart');
    
    cartBtn.onclick = () => {
        cart.classList.add('active');
    }
    
    closeCart.onclick = () => {
        cart.classList.remove('active');
    }

    // Adicionar itens ao carrinho
    let addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartTotal = document.querySelector('.total');
    
    let cartItems = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    function addToCart(event) {
        let button = event.target;
        let item = {
            name: button.getAttribute('data-name'),
            price: parseFloat(button.getAttribute('data-price')),
            id: Date.now() // ID único para cada item
        };
        
        cartItems.push(item);
        updateCart();
        
        // Feedback visual
        button.textContent = 'Adicionado!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            button.textContent = button.getAttribute('data-name').includes('Plano') ? 'Assinar' : 'Agendar';
            button.style.backgroundColor = '';
        }, 1000);
    }
    
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cartItems.forEach(item => {
            let cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="price">R$ ${item.price.toFixed(2)}</span>
                </div>
                <span class="remove-item" data-id="${item.id}">&times;</span>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price;
            
            // Adicionar evento de remoção
            cartItemElement.querySelector('.remove-item').addEventListener('click', removeItem);
        });
        
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    function removeItem(event) {
        let itemId = parseInt(event.target.getAttribute('data-id'));
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCart();
    }
    
    // Finalizar compra
    let checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', checkout);
    
    function checkout() {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        let total = cartItems.reduce((sum, item) => sum + item.price, 0);
        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nObrigado por escolher a PowerFit!`);
        
        // Limpar carrinho
        cartItems = [];
        updateCart();
        cart.classList.remove('active');
    }

    // Cadastro de Usuário
    const registrationForm = document.getElementById('registration-form');
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        const name = registrationForm.querySelector('input[type="text"]').value;
        const email = registrationForm.querySelector('input[type="email"]').value;
        const password = registrationForm.querySelector('input[type="password"]').value;
        
        // Validação simples
        if (name && email && password) {
            alert(`Cadastro realizado com sucesso!\nNome: ${name}\nEmail: ${email}`);
            registrationForm.reset(); // Limpa o formulário após o envio
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
    const boxes = document.querySelectorAll('.box-3d, .aula-3d, .trainer-3d');
    
    boxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            box.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        box.addEventListener('mouseenter', (e) => {
            box.style.transition = 'none';
        });
        
        box.addEventListener('mouseleave', (e) => {
            box.style.transition = 'transform 0.5s ease';
            box.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
});
//
// Armazenamento simples de usuários (em um sistema real, use um backend)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Elementos do DOM
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('cadastro');
const loginFormElement = document.getElementById('login-form');
const registerFormElement = document.getElementById('registration-form');

// Alternar entre login e cadastro
loginBtn.addEventListener('click', function() {
    this.classList.add('active');
    registerBtn.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

registerBtn.addEventListener('click', function() {
    this.classList.add('active');
    loginBtn.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Formulário de Login
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        alert('Login bem-sucedido! Bem-vindo, ' + user.name);
        // Aqui você pode redirecionar para a página do usuário
        // window.location.href = 'dashboard.html';
    } else {
        alert('Email ou senha incorretos!');
    }
});

// Formulário de Cadastro
registerFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    // Validações básicas
    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Verificar se o usuário já existe
    if (users.some(u => u.email === email)) {
        alert('Este email já está cadastrado!');
        return;
    }
    
    // Adicionar novo usuário
    const newUser = { 
        name, 
        email, 
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
    
    // Limpar formulário e mostrar o login
    this.reset();
    loginBtn.click();
});

// Mostrar login por padrão ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    loginBtn.classList.add('active');
    loginForm.classList.add('active');
});