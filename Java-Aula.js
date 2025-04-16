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
