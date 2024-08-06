



const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51PgYUMEwEJT5eZxsG20vpwcOwAF2FDBLhU1lRnAuYmh8Y8tXiLcC0fAreyp53h8RUutGf2B7pMxwYXDHjkVYpic1006AiDPYQx"); // Directly using the secret key

// APP config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  const total = parseInt(req.query.total, 10); // Convert to integer

  if (isNaN(total) || total <= 0) {
    return res.status(400).send({ error: "Invalid amount" });
  }

  console.log(`Payment Request Received with amount: ${total}`);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Ensure this is in cents
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});

// Listen command
exports.api = onRequest(app);
