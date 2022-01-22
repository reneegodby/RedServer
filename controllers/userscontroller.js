const router = require('express').Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { models } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post('/register', async (req, res) => {
    const { email, password} = req.body.user;
    try{
        await models.UsersModel.create({
            email: username,
            password: bcrypt.hashSync(password, 10)
        })
        .then(
            user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user created',
                    sessionToken: `Bearer ${token}`
                });
            }
        )
    } catch(err){
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                error: `Username already in use`
            });
        } else{
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
});





module.exports = router;