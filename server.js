'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true  
}));

app.use(express.static('public'));
// Note: Don't add or change anything above this line.

// stock order route handler :
app.get('/order', (req, res) => {
    let stock = req.query
    let stockPick = findStockBySymbol(stock.stock)          // Finds the stock by name 

    res.send(`You placed an order to buy ${stock.quantity} stocks of ${stock.stock}. 
    The total price of one stock is ${(stockPick.price).toLocaleString("en-US", {style: "currency", currency: "USD"})} 
    and the total price for this order 
    is ${(stockPick.price * stock.quantity).toLocaleString("en-US", {style: "currency", currency: "USD"})}`);   // This is the total cost
}); 

// stock search route handler 
app.get('/search', (req, res) => {
    let stock = findStockByPrice(req.query.price)         // Calls outside helper function to locate stock by price 
    res.send(stock);
}); 

// searches for stock based on ticker symbol 
function findStockBySymbol(sym){
    for (let el = 0; el < stocks.length; el++){
        if (stocks[el].symbol == sym){  
            return stocks[el]; 
        }
    }
}
// searches for stock based on price 
function findStockByPrice(price){
    let holdval = stocks[0]; 
    if (price == "highest"){
        for(let el = 1; el < stocks.length; el++){ 
            if(holdval.price < stocks[el].price){
                holdval = stocks[el]
            }
        } return holdval; 
    } 
    if (price == "lowest"){
        for(let el = 1; el < stocks.length; el++){
            if(holdval.price > stocks[el].price){
                holdval = stocks[el]
            }
        } return holdval; 
    }
}


// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});