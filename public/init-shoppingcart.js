function initCart(){
    let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || []

    localStorage.setItem('shoppingCardItems', JSON.stringify(shoppingCardItems))
    document.querySelector('.add-cart span').textContent = shoppingCardItems.length;
}




initCart()
