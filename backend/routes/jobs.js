const express = require("express");
const router = express.Router();

const JobUseCase = require("../useCase/job");


/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Récupérer toutes les offres d'emploi
 *     tags:
 *       - Jobs
 *     description: Retourne la liste de toutes les offres d'emploi disponibles
 *     responses:
 *       200:
 *         description: Liste des offres d'emploi récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6818f76fa1be7da9e02cc7a9"
 *                   title:
 *                     type: string
 *                     example: "Médecin généraliste"
 *                   description:
 *                     type: string
 *                     example: "Nous recherchons un médecin généraliste pour rejoindre notre cabinet médical"
 *                   city:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6818f76fa1be7da9e02cc7a7"
 *                       name:
 *                         type: string
 *                         example: "Rennes"
 *                       latitude:
 *                         type: number
 *                         example: 48.117266
 *                       longitude:
 *                         type: number
 *                         example: -1.6777926
 *                       nb_population:
 *                         type: number
 *                         example: 215366
 *                       nb_doctors:
 *                         type: number
 *                         example: 1250
 *                   influx:
 *                     type: number
 *                     example: 10
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-05-06T12:00:00.000Z"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching jobs"
 */
router.get("/jobs", JobUseCase.getAllJobs);
router.get("/jobs/:jobId", JobUseCase.getJobById);
router.post("/jobs/:jobId/apply", JobUseCase.applyToJob);
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Créer une nouvelle offre d'emploi
 *     tags:
 *       - Jobs
 *     description: Ajoute une nouvelle offre d'emploi dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - city
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Médecin généraliste"
 *               description:
 *                 type: string
 *                 example: "Nous recherchons un médecin généraliste pour rejoindre notre cabinet médical"
 *               city:
 *                 type: string
 *                 example: "Rennes"
 *               influx:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Offre d'emploi créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6818f76fa1be7da9e02cc7a9"
 *                 title:
 *                   type: string
 *                   example: "Médecin généraliste"
 *                 description:
 *                   type: string
 *                   example: "Nous recherchons un médecin généraliste pour rejoindre notre cabinet médical"
 *                 city:
 *                   type: string
 *                   example: "6818f76fa1be7da9e02cc7a7"
 *                 influx:
 *                   type: integer
 *                   example: 10
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-05-06T12:00:00.000Z"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid title"
 *       404:
 *         description: Ville non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "City not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating job"
 */
router.post("/jobs", JobUseCase.createJob);
router.put("/jobs/:jobId", JobUseCase.updateJob);
router.delete("/jobs/:jobId", JobUseCase.deleteJob);
router.get("/jobs/user/:userId", JobUseCase.findJobsByUserId);

/**
 * @swagger
 * /api/jobs/city/{cityId}:
 *   get:
 *     summary: Récupérer les offres d'emploi par ville
 *     tags:
 *       - Jobs
 *     description: Retourne la liste des offres d'emploi disponibles dans une ville spécifique
 *     parameters:
 *       - in: path
 *         name: cityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la ville
 *         example: "6818f76fa1be7da9e02cc7a7"
 *     responses:
 *       200:
 *         description: Liste des offres d'emploi récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6818f76fa1be7da9e02cc7a9"
 *                   title:
 *                     type: string
 *                     example: "Médecin généraliste"
 *                   description:
 *                     type: string
 *                     example: "Nous recherchons un médecin généraliste pour rejoindre notre cabinet médical"
 *                   city:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6818f76fa1be7da9e02cc7a7"
 *                       name:
 *                         type: string
 *                         example: "Rennes"
 *                       latitude:
 *                         type: number
 *                         example: 48.117266
 *                       longitude:
 *                         type: number
 *                         example: -1.6777926
 *                       nb_population:
 *                         type: number
 *                         example: 215366
 *                       nb_doctors:
 *                         type: number
 *                         example: 1250
 *                   influx:
 *                     type: number
 *                     example: 10
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-05-06T12:00:00.000Z"
 *       400:
 *         description: ID de ville invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid city ID"
 *       404:
 *         description: Aucune offre d'emploi trouvée pour cette ville
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No jobs found for this city"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error finding jobs by city ID"
 */
router.get("/jobs/city/:cityId", JobUseCase.findJobsByCityId);

module.exports = router;
