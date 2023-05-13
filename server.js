require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Добро пожаловать в Eshop");
});

const array = [];
const calculateOrderAmount = items => {
  items.map(item => {
    const { price, cartQuantity } = item;
    const cartItemAmount = price * cartQuantity;
    return array.push(cartItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);
  console.log(totalAmount);
  return totalAmount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        city: shipping.city,
        region: shipping.region,
        street: shipping.street,
        apartment: shipping.apartment,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    //receipt_email: userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.PORT || 4242;

app.listen(port, () => console.log(`Node server listening on port ${port}`));
