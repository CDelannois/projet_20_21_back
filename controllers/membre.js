const { default: validator } = require("validator");
const membres = {};

module.exports = (app, queryPromise) => {

    // Récupération de tous les membres
    app.get("/membre", async (req, res) => {
        try {
            const membre = await queryPromise("SELECT * FROM membre");
            res.json(membre);
        } catch (e) {
            return res.status(400).json({
                error: "Les membres ne sont pas disponibles!"
            });
        }
    });

    //Récupération d'un membre dont on spécifie l'ID
    app.get("/membre/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const membre = await queryPromise("SELECT * FROM membre WHERE id_membre=?", [id]);
            if (membre.lenght === 0) {
                return res.status(404).json({
                    error: "Cette personne n'existe pas!"
                });
            } else {
                res.json(membre)
            }
        } catch (e) {
            return res.status(400).json({
                error: "Les membres ne sont pas accessibles! " + e
            });
        }
    });

    membres.validation = (req) => {
        const membre = req.body;

        const nom = membre.nom;
        let validateNom;
        const prenom = membre.prenom;
        let validatePrenom;
        const telephone = membre.telephone;
        let validateTelephone;
        const email = membre.email;
        let validateEmail;
        const adresse = membre.adresse;
        let validateAdresse;
        const date_naissance = membre.date_naissance;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); //Permet de récupérer la date du jour au format date.
        let validateDateNaissance;

        if (validator.isAlpha(nom, "fr-FR", { ignore: " -" }) && validator.isLength(nom, { min: 2, max: 45 })) {
            validateNom = true;
        } else {
            console.log("Le nom ne doit comporter que des lettres, espaces ou traits d'union et doit faire entre 2 et 45 caractères.");
            validateNom = false;
        }

        if (validator.isAlpha(prenom, "fr-FR", { ignore: " -" }) && validator.isLength(prenom, { min: 2, max: 45 })) {
            validatePrenom = true;
        } else {
            console.log("Le prénom ne doit comporter que des lettres, espaces ou traits d'union et doit faire entre 2 et 45 caractères.");
            validatePrenom = false;
        }

        if (validator.isInt(telephone) && validator.isLength(telephone, { min: 9, max: 45 })) {
            validateTelephone = true;
        } else {
            console.log("Le numéro de téléphone ne doit comporter que des chiffres et doit faire entre 9 et 45 caractères.");
            validateTelephone = false;
        }

        if (validator.isEmail(email) && validator.isLength(email, { min: 2, max: 45 })) {
            validateEmail = true;
        } else {
            console.log("Le format de l'adresse mail est incorrect (exemple: adresse@email.be) et doit faire entre 6 et 45 caractères.");
            validateEmail = false;
        }

        if (validator.isAlpha(adresse, "fr-FR", { ignore: " 0123456789-+" }) && validator.isLength(adresse, { min: 10, max: 45 })) {
            validateAdresse = true;
        } else {
            console.log("L'adresse ne peut comporter de caractères spéciaux et doit faire entre 10 et 45 caractères.");
            validateAdresse = false;
        }

        if (validator.isDate(date_naissance) && validator.isBefore(date_naissance, date)) {
            validateDateNaissance = true;
        } else {
            console.log("Le date doit être au format YYYY/MM/DD et avant la date d'aujourd'hui.");
            validateDateNaissance = false;
        }
        if (validateNom == true &&
            validatePrenom == true &&
            validateTelephone == true &&
            validateEmail == true &&
            validateAdresse == true &&
            validateDateNaissance == true) {
            return true;
        }
    }
    //Ajout d'un membre
    app.post("/membre", async (req, res) => {
        const membre = req.body;

        try {
            if (membres.validation(req) == true) {
                const {
                    insertId,
                } = await queryPromise("INSERT INTO membre (nom, prenom, telephone, email, adresse, date_naissance) VALUES (?,?,?,?,?,?)",
                    [membre.nom, membre.prenom, membre.telephone, membre.email, membre.adresse, membre.date_naissance]);
                if (insertId != null) {
                    const [membre] = await queryPromise("SELECT * FROM membre WHERE id_membre = ?", [insertId]);
                    if (membre) {
                        return res.json(membre);
                    }
                }
                return res
                    .status(400)
                    .json({
                        error: "Impossible d'afficher le nouveau membre."
                    });
            } else {
                return res
                    .status(400)
                    .json({
                        error: "Un ou plusieur champs sont erronés. Veuillez vous référer à la console."
                    })
            }
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({
                    error: "Impossible d'afficher le nouveau membre."
                });
        }
    });

    //Editer un membre
    app.post("/membre/:id", async (req, res) => {
        const id = req.params.id;

        //Récupérer les infos du membre
        const {
            nom,
            prenom,
            telephone,
            email,
            adresse,
            date_naissance
        } = req.body;
        try {
            const edit = await queryPromise("SELECT * FROM membre WHERE id_membre=?", [id]);
            if (edit.length === 0) {
                return res.status(404).json({
                    error: "Cette personne n'existe pas."
                });
            }
            //Mise à jour du membre

            const membre = edit[0];
            membre.id_membre;
            membre.nom = nom;
            membre.prenom = prenom;
            membre.telephone = telephone;
            membre.email = email;
            membre.adresse = adresse;
            membre.date_naissance = date_naissance;

            if (membres.validation(req) == true) {
                const add = await queryPromise("UPDATE membre SET nom = ?, prenom = ?, telephone = ?, email = ?, adresse = ?, date_naissance = ? WHERE id_membre = ?", [membre.nom, membre.prenom, membre.telephone, membre.email, membre.adresse, membre.date_naissance, membre.id_membre]);
                res.json(membre);
            } else {
                return res
                    .status(400)
                    .json({
                        error: "Un ou plusieur champs sont erronés. Veuillez vous référer à la console."
                    })
            }
        } catch (e) {
            return res.status(400).json({
                error: "Une erreur est survenue! " + e
            });
        }
    });

    //Suppression d'un membre
    app.delete("/membre/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const del = await queryPromise("DELETE FROM membre WHERE id_membre =?", [id]);
            if (del.affectedRows == 0) {
                return res.status(404).json({
                    error: "Cette personne n'existe pas."
                });
            } else {
                return res.status(200).json({
                    ok: "Le membre a bien été supprimé."
                })
            }
        } catch (e) {
            return res.status(400).json({
                error: e
            });
        }
    });
}