const Express = require("express");
const router = Express.Router();
const { models } = require("../models");
let validateJWT = require("../middleware/validate-session");
const { add } = require("nodemon/lib/rules");

//CREATE CLIENTS
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

//UPDATE CLIENT
router.put("/update/:clientId", validateJWT, async (req, res) => {
  const { firstName, lastName, phoneNumber, address, notes } = req.body.clients;
  const clientId = req.params.clientId;
  const {id}  = req.user;
  const query = {
      where: {
          id: clientId,
          userId: id 
      }
  };
  const updateClient = {
      
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: address,
    notes: notes,
    userId: id
  };
  console.log(updateClient);

  try {
      const update = await models.Clients.update(updateClient, query);
      res.status(200).json({
          message: `${update} Client successfully updated!`,
          update: updateClient,
          query: query
      });
  } catch (err) {
      res.status(500).json({ error: err });
      message = "Error updating client";
  }
}
);

//DELETE CLIENT
router.delete("/delete/:clientId", validateJWT, async (req, res) => {
  const clientId = req.params.clientId;
  const {id}  = req.user;
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


