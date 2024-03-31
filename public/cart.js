document.querySelector('.search-bar').style.display = 'none';

const table = document.querySelector('table');
let tableHTML = `
    <tr>
        <th>Product</th>
        <th>Image</th>
        <th>Price per unit</th>
        <th>Amount</th>
        <th>Total Price</th>
    </tr>`;

let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || [];

let idItemMap = {};

shoppingCardItems.forEach(item => {
    if (!idItemMap[item.productid]) idItemMap[item.productid] = [];
    idItemMap[item.productid].push(item);
});

let totalCost = 0;
Object.values(idItemMap).forEach(arr => {
    const item = arr[0];
    const quantity = arr.length;
    totalCost += quantity * item.price;
    tableHTML += `
        <tr data-productid='${item.productid}'>
        <td><button type="button" class="remove" data-productid="${item.productid}"> x </button> ${item.name}</td>
            <td><img src="${item.image}" height="70" width="70"/></td>
            <td>${item.price}</td>
            <td>
                <form>
                    <div class="value-button decrease" data-productid="${item.productid}" value="Decrease Value">-</div>
                    <input type="number" class="number-input" data-productid="${item.productid}" value='${quantity}'/>
                    <div class="value-button increase" data-productid="${item.productid}" value="Increase Value">+</div>
                </form>
            </td>
            <td class="total-price-for-item" data-productid="${item.productid}" data-price="${item.price}">${quantity * item.price}</td>
        </tr>`
       ;
});

tableHTML += `
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><strong>Total cost: <span id="total-cost">${totalCost}</span></strong></td>
</tr>`;

table.innerHTML = tableHTML;

localStorage.setItem('totalCost', totalCost);

// Adding event listeners for each button
document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.productid;
        increaseValue(productId);
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.productid;
        decreaseValue(productId);
    });
});

document.querySelectorAll('.remove').forEach(button => {
    
    button.addEventListener('click', function() {
        const productId = button.closest('tr').dataset.productid;
        removeItem(productId);
    });
});


function increaseValue(productId) {
    const inputField = document.querySelector(`.number-input[data-productid="${productId}"]`);
    let value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    inputField.value = value;
    updateItemTotalPrice(productId, value);
}

function decreaseValue(productId) {
    const inputField = document.querySelector(`.number-input[data-productid="${productId}"]`);
    let value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 0 : value;
    value = value <= 1 ? 1 : value - 1;
    inputField.value = value;
    updateItemTotalPrice(productId, value);
}

function removeItem(productId) {
    console.log("Trying to remove product with ID:", productId);
    
    // Filter out the item to be removed based on productId. Keep items that do NOT match the productId.
    shoppingCardItems = shoppingCardItems.filter(item => item.productid !== Number(productId));
    shoppingCardItems = shoppingCardItems.filter(item => item.productid !== productId.toString());


    // Update localStorage with the new, filtered list
    localStorage.setItem('shoppingCardItems', JSON.stringify(shoppingCardItems));

    // Find and remove the item's row from the table
    const itemRow = document.querySelector(`tr[data-productid="${productId}"]`);
    if (itemRow) {
        itemRow.remove();
    } else {
        console.error('Item row not found');
    }

    // Update the total cost to reflect the item removal
    updateTotalCost();
}


function updateItemTotalPrice(productId, quantity) {
    const pricePerUnit = parseFloat(document.querySelector(`.total-price-for-item[data-productid="${productId}"]`).getAttribute('data-price'));
    const totalPriceForItem = quantity * pricePerUnit;
    document.querySelector(`.total-price-for-item[data-productid="${productId}"]`).textContent = totalPriceForItem.toFixed(2);
    updateTotalCost();
}

function updateTotalCost() {
    let newTotalCost = 0;
    document.querySelectorAll('.total-price-for-item').forEach(item => {
        newTotalCost += parseFloat(item.textContent);
    });
    document.getElementById('total-cost').textContent = newTotalCost.toFixed(2);
    localStorage.setItem('totalCost', newTotalCost);
}


function handleProceedCheckout() {
    window.location.href = "/checkout";
}