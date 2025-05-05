const fs = require("fs");
const path = require("path");

exports.communes = async (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "data", "communes_geo_35.csv"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier CSV:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la lecture des données" });
      }

      try {
        const csvLines = data
          .split("\n")
          .filter((line) => !line.trim().startsWith("//"));
        const csvData = csvLines.join("\n");

        const lines = csvData.trim().split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());

        const results = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(",").map((value) => value.trim());

          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
          }

          results.push(obj);
        }

        res.json(results);
      } catch (parseErr) {
        console.error("Erreur lors du parsing des données CSV:", parseErr);
        res
          .status(500)
          .json({ error: "Erreur lors du traitement des données" });
      }
    }
  );
};
