//let products = []; // Declare the products variable

const characterList = document.getElementById('characterList');
const searchBar = document.getElementById('search-input');

console.log('search running');
console.log(searchBar);

searchBar.addEventListener('keyup', (event) => {
    console.log(event.target.value);
    const searchString = event.target.value.toLowerCase(); // Convert to lower case for case-insensitive comparison
    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchString) ||
            product.tag.toLowerCase().includes(searchString)
        );
    });

    console.log(filteredProducts);
    displayCart(filteredProducts); // Pass filtered products to displayCart
});

 displayCart = (products) => {
    console.log('Products:', products);
    if (Array.isArray(products)) {
        const htmlString = products.map((product) => {
            return `
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
            `;
        }).join('');
        characterList.innerHTML = htmlString;
    } else {
        console.error('Products is not an array:', products);
    }
};

const loadProducts = async () => {
    try {
        const res = await fetch('http://localhost:5000');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        const products = Object.values(data).flat(); // Extract products from the object and flatten them into a single array
        console.log('Products:', products);
        displayCart(products);
    } catch (err) {
        console.error('Error fetching products:', err);
    }
};


loadProducts();




