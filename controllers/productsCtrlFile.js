const { productList } = require('../products');

/*exports.productCtrlFunction = (req, res) => {
    try{
        res.status(200).json({
            products: productList
        });
    }catch(error){
        console.log(error);
    }
} */

// productsCtrlFile.js
const productsCtrlFunction = (req, res) => {
    try{
        res.status(200).json({
            products: productList
        });
    }catch(error){
        console.log(error);
    }
   // res.send('This is the products page');
};

module.exports = {
    productsCtrlFunction: productsCtrlFunction
};
