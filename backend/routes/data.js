var express = require("express");
var router = express.Router();

const dataUseCase = require("../useCase/data");

router.post("/communes", dataUseCase.communes);

module.exports = router;
