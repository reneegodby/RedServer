require('dotenv').config();

//imports
const Express = require('express');
// const dbConnection = require('./db');
// const controllers  = require('./controllers');
// const middleware = require('./middleware');

// instantiation
const app = Express();

app.use('/test', (req, res) => {
    res.send("Test endpoint on server")
})

// middleware
// app.use(middleware.CORS);
// app.use(express.json());

// endpoints
// app.use('/auth', controllers.userscontroller);
// app.use(middleware.validateSession);
// app.use('/posts', controllers.postscontroller);
// app.use('/comments', controllers.commentscontroller);

// database auth & sync
// try {
//     dbConnection
//         .authenticate()
//         .then(async () => await dbConnection.sync(/*  {force: true} */)) // force: true will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
//         .then(() => {
            app.listen(5001, () => {
                console.log(`[SERVER]: App is listening on 5001.`);
            });
//         });
// } catch (err) {
//     console.log('[SERVER]: Server crashed');
//     console.log(err);
// }