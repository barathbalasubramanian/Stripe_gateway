
const express = require('express');
const app = express()
const stripe = require('stripe')('sk_test_51MizMcSBhQD8PWXNBkyRIyQSYnBy77DiZCCLncAahhMeNOHh2yDRrucWQKiD8klb43ZunKgxPG536GSeRMgkLJop00TzKmDTzg');


const {checkout} = require('./gateway/paytm')

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.get('/', (req,res) => {
    res.render('checkout.ejs')
})

app.get('/create-checkout-session' , (req,res) => {
    res.send('---')
})

app.post('/create-checkout-session', (req,res) => {
    checkout(req,res)
});

app.get('/success.html' , (req,res) => {
    res.render('success.ejs')
})

app.get('/failure.html' , (req,res) => {
    res.render('cancel.ejs')
})

app.listen(8080);