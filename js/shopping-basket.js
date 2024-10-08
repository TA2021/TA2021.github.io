

const carts = document.querySelectorAll('.add-cart-btn');

const products = [
    {
        name: 'Blue Shirt',
        tag: 'BlueShirt',
        price: 29.99,
        inCart: 0
    },
    {
        name: 'Black Shirt',
        tag: 'BlackShirt',
        price: 23.99,
        inCart: 0
    },
    {
        name: 'White Shirt',
        tag: 'WhiteShirt',
        price: 89.99,
        inCart: 0
    },
    {
        name: 'Denim jeans',
        tag: 'DenimJeans',
        price: 150.00,
        inCart: 0
    },
    {
        name: 'Light blue jeans',
        tag: 'LightBlue',
        price: 50.00,
        inCart: 0
    },
    {
        name: 'Cotton jeans',
        tag: 'Cottonjeans',
        price: 200.00,
        inCart: 0
    },
    {
        name: 'Blue blouse',
        tag: 'Blueblouse',
        price: 59.99,
        inCart: 0
    },
    {
        name: 'Off White blouse',
        tag: 'OffWhiteblouse',
        price: 73.99,
        inCart: 0
    },
    {
        name: 'White blouse',
        tag: 'Whiteblouse',
        price: 89.99,
        inCart: 0
    },
    {
        name: 'Brown trouser',
        tag: 'Browntrouser',
        price: 140.00,
        inCart: 0
    },
    {
        name: 'Cream trouser',
        tag: 'Creamtrouser',
        price: 59.00,
        inCart: 0
    },
    {
        name: 'Grey trouser',
        tag: 'Greytrouser',
        price: 201.00,
        inCart: 0
    }
    
]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cardsNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCardsNumbers() {
    let productNumber = localStorage.getItem('cardsNumbers');
    if (productNumber) {
        document.querySelector('.add-cart span').textContent = productNumber;
    }
}

function cardsNumbers(product) {
    let productNumber = localStorage.getItem('cardsNumbers');
    productNumber = parseInt(productNumber) || 0;
    if (productNumber) {
        localStorage.setItem('cardsNumbers', productNumber + 1);
        document.querySelector('.add-cart span').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cardsNumbers', 1);
        document.querySelector('.add-cart span').textContent = 1;
    }

    setItems(product);
}

function generateProductId() {
    return Math.random().toString(36).substr(2, 9);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: {
                    ...product,
                    id: generateProductId() // Adds a unique identifier to each product
                }
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        product.id = generateProductId();
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.prods');
    let cartCost = 0; // Initialize cartCost to 0

    

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).map((item, index) => {
            const closeBtnId = `close-btn-${item.id}`; // Update the close button's unique identifier
            const addBtnId = `add-btn-${item.id}`;
            const removeBtnId = `remove-btn-${item.id}`;
            productContainer.innerHTML += `
                <div class="prod">
                    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/close-o.css' rel='stylesheet'>
                    <i class="gg-close-o ${closeBtnId}"></i>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">£${item.price}</div>
                <div class="quantity">
                    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/add.css' rel='stylesheet'>
                    <i class="gg-add ${addBtnId}"></i>
                    <span>${item.inCart}</span>
                    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/remove.css' rel='stylesheet'>
                    <i class="gg-remove ${removeBtnId}"></i>
                </div>
                <div class="total">
                    £${item.inCart * item.price}
                </div>
            `;

            // Increment cartCost for each item in the cart
            cartCost += item.inCart * item.price;
            console.log('clicked 00');
            // Add event listeners for add and remove buttons


            document.querySelector(`.${removeBtnId}`).addEventListener('click', () => {
                // Decrease the quantity of the selected item, but ensure it doesn't go below 1
                cartItems[item.tag].inCart = Math.max(cartItems[item.tag].inCart - 1, 1);
                // Update localStorage and redisplay the cart
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            });
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                </h4>
                <h4 class="basketTotal">
                    £${cartCost}
                </h4>
            </div>
        `;
    }

    // Update localStorage with the recalculated total cost
    localStorage.setItem('totalCost', cartCost.toString());

    let removeItems = document.getElementsByClassName('gg-close-o');

    for (let i = 0; i < removeItems.length; i++) {
        let button = removeItems[i];
        button.addEventListener('click', (event) => {
            // Get the unique identifier of the clicked close button
            const productId = event.target.className.split(' ').find(cls => cls.startsWith('close-btn-')).split('-')[2];

            // Remove the corresponding product from the cartItems
            const updatedCartItems = { ...cartItems };
            for (const key in updatedCartItems) {
                if (updatedCartItems[key].id === productId) {
                    cartCost -= updatedCartItems[key].inCart * updatedCartItems[key].price;
                    delete updatedCartItems[key];
                    break;
                }
            }

            // Update localStorage and display the updated cart
            localStorage.setItem('productsInCart', JSON.stringify(updatedCartItems));
            localStorage.setItem('totalCost', cartCost.toString());
            displayCart();
        });
    }

    let addItem = document.getElementsByClassName('gg-add');
    for (let i = 0; i < addItem.length; i++) {
        let button = addItem[i];
        button.addEventListener('click', (event) => {
            // Get the unique identifier of the clicked add button
            const productId = event.target.className.split(' ').find(cls => cls.startsWith('add-btn-')).split('-')[2];

            //Increaments the quantity of the selected item
            const productToUpdate = Object.values(cartItems).find(item => item.id === productId);
            if (productToUpdate) {
                productToUpdate.inCart += 1;
            }

            // Update localStorage and display the updated cart
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            localStorage.setItem('totalCost', cartCost.toString());
            displayCart();
        });
    }
}



onLoadCardsNumbers();
displayCart();


