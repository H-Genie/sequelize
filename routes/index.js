const { Router } = require('express');
const mainRouter = Router();
const models = require('../models')

mainRouter.get('/', async (req, res) => {
    try {
        await models.Todos.findAll()
            .then(todos => res.render('index', { todos }));
    } catch (err) {
        console.log(err)
    }
});

module.exports = { mainRouter }