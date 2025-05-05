var express = require("express");
var router = express.Router();

const dataUseCase = require("../useCase/data");
const CityUseCase = require("../useCase/city");

router.get("/communes", dataUseCase.communes);

router.get("/cities", CityUseCase.getAllCities);
router.post("/cities", CityUseCase.createCity);


module.exports = router;
