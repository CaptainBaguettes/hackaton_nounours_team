const express = require("express");
const router = express.Router();

const dataUseCase = require("../useCase/data");
const CityUseCase = require("../useCase/city");

router.get("/communes", dataUseCase.communes);

/**
 * @swagger
 * /api/datas/cities:
 *   get:
 *     summary: Récupérer toutes les villes
 *     tags:
 *       - Cities
 *     description: Retourne la liste de toutes les villes disponibles dans la base de données
 *     responses:
 *       200:
 *         description: Liste des villes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6818f76fa1be7da9e02cc7a7"
 *                   name:
 *                     type: string
 *                     example: "Rennes"
 *                   latitude:
 *                     type: number
 *                     example: 48.117266
 *                   longitude:
 *                     type: number
 *                     example: -1.6777926
 *                   nb_population:
 *                     type: number
 *                     example: 215366
 *                   nb_doctors:
 *                     type: number
 *                     example: 1250
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching cities"
 */
router.get("/cities", CityUseCase.getAllCities);
router.get("/cities", CityUseCase.getAllCities);
router.post("/cities", CityUseCase.createCity);
router.get("/cities/names", CityUseCase.getAllCitiesName);

module.exports = router;
