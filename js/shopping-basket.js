let carts = document.querySelectorAll('.add-cart-btn');
let products = [
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
        price: 29.99,
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
    }
    
]
for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener( 'click', () => {
        cardsNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCardsNumbers(){
    let productNumber = localStorage.getItem('cardsNumbers');
    if(productNumber){
        document.querySelector('.add-cart span').textContent = productNumber;
    }
}

// function to grap items and update the local stoage and the cart icon everytime the add to cart button is pressed 
function cardsNumbers(product){
    
    let productNumber = localStorage.getItem('cardsNumbers');
    productNumber = parseFloat(productNumber);
    if(productNumber){
        localStorage.setItem('cardsNumbers', productNumber + 1);
        document.querySelector('.add-cart span').textContent = productNumber + 1;
    }else{
        localStorage.setItem('cardsNumbers', 1);
        document.querySelector('.add-cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
          [product.tag]: product
        }
    }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".prods");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
        <div class="prod">
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/close-o.css' rel='stylesheet'>
        <i class="gg-close-o"></i>
            
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
        </div>
        <div class="price">£${item.price}</div>
        <div class="quantity">
            <link href='https://unpkg.com/css.gg@2.0.0/icons/css/add.css' rel='stylesheet'>
            <i class="gg-add"></i>
            <span>${item.inCart}</span>
            <link href='https://unpkg.com/css.gg@2.0.0/icons/css/remove.css' rel='stylesheet'>
            <i class="gg-remove"></i>
        </div>
        <div class="total">
            £${item.inCart * item.price}
        </div>
        `;
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

}

onLoadCardsNumbers();
displayCart();