const express = require("express");
const router = express.Router();

const dataUseCase = require("../useCase/data");
const CityUseCase = require("../useCase/city");
const JobUseCase = require("../useCase/job");

router.get("/communes", dataUseCase.communes);

router.get("/cities", CityUseCase.getAllCities);
router.post("/cities", CityUseCase.createCity);
router.get("/cities/names", CityUseCase.getAllCitiesName);

router.get("/jobs", JobUseCase.getAllJobs);
router.get("/jobs/:jobId", JobUseCase.getJobById);
router.post("/jobs/:jobId/apply", JobUseCase.applyToJob);
router.post("/jobs", JobUseCase.createJob);
router.put("/jobs/:jobId", JobUseCase.updateJob);
router.delete("/jobs/:jobId", JobUseCase.deleteJob);
router.get("/jobs/user/:userId", JobUseCase.findJobsByUserId);
router.get("/jobs/city/:cityId", JobUseCase.findJobsByCityId);

module.exports = router;
