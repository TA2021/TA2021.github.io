async function populateProducts(products) {
    const container = document.querySelector('.container');

    try {
        container.innerHTML = '';

        products.forEach(product => {
            const productsHtml = document.createElement('div');
            productsHtml.innerHTML = `
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
                            <img src="${product.image}" class="product-img" alt="Image of ${product.name}">
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

            if (products.image) {
                const img = new Image();
                img.src = `data:image/jpeg;base64,${product.image.toString('base64')}`;
                productsHtml.appendChild(img);
            } 
                 if(container){
                        container.appendChild(productsHtml);
                    }else{
                        console.error('Container element not found');
                    }  
        });
    } catch (error) {
        console.error('Failed to populate products:', error);
    }
    addCartActions(products);
}

async function getProducts() {
    try {
        const response = await fetch(`http://localhost:7000/${location.pathname.split('/')[1]}-products`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const copied = Array(20).fill(data[0])
        populateProducts(copied);
    } catch (error) {
        console.error('error fetching products:', error);
    }


}


function addCartActions(products) {
    
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
        });
    }
}


async function cardsNumbers(product) {
    const loggedInuser = JSON.parse(localStorage.getItem('user'))
    if (!loggedInuser) {
        updateShoppingCart(product)
        return
    }

    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: loggedInuser.id,
                productId: product.id
            }) 
          };

        const url = `http://localhost:7000/shopping-cart`

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        updateShoppingCart(product)

    } catch (error) {
        console.error(error);
    }
   
}

function updateShoppingCart(product){
    const shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || []
    shoppingCardItems.push(product)

    localStorage.setItem('shoppingCardItems', JSON.stringify(shoppingCardItems))
    document.querySelector('.add-cart span').textContent = shoppingCardItems.length;
}


document.addEventListener('DOMContentLoaded', (event) => {
    getProducts();
})



