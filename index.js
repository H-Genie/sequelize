const express = require('express');
const app = express();

const server = async () => {
    try {

        // DB 연결
        const db = require('./models');
        await db.sequelize.authenticate()
            .then(() => {
                console.log("DB connected");
                return db.sequelize.sync();
            })
            .catch(err => console.log(err))

        // body-parser
        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json())

        // view 엔진
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');

        // router
        const { mainRouter } = require('./routes');
        const { todoRouter } = require('./routes/todoRoute');

        app.use('/', mainRouter)
        app.use('/comment', todoRouter);

        // port
        const port = process.env.PORT || 3000;
        app.listen(
            port,
            () => console.log(`server listening on port ${port}`)
        );

    } catch (err) {
        console.log(err);
    }
}

server();