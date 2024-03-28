let products1 = [];

// const searchBar = document.getElementById('search-input');

/* searchBar.addEventListener('input', (e) => {
  const searchString = e.target.value.toLowerCase();

  if (products1 && products1.length) {
    const filteredProducts = products1.filter((product) => {
      return (
        product.name?.toLowerCase().includes(searchString) ||
        product.price?.toString().toLowerCase().includes(searchString)
      );
    });
    displayCarts(filteredProducts);
  } else {
    console.log('Products array is empty or undefined. Waiting for data to load.');
  }
}); */

const displayCarts = (products) => {
  const container = document.querySelector('.container-');
  if (container && Array.isArray(products)) {
    const htmlString = products.map((product) => {
      return`
      <div class="product">
      <div class="product-card">
        <h2 class="name">${product.name}</h2>
        <span class="price">£${product.price}</span>
        <a class="popup-btn">Quick View</a>
        <img src="${product.image}" class="product-img" alt="${product.description}">
      </div>
      <div class="popup-view">
        <div class="popup-card">
          <a><i class="fas fa-times close-btn"></i></a>
          <div class="product-img">
            <img src="${product.image}" alt="${product.description}">
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

    container.innerHTML = htmlString;
  }
};

const loadProducts = async () => {
  try {
    const res = await fetch('http://localhost:7000/products', {
      headers: {
        accept: 'application/json',
        'User-agent': 'learning app',
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    products1 = Array.isArray(data) ? data : [];
    displayCarts(products1);
    initializeSearch();
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

function initializeSearch() {
  searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    if (products1 && products1.length) {
      const filteredProducts = products1.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchString) ||
          product.price?.toString().toLowerCase().includes(searchString)
        );
      });
      displayCarts(filteredProducts);
    } else {
      console.log('Products array is empty or undefined. Waiting for data to load.');
    }
  });
}

// document.addEventListener('DOMContentLoaded', () => {
//   loadProducts();
// });

