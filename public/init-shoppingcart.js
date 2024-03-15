async function initCart(product) {
    const loggedInuser = JSON.parse(localStorage.getItem('user'))
    if (!loggedInuser) {
        setShoppingCart()
        return
    }

    try {
        const url = `http://localhost:7000/users/${loggedInuser.id}/shoppingCart`

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const shoppingCartItems = await response.json()

        setShoppingCart(shoppingCartItems)

    } catch (error) {
        console.error(error);
    }
   
}

function setShoppingCart(items = []){
    let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || []
  
    shoppingCardItems = shoppingCardItems.concat(items)

    document.querySelector('.add-cart span').textContent = shoppingCardItems.length;
}

initCart()
