const Express = require("express");
const router = Express.Router();
const { models } = require('../models');
let validateJWT = require("../middleware/validate-session");


// router.get('/practice', (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });

router.post('/order',validateJWT, async (req, res) => {
    const {orderId, typeOfOrder, quantity, dueDate, price,notes, image } = req.body.orders;
    try{
        await models.Orders.create({
            orderId: orderId, 
            typeOfOrder, 
            quantity, 
            dueDate, 
            price, 
            notes,
            image,
            clientId: req.clients.clientId
        })
        .then(
            post => {
                res.status(201).json({
                    post: post,
                    message: 'order created'
                });
            }
        )
    } catch (err){
        res.status(500).json({
            error: `Failed to create order: ${err}`
        });
    };
});

module.exports = router;