

/**
 * Google Pay API Configuration
 */
const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY', 
    parameters: {
        gateway: 'example', 
        gatewayMerchantId: 'gatewayMerchantId',
    }
}


const cardPaymentMethod = {
    type: 'CARD' ,
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    }
};
const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
}

let googlePayClient;

/**
 * Defines and handles the main operations related to the integration of Google Pay.
 * This function is executed when the Google Pay library scrpit has finished loading.
 */

function onGooglePayLoaded(){
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST', 
    });

    googlePayClient.isReadyToPay(googlePayConfiguration)
    .then(response => {
        if (response.result) {
            createAndAddButton();
        }else{
            //The current user cannot pay using GPay. Offer another
            // method to pay.
        }
    })
    .catch(error => console.error('isReadyToPay error: ', error));
}


/**
 * Handles the creation of the button to pay with Google Pay.
 * Once created, this button is appended to the DOM, under the element
 * "buy-now".
 */
function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
    });

    document.getElementById('buy-now').appendChild(googlePayButton);
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
    if (!input.value.trim()) {
        document.querySelector('.buy-now button').disabled= true;
        document.querySelector('.g-warning').innerText = 'Complete all the fields above in order to be able to pay with google pay'
    }
})

}

/**
 * Handles the click of the Google Pay button.
 * Takes care of defining the payment data request in order to load 
 * the user payments methods available.
 */

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfiguration };
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4T3G6PVU2S', 
        merchantName: 'Your Fashion', 
    };

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL', 
        totalPrice: localStorage.getItem('totalCost'), //item.inCart * item.price
        currencyCode: 'GBP',
        countryCode: 'UK',
    };

    googlePayClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => processPaymentData(paymentData))
    .then(()=>updateDetails())
    .catch(error => console.error('loadPaymentData error: ', error));
}

async function processPaymentData(paymentData) {
  
    const usr = JSON.parse(localStorage.getItem('user'))
    if(usr){
        await fetch(`http://localhost:7000/users/${usr.id}/products`, {
            method: 'DELETE', 
            headers: {
                'Content-Type' : 'application/json'
            },
           
        })
    }
    localStorage.removeItem('shoppingCardItems')
    document.querySelector('.add-cart span').textContent = 0;

    const inputs = document.querySelectorAll('input')

    const valuesMap = {}
    inputs.forEach((input,ind) => {
        if (!ind) return
        
        valuesMap[input.getAttribute('name')] = input.value
    })

    await fetch(`http://localhost:7000/orders`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
       body: JSON.stringify({
            totalCost:  localStorage.getItem('totalCost'),
            userId: usr?.id,
            date: new Date(),
            ...valuesMap
       })
    })
    localStorage.setItem('totalCost', 0)
}

async function updateDetails(){
    const lu = JSON.parse(localStorage.getItem('user'))
    if (!lu) return;
    const inputs = document.querySelectorAll('input')

    const valuesMap = {}
    inputs.forEach((input,ind) => {
        if (!ind) return
        
        valuesMap[input.getAttribute('name')] = input.value
    })

    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                valuesMap
            ) 
          };

        const url = `http://localhost:7000/users/${lu.id}/details`

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 
    } catch (error){
        console.log(error)
    }
}