

const carts = document.querySelectorAll('.add-cart-btn');
let products = [];



async function getProducts() {
    const response = await axios.get('http://localhost:5000/products');
    // console.log(response.data);
    products = response.data.products;

    //assuming 6 dimensions: pages and sections
    const numPages = 6;
    const numSectionsPerPage = 6;
    products = chunckArray(products, numPages * numSectionsPerPage); // splits products into pages and sections

    populateProducts();
}

getProducts();

//splits an array into chuncks
function chunckArray(arr, chunckSize) {
    const chunckedArray = [];
    for (let i = 0; i < arr.length; i += chunckSize) {
        chunckedArray.push(arr.slice(i, i + chunckSize));
    }
    return chunckedArray;
}

function populateProducts() {
    for (let page = 0; page < products.length; page++) {
        for (let section = 0; section < products[page].length; section++) {
            const container = document.querySelector('.container-' + (page + 1) + '-' + (section + 1));

            const productsHtml = products[page][section].map((product, i) => {

                return (
                    `
                
                <div class="product">
                    <div class="product-card">
                      <h2 class="name">${product.name}</h2>
                      <span class="price">£${product.price}</span>
                      <a class="popup-btn">Quick View</a>
                      <img src="${product.Image}" class="product-img" alt="${product.description}">
                    </div>
                    <div class="popup-view">
                      <div class="popup-card">
                        <a><i class="fas fa-times close-btn"></i></a>
                        <div class="product-img">
                          <img src="${product.Image}" alt="${product.description}">
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
                  
                `
                )


            });

            if (container) {
                container.innerHTML = productsHtml.toString();
                addCartActions(container);
            }
        }
    }

}



function addCartActions(container) {

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

/* for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cardsNumbers(products[i]);
        totalCost(products[i]);
    });
} */



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


