let cart = [];

// Function to open and close the shopping cart
const cartBtn = document.getElementById('cart-btn');
const shoppingCart = document.querySelector('.shopping-cart');
const closeCartBtn = document.querySelector('.close-cart');

cartBtn.addEventListener('click', () => {
    shoppingCart.classList.toggle('active');
});

closeCartBtn.addEventListener('click', () => {
    shoppingCart.classList.remove('active');
});

// Function to add items to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const planName = button.getAttribute('data-name');
        const planPrice = button.getAttribute('data-price');
        
        // Add item to cart
        cart.push({ name: planName, price: parseFloat(planPrice) });
        updateCartDisplay();
        alert(`${planName} foi adicionado ao carrinho!`); // Notification message
    });
});

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <span class="price">R$ ${item.price.toFixed(2)}</span>
            </div>
            <span class="remove-item" data-index="${index}">&times;</span>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    const totalDisplay = document.createElement('div');
    totalDisplay.classList.add('cart-total');
    totalDisplay.innerHTML = `<h4>Total: <span class="total">R$ ${totalPrice.toFixed(2)}</span></h4>`;
    cartItemsContainer.appendChild(totalDisplay);

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Remove item from cart
            updateCartDisplay(); // Update display
        });
    });

    // Add payment button functionality
    const paymentButton = document.createElement('button');
    paymentButton.textContent = 'Pagar';
    paymentButton.classList.add('checkout-btn');
    paymentButton.addEventListener('click', () => {
        alert('Pagamento realizado com sucesso!'); // Simulate payment success
        cart = []; // Clear the cart
        updateCartDisplay(); // Update display after payment
    });
    cartItemsContainer.appendChild(paymentButton);
}
