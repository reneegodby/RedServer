require('dotenv').config();

const express = require('express');
const dbConnection = require('./db');
const controllers  = require('./controllers');
const middleware = require('./middleware');

const app = express();

app.use(middleware.CORS);
app.use(express.json());

app.use('/auth', controllers.userscontroller);
app.use(middleware.validateSession);
app.use('/orders', controllers.orderscontroller);

// try {
//     dbConnection
//         .authenticate()
//         .then(async () => await dbConnection.sync( /* {force: true}*/ )) 
//         .then(() => {
//             app.listen(process.env.PORT, () => {
//                 console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
//             });
//         });
// } catch (err) {
//     console.log('[SERVER]: Server crashed');
//     console.log(err);
// }
dbConnection.authenticate()
    .then(() => dbConnection.sync(/*{force: true}*/))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })
