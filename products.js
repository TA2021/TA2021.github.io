/* async function populateProducts(endpoint) {
    const container = document.querySelector('.container');



    try {
        const response = await fetch(endpoint);
        const products = await response.json();


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
                img.src = product.image;
                productsHtml.querySelector('.product-img').appendChild(img);
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
    //console.log(container);
    addCartActions(container);
}

async function getProducts(endpoint = 'http://localhost:7000/products') {
    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 
        const products = await response.json();
        
       // const data = await response.json();
        //products = data.products;

        populateProducts(products);
        // console.log(data.products);
        // console.log('Products:', products);
    } catch (error) {
        console.error('error fetching products:', error);
    }


}


    const ProductsLink = getProducts('products');
   // getProducts();

    if (ProductsLink) {
        ProductsLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            populateProducts('/products');
        });
    } else {
        console.error("products link not found.");
    } */

/* exports.productList =
[
   
    {
        name: 'Blue Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlueShirt',
        price: 29.99,
        inCart: 0,
        Image: '/images/BlueShirt.jpg'
    },
    {
        name: 'Black Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlackShirt',
        price: 23.99,
        inCart: 0,
        Image: '/images/BlackShirt.jpg',
        
    },
    {
        name: 'White Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'WhiteShirt',
        price: 89.99,
        inCart: 0,
        Image: '/images/WhiteShirt.jpg'
    },
    {
        name: 'Denim jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'DenimJeans',
        price: 150.00,
        inCart: 0,
        Image: '/images/DenimJeans.jpg'
    },
    {
        name: 'Light blue jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'LightBlue',
        price: 50.00,
        inCart: 0,
        Image: '/images/LightBlue.jpg'
    },
    {
        name: 'Cotton jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'Cottonjeans',
        price: 200.00,
        inCart: 0,
        Image: '/images/Cottonjeans.jpg'
    },


    {
        name: 'Blue blouse',
        description: 'This is a Blue blouse',
        tag: 'Blueblouse',
        price: 59.99,
        inCart: 0,
        Image: '/images/BlueBlouse.jpg'
    },
    {
        name: 'Off White blouse',
        description: 'This is an Off White blouse',
        tag: 'OffWhiteblouse',
        price: 73.99,
        inCart: 0,
        Image: '/images/OffWhiteblouse.jpg'
    },
    {
        name: 'White blouse',
        description: 'This is a White blouse',
        tag: 'Whiteblouse',
        price: 89.99,
        inCart: 0,
        Image: '/images/white-blouse.jpg'
    },
    {
        name: 'Brown trouser',
        description: 'This is a Brown trouser',
        tag: 'Browntrouser',
        price: 140.00,
        inCart: 0,
        Image: '/images/brown-trouser.jpg'
    },
    {
        name: 'Cream trouser',
        description: 'This is a Cream trouser',
        tag: 'Creamtrouser',
        price: 59.00,
        inCart: 0,
        Image: '/images/creamTrouser.jpg'
    },
    {
        name: 'Grey trouser',
        description: 'This is a Grey trouser',
        tag: 'Greytrouser',
        price: 201.00,
        inCart: 0,
        Image: '/images/greyTrouser.jpg'
    },


    {
        name: 'Girls dress',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'GirlsDress',
        price: 64.00,
        inCart: 0,
        Image: '/images/girls-dress.jpg'
    },
    {
        name: 'Girls dress',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'GirlsDress',
        price: 57.00,
        inCart: 0,
        Image: '/images/girls-dress1.webp',
        
    },
    {
        name: 'Girls dress',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'GirlsDress',
        price: 89.99,
        inCart: 0,
        Image: '/images/girls-dress2.webp'
    },
    {
        name: 'Boys jumper',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BoysJumper',
        price: 80.00,
        inCart: 0,
        Image: '/images/boys-jumper.avif'
    },
    {
        name: 'Boys jumper',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BoysJumper',
        price: 50.00,
        inCart: 0,
        Image: '/images/boys-jumper1.webp'
    },
    {
        name: 'Boys jumper',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BoysJumper',
        price: 70.00,
        inCart: 0,
        Image: '/images/boys-jumper2.webp'
    },

 // from this position down to be fixed at a later date or until a better solution is found
    {
        name: 'Blue Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlueShirt',
        price: 29.99,
        inCart: 0,
        Image:  '' //'https://img.fruugo.com/product/2/90/617160902_max.jpg' 
    },
    {
        name: 'Black Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlackShirt',
        price: 23.99,
        inCart: 0,
        Image: '' //'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/0545391/3.jpg?5946',
        
    },
    {
        name: 'White Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'WhiteShirt',
        price: 89.99,
        inCart: 0,
        Image: '' //'https://img.fruugo.com/product/6/45/507046456_max.jpg'
    },
    {
        name: 'Denim jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'DenimJeans',
        price: 150.00,
        inCart: 0,
        Image: '' //'https://i8.amplience.net/i/egl/MensJeans-220407-slim.jpg'
    },
    {
        name: 'Light blue jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'LightBlue',
        price: 50.00,
        inCart: 0,
        Image: '' //'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/33/055233/1.jpg?5486'
    },
    {
        name: 'Cotton jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'Cottonjeans',
        price: 200.00,
        inCart: 0,
        Image: '' //'https://static-01.daraz.pk/p/5838623fb612626ae33c2f67d1b7179c.jpg'
    },


    {
        name: 'Blue Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlueShirt',
        price: 29.99,
        inCart: 0,
        Image: '' //'https://img.fruugo.com/product/2/90/617160902_max.jpg'
    },
    {
        name: 'Black Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlackShirt',
        price: 23.99,
        inCart: 0,
        Image: '' //'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/0545391/3.jpg?5946',
        
    },
    {
        name: 'White Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'WhiteShirt',
        price: 89.99,
        inCart: 0,
        Image: '' // 'https://img.fruugo.com/product/6/45/507046456_max.jpg'
    },
    {
        name: 'Denim jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'DenimJeans',
        price: 150.00,
        inCart: 0,
       Image: '' //'https://i8.amplience.net/i/egl/MensJeans-220407-slim.jpg'
    },
    {
        name: 'Light blue jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'LightBlue',
        price: 50.00,
        inCart: 0,
        Image: '' //'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/33/055233/1.jpg?5486'
    },
    {
        name: 'Cotton jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'Cottonjeans',
        price: 200.00,
        inCart: 0,
        Image:'' //'https://static-01.daraz.pk/p/5838623fb612626ae33c2f67d1b7179c.jpg'
    },


    {
        name: 'Blue Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlueShirt',
        price: 29.99,
        inCart: 0,
        Image:'' //'https://img.fruugo.com/product/2/90/617160902_max.jpg'
    },
    {
        name: 'Black Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'BlackShirt',
        price: 23.99,
        inCart: 0,
        Image:'' //'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/0545391/3.jpg?5946',
        
    },
    {
        name: 'White Shirt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'WhiteShirt',
        price: 89.99,
        inCart: 0,
        Image:'' //'https://img.fruugo.com/product/6/45/507046456_max.jpg'
    },
    {
        name: 'Denim jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'DenimJeans',
        price: 150.00,
        inCart: 0,
        Image:'' // 'https://i8.amplience.net/i/egl/MensJeans-220407-slim.jpg'
    },
    {
        name: 'Light blue jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'LightBlue',
        price: 50.00,
        inCart: 0,
        Image:'' //'https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/33/055233/1.jpg?5486'
    },
    {
        name: 'Cotton jeans',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tag: 'Cottonjeans',
        price: 200.00,
        inCart: 0,
        Image:'' //'https://static-01.daraz.pk/p/5838623fb612626ae33c2f67d1b7179c.jpg'
    }

]; */
 
