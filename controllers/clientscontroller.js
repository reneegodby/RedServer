const router = require('express').Router();
const { models } = require('../models');

router.post('/client', async (req, res) => {
    const {content, postId} = req.body.comment;

    try {
        await models.Clients.create({
            content: content,
            postId: postId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
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

module.exports = router;