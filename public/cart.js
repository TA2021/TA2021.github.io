document.querySelector('.search-bar').style.display = 'none';

const table = document.querySelector('table')
table.innerHTML =`
    <tr>
        <th>Product</th>
        <th>Image</th>
        <th>Price per unit</th>
        <th>Amount</th>
        <th>Total Price</th>
    </tr>
`

let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || []

let idItemMap = {} 

shoppingCardItems.forEach(item => {
   if (!idItemMap[item.id]) idItemMap[item.id]= [];
   idItemMap[item.id].push(item)
})

const uniqueEntries = []

Object.values(idItemMap).forEach(arr => {
    uniqueEntries.push(arr[0])
})

let totalCost = 0
uniqueEntries.forEach(item => {
    table.innerHTML +=`
<tr>
    <td>${item.name}</td>
    <td><img src="${item.image}" height="70" width="70"/></td>
    <td>${item.price}</td>
    <td>${idItemMap[item.id].length}</td>
    <td>${idItemMap[item.id].length * item.price}</td>
</tr>
    `
    totalCost += idItemMap[item.id].length * item.price
})

table.innerHTML +=`
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><strong>Total cost: ${totalCost}</strong></td>
</tr>`

localStorage.setItem('totalCost', totalCost) 

function handleProceedCheckout(){
    window.location.href="/checkout"
}


