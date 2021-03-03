module.exports = (app, queryPromise) => {
    // Récupération des jeux d'un membre
    app.get("/membreJeux/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const membreJeux = await queryPromise("SELECT * FROM membre JOIN jeux ON id_membre = appartient WHERE id_membre=?", [id]);
            if (membreJeux.lenght === 0) {
                return res.status(404).json({
                    error: "Cette personne n'existe pas!"
                });
            } else {
                res.json(membreJeux)
            }
        } catch (e) {
            return res.status(400).json({
                error: "Une erreur est survenue! " + e
            });
        }
    });
}