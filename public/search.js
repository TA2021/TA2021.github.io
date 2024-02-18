// Declare the products variable

const { productList } = require("../products");

const characterList = document.getElementsByClassName('container-');
const searchBar = document.getElementById('search-input');

//console.log('search running');
//console.log(searchBar);
let products1 = productList;


const flattenProducts =  (products1) => {
  return products1.flatMap(page => page.flatMap(section => section));
};

searchBar.addEventListener('input', (e) => {


  const searchString = e.target.value.toLowerCase(); // Convert to lower case for case-insensitive comparison

  //const filteredProducts = products;

  console.log(e.target.value);
  if (Array.isArray(products1)) {
    const filteredProducts = products1.filter((product) => {
      console.log('Product:', product);
      return (
        (product.name?.toLowerCase().includes(searchString) || false) ||
        (product.price?.toLowerCase().includes(searchString) || false)
      );
    });
    displayCarts(filteredProducts);

  } else {
    console.log('Products array is empty or undefined. Waiting for data to load.');
  }


  //console.log(filteredProducts);
   // Pass filtered products to displayCart
});


const displayCarts = (products1) => {
  console.log('Products:', products1);
  for (let page = 0; page < products1.length; page++) {
    for (let section = 0; section < products1[page].length; section++) {
      const characterList = document.querySelector('.characterLists' + (page + 1) + '-' + (section + 1));

      const htmlString = products1[page][section].map((product) => {
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
      });

      if (characterList) {
        characterList.innerHTML = htmlString;
        loadProducts(characterList);
      }
    }
  }
};

/* function flat(products){
  return products.reduce((acc, val) =>
  Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val), [],
  );
}
flat(products); */
const loadProducts = async () => {
  try {
    const res = await fetch('http://localhost:5000/products', {
      headers: {
        accept: 'application/json',
        'User-agent': 'learning app',
      }
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    

 
    const data = await res.json();
    products1 = flattenProducts(data); // Extract products from the object and flatten them into a single array
    //console.log('Products:', products);
    displayCarts(products1);
  } catch (err) {
    console.error('Error fetching products:', err);
  }

};


loadProducts();