//Déclaration d'une promesse pour la réalisation des requêtes SQL
const db = require("./db_jeux");
module.exports = function query(request, data) {
    return new Promise((resolve, reject) => {
        db.query(request, (data || []), (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}