const { default: validator } = require("validator");
const jeux = {};

module.exports = (app, queryPromise) => {
    // Récupération de tous les jeux
    app.get("/jeux", async (req, res) => {
        try {
            const jeux = await queryPromise("SELECT * FROM jeux");
            res.json(jeux);
        } catch (e) {
            return res.status(400).json({
                error: "Les jeux ne sont pas disponibles!"
            });
        }
    });

    //Récupération d'un jeu dont on spécifie l'ID
    app.get("/jeux/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const jeux = await queryPromise("SELECT * FROM jeux JOIN membre on id_membre = appartient WHERE id_jeux=?", [id]);
            if (jeux.length === 0) {
                return res.status(404).json({
                    error: "Ce jeu n'existe pas!"
                });
            } else {
                res.json(jeux)
            }
        } catch (e) {
            return res.status(400).json({
                error: "Les jeux ne sont pas accessibles! " + e
            });
        }
    });

    jeux.validation = (req) => {
        const jeu = req.body;

        const titre = jeu.titre;
        let validateTitre;
        const joueursMin = jeu.joueurs_min;
        let validateJoueursMin;
        const joueursMax = jeu.joueurs_max;
        let validateJoueursMax;
        const duree = jeu.duree;
        let validateDuree;
        const ageRecommande = jeu.age_recommande;
        let validateAgeRecommande;
        const mecanisme = jeu.mecanisme;
        let validateMecanisme;
        const mecanisme2 = jeu.mecanisme2;
        let validateMecanisme2;
        const dateParution = jeu.date_parution;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let validateDateParution;
        const editeur = jeu.editeur;
        let validateEditeur;
        const commentaire = jeu.commentaire;
        let validateCommentaire;
        const appartient = jeu.appartient;
        let validateAppartient;

        if (validator.isLength(titre, {
            min: 1,
            max: 45
        })) {
            validateTitre = true;
        } else {
            console.log("Le titre du jeu doit faire entre 1 et 45 caractères");
            validateTitre = false;
        }

        if (validator.isInt(joueursMin, {
            min: 1,
            max: parseInt(joueursMax)
        })) {
            validateJoueursMin = true;
        } else {
            console.log("Le nombre minimum de joueurs doit être au moins et 1 et ne peut pas être plus grand que le nombre maximum de joueurs.");
            validateJoueursMin = false;
        }

        if (validator.isInt(joueursMax, {
            min: parseInt(joueursMin)
        })) {
            validateJoueursMax = true;
        } else {
            console.log("Le nom maximum de joueurs ne peut pas être inférieur au nombre minimum de joueurs.");
            validateJoueursMax = false;
        }

        if (validator.isInt(duree, {
            min: 1
        })) {
            validateDuree = true;
        } else {
            console.log("La durée doit être au minimum à 1.");
            validateDuree = false;
        }

        if (validator.isInt(ageRecommande, {
            min: 3
        })) {
            validateAgeRecommande = true;
        } else {
            console.log("L'âge recommandé doit être d'au moins 3.");
            validateAgeRecommande = false;
        }

        if (validator.isLength(mecanisme, {
            min: 5,
            max: 45
        })) {
            validateMecanisme = true;
        } else {
            console.log("Le champ 'mecanisme' doit faire entre 5 et 45 caractères.");
            validateMecanisme = false;
        }

        if (validator.isLength(mecanisme2, {
            max: 45
        })) {
            validateMecanisme2 = true;
        } else {
            console.log("Le champ 'mecanisme2' doit faire au maximum 45 caractères");
            validateMecanisme2 = false;
        }

        if (validator.isDate(dateParution) && validator.isBefore(dateParution, date)) {
            validateDateParution = true;
        } else {
            console.log("La date de parution ne peut dépasser la date actuelle");
            validateDateParution = false;
        }

        if (validator.isLength(editeur, {
            min: 1,
            max: 45
        })) {
            validateEditeur = true;
        } else {
            console.log("Le champ 'editeur' doit faire entre 1 et 45 caractères.");
            validateEditeur = false;
        }

        if (validator.isLength(commentaire, { max: 200 })) {
            validateCommentaire = true;
        } else {
            console.log("Le commentaire ne pet faire plus de 200 caractères");
            validateCommentaire = false;
        }

        if (validator.isInt(appartient, { min: 1 })) {
            validateAppartient = true;
        } else {
            console.log("Le champ 'appartient' doit être un nombre plus grand que 0");
            validateAppartient = false;
        }

        if (validateTitre == true &&
            validateJoueursMin == true &&
            validateJoueursMax == true &&
            validateDuree == true &&
            validateAgeRecommande == true &&
            validateMecanisme == true &&
            validateMecanisme2 == true &&
            validateDateParution == true &&
            validateEditeur == true &&
            validateCommentaire == true &&
            validateAppartient == true) {
            return true;
        }
    }

    //Ajout d'un jeu
    app.post("/jeux", async (req, res) => {
        const jeu = req.body;

        try {
            if (jeux.validation(req) == true) {
                const {
                    insertId,
                } = await queryPromise("INSERT INTO jeux (titre, joueurs_min, joueurs_max, duree, age_recommande, mecanisme, mecanisme2, date_parution, editeur, commentaire, appartient) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    [jeu.titre,
                    jeu.joueurs_min,
                    jeu.joueurs_max,
                    jeu.duree,
                    jeu.age_recommande,
                    jeu.mecanisme,
                    jeu.mecanisme2,
                    jeu.date_parution,
                    jeu.editeur,
                    jeu.commentaire,
                    jeu.appartient]);

                if (insertId != null) {
                    const [jeu] = await queryPromise("SELECT * FROM jeux WHERE id_jeux=?", [insertId]);
                    if (jeu) {
                        return res.json(jeu);
                    }
                }
                return res
                    .status(400)
                    .json({
                        error: "Impossible d'afficher le nouveau jeu."
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
                    error: "Impossible d'afficher le nouveau jeu."
                })
        }
    });

    //Editer un jeu
    app.post("/jeux/:id", async (req, res) => {
        const id = req.params.id;

        //Récupérer les infos du jeux
        const {
            titre,
            joueurs_min,
            joueurs_max,
            duree,
            age_recommande,
            mecanisme,
            mecanisme2,
            date_parution,
            editeur,
            commentaire,
            appartient
        } = req.body;
        try {
            const edit = await queryPromise("SELECT * FROM jeux WHERE id_jeux=?", [id]);
            if (edit.length === 0) {
                return res.status(404).json({
                    error: "Ce jeu n'existe pas."
                });
            }

            //Mise à jour du jeu
            const jeu = edit[0];
            jeu.id_jeux;
            jeu.titre = titre;
            jeu.joueurs_min = joueurs_min;
            jeu.joueurs_max = joueurs_max;
            jeu.duree = duree;
            jeu.age_recommande = age_recommande;
            jeu.mecanisme = mecanisme;
            jeu.mecanisme2 = mecanisme2;
            jeu.date_parution = date_parution;
            jeu.editeur = editeur;
            jeu.commentaire = commentaire;
            jeu.appartient = appartient;

            if (jeux.validation(req) == true) {
                const add = await queryPromise("UPDATE jeux SET titre = ?, joueurs_min = ?, joueurs_max = ?, duree = ?, age_recommande = ?, mecanisme = ?, mecanisme2 = ?, date_parution = ?, editeur = ?, commentaire = ?, appartient = ? WHERE id_jeux = ?", [jeu.titre, jeu.joueurs_min, jeu.joueurs_max, jeu.duree, jeu.age_recommande, jeu.mecanisme, jeu.mecanisme2, jeu.date_parution, jeu.editeur, jeu.commentaire, jeu.appartient, jeu.id_jeux]);
                res.json(jeu);
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

    //Suppression d'un jeu
    app.delete("/jeux/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const del = await queryPromise("DELETE FROM jeux WHERE id_jeux =?", [id]);
            if (del.affectedRows == 0) {
                return res.status(404).json({
                    error: "Ce jeu n'existe pas."
                });
            } else {
                return res.status(200).json({
                    ok: "Le jeu a bien été supprimé."
                })
            }
        } catch (e) {
            return res.status(400).json({
                error: e
            })
        }
    });
}