const Express = require("express");
const router = Express.Router();
const { models } = require("../models");
let validateJWT = require("../middleware/validate-session");

router.put("/update/:orderId", validateJWT, async (req, res) => {
  const { typeOfOrder, quantity, dueDate, price, notes, image } = req.body.orders;
  const orderId = req.params.orderId;
  const query = {
      where: {
          orderId: orderId,
          
      }
  };
  const updatedOrder = {
      typeOfOrder: typeOfOrder,
      quantity: quantity,
      dueDate: dueDate,
      price: price,
      notes: notes,
      image: image
      
  };
  console.log(updatedOrder);

  try {
      const update = await models.Orders.update(updatedOrder, query);
      res.status(200).json({
          message: `${update} Order successfully updated!`,
          update: updatedOrder,
          query: query
      });
  } catch (err) {
      res.status(500).json({ error: err });
      message = "Error updating order";
  }
}
);

router.post("/order", validateJWT, async (req, res) => {
  const { typeOfOrder, quantity, dueDate, price, notes, image } =
    req.body.orders;
  const { clientId } = req.body.orders;
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




module.exports = router;
