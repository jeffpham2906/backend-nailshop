const express = require('express')
const order = express.Router()
const { Orders } = require('../Orders')
order.post("/order", async (req, res) => {
    const data = req.body;
    const currentDate = new Date();

    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, add 1 to match the actual month)
    const currentYear = currentDate.getFullYear(); // Get the current four-digit year
    const currentHours = currentDate.getHours(); // Get the current hours (0-23)
    const currentMinutes = currentDate.getMinutes(); // Get the current minutes (0-59)
    const currentSeconds = currentDate.getSeconds(); // Get the current seconds (0-59)
    data.times = `${currentDay}/${currentMonth}/${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`;
    console.log(data);
    await Orders.create(data);
    res.json({ status: "OK" });
});

order.get("/order", async (req, res) => {
    const data = await Orders.find();
    res.json({ status: "OK", data });
});




module.exports = order