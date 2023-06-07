require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

let array = [];
const calculateOrderAmount = items => {
  console.log(items);
  items.map(item => {
    const { price, cartQuantity } = item;

    const cartItemAmount = price * cartQuantity;
    return array.push(cartItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);

  array.splice(0, array.length);
  return totalAmount * 100;
};
console.log(array);

app.post("/create-payment-intent", async (req, res) => {
  const { items, description } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "rub",
    automatic_payment_methods: {
      enabled: true,
    },
    description,

    //receipt_email: userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.PORT || 4242;

app.listen(port, () => console.log(`Node server listening on port ${port}`));
