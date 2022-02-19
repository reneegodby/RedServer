const Express = require("express");
const router = Express.Router();
const { models } = require("../models");
let validateJWT = require("../middleware/validate-session");
const Clients = require("../models/clients");

//CREATE ORDER
router.post("/order/:id", validateJWT, async (req, res) => {
  const { typeOfOrder, quantity, dueDate, price, notes, image } =
    req.body.orders;
  const clientId = req.params.id;
  try {
    const setClientId = await models.Clients.findOne({
      where: {
        id: clientId,
        userId: req.user.id,
      },
    });
    await models.Orders.create({
      typeOfOrder,
      quantity,
      dueDate,
      price,
      notes,
      image,
      userId: req.user.id,
      clientId: setClientId.id,
    }).then((post) => {
      res.status(201).json({
        post: post,
        message: "order created",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: `Failed to create order: ${err}`,
    });
  }
});

//UPDATE ORDER
router.put("/update/:orderId", validateJWT, async (req, res) => {
  const { typeOfOrder, quantity, dueDate, price, notes, image } =
    req.body.orders;
  const orderId = req.params.orderId;
  const query = {
    where: {
      orderId: orderId,
    },
  };
  const updatedOrder = {
    typeOfOrder: typeOfOrder,
    quantity: quantity,
    dueDate: dueDate,
    price: price,
    notes: notes,
    image: image,
  };
  console.log(updatedOrder);

  try {
    const update = await models.Orders.update(updatedOrder, query);
    res.status(200).json({
      message: `${update} Order successfully updated!`,
      update: updatedOrder,
      query: query,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//DELETE ORDER
router.delete("/delete/:orderId", validateJWT, async (req, res) => {
  const orderId = req.params.orderId;
  const query = {
    where: {
      orderId: orderId,
    },
  };

  try {
    const deleteOrder = await models.Orders.destroy(query);
    res.status(200).json({
      message: `${deleteOrder} Order successfully deleted!`,
      query: query,
    });
  } catch (err) {
    res.status(500).json({ error: err });
    message = "Error deleting order";
  }
});

//GET ALL ORDERS FOR SPECIFIC USER

router.get("/", validateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await models.Orders.findAll({
      where: {
        userId: id,
      },
      include: [{ model: Clients }],
    });
    res.status(200).json(orders);
    // message`${orders} Orders successfully retrieved!`;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
