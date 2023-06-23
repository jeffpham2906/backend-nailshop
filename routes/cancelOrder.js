const express = require('express')
const cancelOrder = express.Router()
const { Orders } = require('../Orders')

cancelOrder.post("/cancelOrder/:id", async (req, res) => {
    const orderId = req.params.id;
    await Orders.updateOne(
        { _id: orderId },
        {
            $set: {
                status: "cancel",
            },
        }
    );
    res.json({ status: "OK" });
});

module.exports = cancelOrder