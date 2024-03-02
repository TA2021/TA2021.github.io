

async function populateProducts(endpoint) {
    const container = document.querySelector('.container');

    if(!container){
        console.error('Container element not found');
        return;
    }
    
    try{
    const response = await fetch(endpoint);
    const products = await response.json();
/*     const response1 = await fetch('/women-products');
    const womenProducts = await response1.json();
    const products = menProducts.concat(womenProducts); */

    container.innerHTML = '';


    products.forEach(product => {
        const productsHtml = document.createElement('div');
        productsHtml.innerHTML =  `
            <div class="product">
                <div class="product-card">
                    <h2 class="name">${product.name}</h2>
                    <span class="price">£${product.price}</span>
                    <a class="popup-btn">Quick View</a>
                    <img src="${product.image}" class="product-img" alt="Image of ${product.name}">
                </div>
                <div class="popup-view">
                    <div class="popup-card">
                        <a><i class="fas fa-times close-btn"></i></a>
                        <div class="product-img">
                            <img src="${product.image}" alt="Image of ${product.name}">
                        </div>
                        <div class="info">
                            <h2>Your fashion<br><span>Modern styles</span></h2>
                            <p>${product.description}</p>
                            <span class="price">£${product.price}</span>
                            <a href="#" class="add-cart-btn">Add to Cart</a>
                            <a href="#" class="add-wish">Add to Wishlist</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productsHtml);
        
       

       if(products.image){
            const img = new Image();
            img.src =`data:image/jpeg;base64,${product.image.toString('base64')}`;
            productsHtml.appendChild(img);
        }
        
/*         if(container){
            container.appendChild(productsHtml);
        }else{
            console.error('Container element not found');
        }  */
    });
}catch (error){
    console.error('Failed to populate products:', error);
}
    //console.log(container);
    addCartActions(container);
}
document.addEventListener('DOMContentLoaded', (event) => {
    const menProductsLink = document.getElementById('men-products');
    const womenProductsLink = document.getElementById('women-products');

    if (menProductsLink) {
        menProductsLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            populateProducts('/men-products');
        });
    } else {
        console.error("Men's products link not found.");
    }

    if (womenProductsLink) {
        womenProductsLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            populateProducts('/women-products');
        });
    } else {
        console.error("Women's products link not found.");
    }
});




               



function addCartActions(container) {
    const products = [];

    var popupViews = document.querySelectorAll('.popup-view');
    var popupBtns = document.querySelectorAll('.popup-btn');
    var closeBtns = document.querySelectorAll('.close-btn');
    //javascript for quick view button
    var popup = function (popupClick) {
        popupViews[popupClick].classList.add('active');
    }
    popupBtns.forEach((popupBtn, i) => {
        popupBtn.addEventListener("click", () => {
            popup(i);
        });
    });
    //javascript for close button
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            popupViews.forEach((popupView) => {
                popupView.classList.remove('active');
            });
        });
    });
    const carts = document.querySelectorAll('.add-cart-btn');

    for (let i = 0; i < carts.length; i++) {

        carts[i].addEventListener('click', () => {

            cardsNumbers(products[i]);
            totalCost(products[i]);
        });
    }
}


function onLoadCardsNumbers() {
    let productNumber = localStorage.getItem('cardsNumbers');
    if (productNumber) {
        const cartSpan = document.querySelector('.add-cart span');
        if (cartSpan) {
            cartSpan.textContent = productNumber;
        } else {
            console.error("Element with class 'add-cart span' not found.");
        }
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
    if (!product) {
        return; // Return early if product is null or undefined
    }

    let cartItems = localStorage.getItem('productsInCart');
    
    cartItems = JSON.parse(cartItems);
    
    const productTag = product.tag; // Get the tag property once
    
    if (cartItems != null) {
        if (cartItems[productTag] == undefined) {
            cartItems = {
                ...cartItems,
                [productTag]: {
                    ...product,
                    id: generateProductId() // Adds a unique identifier to each product
                }
            };
        }
        cartItems[productTag].inCart += 1;
    } else {
        product.inCart = 1;
        product.id = generateProductId();
        cartItems = {
            [productTag]: product
        };
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


function totalCost() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems) || {};
    let total = Object.values(cartItems).reduce((acc, item) => acc + (item.inCart * item.price), 0);
    localStorage.setItem('totalCost', total.toString());
    return total;
}


function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    
    let productContainer = document.querySelector('.prods');
    let cartCost = 0; // Initialize cartCost to 0



    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).map((item, index) => {
            const closeBtnId = `close-btn-${item.id}`; // Update the close button's unique identifier
            const addBtnId = `add-btn-${item.id}`;
            const removeBtnId = `remove-btn-${item.id}`;
            
            //const imageUrl = item.tag ? `/images/${item.tag}.jpg` : 'default-image.jpg';
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

            //Increments the quantity of the selected item
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

    let removeItem = document.getElementsByClassName('gg-remove');
    for (let i = 0; i < removeItem.length; i++) {
        let button = removeItem[i];
        button.addEventListener('click', (event) => {
            // Get the unique identifier of the clicked remove button
            const productId = event.target.className.split(' ').find(cls => cls.startsWith('remove-btn-')).split('-')[2];

            //decrements the quantity of the selected item
            const productToUpdate = Object.values(cartItems).find(item => item.id === productId);
            if (productToUpdate) {
                productToUpdate.inCart -= 1;
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
