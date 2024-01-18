//const response = require("koa/lib/response");

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
        totalPrice: item.inCart * item.price, //item.inCart * item.price
        currencyCode: 'GBP',
        countryCode: 'UK',
    };

    googlePayClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => processPaymentData(paymentData))
    .catch(error => console.error('loadPaymentData error: ', error));
}

function processPaymentData(paymentData) {
    fetch(orderEndpointURL, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: paymentData
    })
}