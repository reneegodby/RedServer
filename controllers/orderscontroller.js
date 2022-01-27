const router = require('express').Router();
const { models } = require('../models');


router.post('/order', async (req, res) => {
    const {title, content} = req.body.post;
    try{
        await models.Orders.create({
            title: title,
            content: content,
            userId: req.user.id
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