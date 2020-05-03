const router = require("express").Router()

router.get("/test", (req, res) => {
    console.log("ss");
    res.send("This route is working fine")
})


module.exports = router;