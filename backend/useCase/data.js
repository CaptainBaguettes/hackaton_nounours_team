const fs = require("fs");
const path = require("path");

exports.communes = async (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "../data", "communes_geo_35.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la lecture des données" });
      }

      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseErr) {
        console.error("Erreur lors du parsing des données JSON:", parseErr);
        res
          .status(500)
          .json({ error: "Erreur lors du traitement des données" });
      }
    }
  );
};
