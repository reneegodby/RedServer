const Express = require("express");
const router = Express.Router();
const { models } = require("../models");
let validateJWT = require("../middleware/validate-session");

router.post("/client", validateJWT, async (req, res) => {
  const { firstName, lastName, phoneNumber, address, notes } = req.body.clients;

  try {
    await models.Clients.create({
      // clientId: clientId,
      firstName,
      lastName,
      phoneNumber,
      address,
      notes,
      userId: req.user.id,
    }).then((post) => {
      res.status(201).json({
        post: post,
        message: "client created",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Failed to create client: ${err}`,
    });
  }
});

router.delete("/delete/:clientId", validateJWT, async (req, res) => {
  const clientId = req.params.id;
  const { id } = req.user;
  const query = {
    where: {
      id: clientId,
      userId: id,
    },
  };
  try {
    const deleteClient = await models.Clients.destroy(query);
    res.status(200).json({
      message: `${deleteClient} Client successfully deleted!`,
      query: query,
    });
  } catch (err) {
    res.status(500).json({ error: err });
    message = "Error deleting client";
  }
});

module.exports = router;

// router.put("/update/:id", validateJWT, async (req, res) => {
//     const {  } = req.body.client;// **these need to match our request**
//     const logId = req.params.id;
//     const { id } = req.user;

//     const query = {
//         where: {
//             id: logId,
//             owner: id
//         }
//     };

//     const updatedLog = {
//
//     };
//     console.log(updatedLog);

//     try {
//         const update = await LogModel.update(updatedLog, query);
//         res.status(200).json({
//             message: `${update} Logs successfully updated!`,
//             update: updatedLog,
//             query: query
//         });
//     } catch (err) {
//         res.status(500).json({ error: err });
//         message = "Error updating log";
//     }
// }
// );
