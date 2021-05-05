const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./src/blockchain");
const PubSub = require("./pubsub");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

setTimeout(() => {
  pubsub.broadcastChain();
}, 1000);

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  res.redirect("/api/blocks");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`start server on port : ${PORT}`);
});
