
//declares the api versions.
const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
};

//requests a payment token for a payment provider in this case is just a testing sample.
const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters:{
        'gateway' : 'example',
        'gatewayMerchantId' : 'exampleGatewayMerchantId'
    }
};

//defines supported payment cards.
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

//describes the allowed payment methods
const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks
    }
  };

const cardPaymentMethod = Object.assign(
    {},
    baseCardPaymentMethod,
    {tokenizationSpecification: tokenizationSpecification}
    
);

let paymentsClient = null;

//const paymentClient = new google.payments.api.PaymentClient({environment: 'TEST'});

function getGoogleIsReadyToPayRequest(){
    return Object.assign(
        {},
        baseRequest,
        {allowedPaymentMethods: [baseCardPaymentMethod]}
    );
}

function getGooglePaymentDataRequest(){
    const paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.trasactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
        merchantName: 'Example Merchant'
    };
    return paymentDataRequest;
}

function getGooglePaymentsClient(){
   // const paymentsClient = new onGooglePayLoaded.payments.api.paymentsClient({environment: 'TEST'});
    if(paymentsClient === null){
        paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
    }
    return paymentsClient;
}

function onGooglePayLoaded(){
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
    .then(function(response) {
      if (response.result) {
        addGooglePayButton();
        }
    })
    .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
}

function addGooglePayButton() {
    const paymentsClient = getGooglePaymentsClient();
    const button =
        paymentsClient.createButton({
          onClick: onGooglePaymentButtonClicked,
          allowedPaymentMethods: [baseCardPaymentMethod]
        });
    document.getElementById('container').appendChild(button);
  }

function getGoogleTransactionInfo(){
    return{
        countryCode: 'UK',
        currencyCode: 'GBP',
        totalPriceStatus: 'FINAL',
        totalPrice: '1.00' //set to cart total
    };
}

function prefetchGooglePaymentData(){
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.trasactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'GBP'
    };
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.prefetchGooglePaymentData(paymentDataRequest);
}

function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
          // handle the response
          processPayment(paymentData);
        })
        .catch(function(err) {
          // show error in developer console for debugging
          console.error(err);
        });
  }

function processPayment(paymentData){
    console.log(paymentData);
    paymentToken = paymentData.paymentMethodData.tokenIzationData.token;
}

    