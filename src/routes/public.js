const router = require("express").Router();

router.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

module.exports = router;
