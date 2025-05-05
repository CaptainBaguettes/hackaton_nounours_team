let express = require("express");
let router = express.Router();
const auth = require("../middleware/authentification");

const userUseCase = require("../useCase/user");

router.post("/signup", userUseCase.signup);
router.post("/login", userUseCase.login);

module.exports = router;
