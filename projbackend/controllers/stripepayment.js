const stripe = require("stripe")("SECRET_KEY");
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  //
  const { products, token } = req.body;
  console.log("products", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
          .create({
              amount: amount,
              currency: "INR",
              customer: customer.id,
              receipt_email: token.email,
              shipping: {
                  name: token.card.name,
                  
              }
        }, { idempotencyKey })
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
