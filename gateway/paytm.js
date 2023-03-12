const express = require('express');
const app = express()
const stripe = require('stripe')('sk_test_51MizMcSBhQD8PWXNBkyRIyQSYnBy77DiZCCLncAahhMeNOHh2yDRrucWQKiD8klb43ZunKgxPG536GSeRMgkLJop00TzKmDTzg');

const checkout = async(req,res) => {
    const YOUR_DOMAIN = 'http://localhost:8080';
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
              price_data: {
                currency: 'inr',
                unit_amount: 2000,
                product_data: {
                  name: 'T-shirt',
                },
              },
              quantity: 1,
            }],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
          });
          
          res.redirect(303, session.url)
    
      }catch(err) {
        console.log(err)
        res.status(400);
        return res.send({
          error: {
            message: err.message,
          }
        });
      }
}

module.exports = { checkout }