const express = require('express')
const router = express.Router()

const { uploadMiddleware } = require("../middleware/multerMiddleware");
const amin = require("../admin");
router.post("/admin", uploadMiddleware.any(), async (req, res) => {
    const data = req.body;

    const infor = await amin.find();

    if (infor[0].username === data.username) {
        if (infor[0].password === data.password) return res.status(200).json({ status: "OK" });
        else res.json({ status: "Failed" });
    } else res.json({ status: "Failed" });
});

module.exports = router