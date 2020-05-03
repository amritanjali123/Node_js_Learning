const router = require("express").Router();
const DB = require("../models")
const crypto = require("crypto")
const { multer, formatByte } = require("raubi-util");
const { signupValidation } = require("../data-validation/validator");

router.post("/signup", (req, res) => {
    
    if (!req.body.college) return res.json({ name: "college not found" })
    if (!req.body.trade) return res.json({ name: "trade not found" })
    if (!req.body.regNo) return res.json({ name: "regNO not found" })
    if (!req.body.roll) return res.json({ name: "regNO not found" })

    const { error, data } = signupValidation(req.body);
    if (error) return res.status(400).json(error)

    const salt = crypto.randomBytes(64).toString("hex");
    DB.User.create({
        username: req.body.username,
        email: req.body.email,
        salt: salt,
        password: crypto.pbkdf2Sync(req.body.password, salt, 10, 256, `sha512`).toString("hex")
    }).then(data => {
        DB.Dashboard.create({
            UserId: data.id,
            name: req.body.name,
            trade: req.body.trade,
            regNo: req.body.regNo,
            college: req.body.college,
            roll: req.body.roll,
            add: req.body.add

        }).then(user => {
            res.json({ message: "Signup successful" })
        }).catch(err => {
            const error = {}
            err.errors.forEach(item => {
                error[item.path] = item.message
            });
            res.json(error)
        })
    }).catch(err => {
        const error = {}
        err.errors.forEach(item => {
            error[item.path] = item.message
        });
        res.json(error)
    })
})


router.post("/login", (req, res) => {
    DB.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user) return res.json({ error: "User not yound" })
        const newHash = crypto.pbkdf2Sync(req.body.password, user.salt, 10, 256, `sha512`).toString("hex")
        if (user.password === newHash) return res.json({ message: "Login successful" })
        res.json({ error: "Login failed" })
    })
})

router.get("/dashboard", (req, res) => {
    DB.User.findOne({
        where: { email: req.body.email },
        attributes: ["username", "email", "id"],
        include: [{ model: DB.Dashboard, attributes: { exclude: ["createdAt", "updatedAt", "id", "UserId"] } }]
    }).then(data => res.json(data)) //promise
})


router.put('/update', function (req, res) {
    DB.User.update(req.body, { where: { email: req.body.email } }).then(data => {
        res.json(data)
    }).catch(errr => res.json(err))
});



const storage = multer.diskStorage({
    destination: (req, filename, cb) => {
        cb(false, "./storage");
    },
    filename: (req, filename, cb) => {
        console.log(filename);

        cb(null, new Date().getTime() + filename.originalname);
    }
})

const upload = multer({ storage: storage });



router.post("/test", upload.single("file"), (req, res) => {
    console.log(req.body);
    res.json("hello")

})



module.exports = router;