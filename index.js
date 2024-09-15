const express = require('express');
const Payos = require('@payos/node');

const payos = new Payos(
    "d36013e9-561f-477a-bad3-e09eef407cca",
    "5eb6c214-a000-4a68-822f-196ae5944255",
    "ebe9ba4c57962a118e1dbb2ea6619a128fdd22dacc7e816b62582d067e0ad52b"
);
const app = express();

app.use(express.static('public'));
app.use(express.json());

const DOMAIN = 'http://localhost:3000';
app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 10000,
        description: 'Thanh toan mi tom',
        orderCode: 6,
        returnUrl: `${DOMAIN}/success.html`,
        cancelUrl: `${DOMAIN}/cancel.html`,
    }
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
