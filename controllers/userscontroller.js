const router = require("express").Router();
const { models } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateJWT = require("../middleware/validate-session");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body.user;
  try {
    await models.Users.create({
      role: role,
      email: email,
      password: bcrypt.hashSync(password, 10),
    }).then((user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({
        user: user,
        message: "user created",
        sessionToken: `Bearer ${token}`,
      });
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        error: `Email already in use`,
      });
    } else {
      res.status(500).json({
        error: `Failed to register user: ${err}`,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password} = req.body.user;

  try {
    await models.Users.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "logged in",
              sessionToken: `Bearer ${token}`,
            });
          } else {
            res.status(502).send({
              error: "bad gateway",
            });
          }
        });
      } else {
        res.status(500).send({
          error: "failed to authenticate",
        });
      }
    });
  } catch (err) {
    res.status(501).send({
      error: "server does not support this functionality",
    });
  }
});

//ADMIN GETS ALL USERS

router.get('/', validateJWT, async (req, res) => {
  try {
    const users = await models.Users.findAll({
      where: {
        role: 'user'
      }
    });

    res.status(200).json(users);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch users: ${error}`
    });
  }
})

module.exports = router;




// router.get("/", async (req, res) => {
//   try {
//     await models.Users.findAll({
//       include: [
//         {
//           model: models.Orders,
//           include: [
//             {
//               model: models.Clients,
//             },
//           ],
//         },
//       ],
//     }).then((users) => {
//       res.status(200).json({
//         users: users,
//       });
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: `Failed to retrieve users: ${err}`,
//     });
//   }
// });