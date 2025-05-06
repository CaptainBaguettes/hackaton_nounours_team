const express = require("express");
const router = express.Router();

const dataUseCase = require("../useCase/data");
const CityUseCase = require("../useCase/city");
const JobUseCase = require("../useCase/job");

router.get("/communes", dataUseCase.communes);

router.get("/cities", CityUseCase.getAllCities);
router.post("/cities", CityUseCase.createCity);

router.get("/jobs", JobUseCase.getAllJobs);
router.get("/jobs/:jobId", JobUseCase.getJobById);
router.post("/jobs/:jobId/apply", JobUseCase.applyToJob);
router.post("/jobs", JobUseCase.createJob);

module.exports = router;
