const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/documents", require("./documents"));
router.use("/payments", require("./payments"));

module.exports = router;
