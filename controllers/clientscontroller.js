const Express = require("express");
const router = Express.Router();
const { models } = require('../models');
let validateJWT = require("../middleware/validate-session");

router.post('/client', validateJWT, async (req, res) => {
    const {firstName,lastName, phoneNumber, address, notes} = req.body.clients;

    try {
        await models.Clients.create({
            // clientId: clientId,
            firstName,
            lastName,
            phoneNumber,
            address,
            notes,
            userId: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    post: post,
                    message: 'client created'
                });
            }
        )
    } catch (err){
        res.status(500).json({
            error: `Failed to create client: ${err}`
        });
    };
});

// router.delete("/delete/:clientId", validateJWT, async (req, res) => {
//     const clientId = req.params.clientId;
//     const { clientId } = req.client;
//     const query = {
//         where: {
//             clientId: clientId,
            
//         }
//     };
//     try {
//         const deleteLog = await LogModel.destroy(query);
//         res.status(200).json({
//             message: `${deleteLog} Logs successfully deleted!`,
//             query: query
//         });
//     } catch (err) {
//         res.status(500).json({ error: err });
//         message = "Error deleting log";
//     }
// }
// );

module.exports = router;