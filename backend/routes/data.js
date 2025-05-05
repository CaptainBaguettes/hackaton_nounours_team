var express = require("express");
var router = express.Router();

const dataUseCase = require("../useCase/data");

router.get("/communes", dataUseCase.communes);

module.exports = router;
