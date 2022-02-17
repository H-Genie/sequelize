const { Router } = require('express');
const todoRouter = Router();
const models = require('../models')

todoRouter.post('/', async (req, res) => {
    try {
        await models.Todos.create(req.body)
            .then(res.redirect('/'))
    } catch (err) {
        console.log(err)
    }
})

todoRouter.post('/edit/:id', async (req, res) => {
    try {
        await models.Todos.update({
            todo: req.body.todo
        }, { where: { id: req.params.id } })
            .then(res.redirect('/'))
    } catch (err) {
        console.log(err)
    }
})

todoRouter.get('/delete/:id', async (req, res) => {
    try {
        await models.Todos.destroy({ where: { id: req.params.id } })
            .then(res.redirect('/'))
    } catch (err) {
        console.log(err)
    }
})

module.exports = { todoRouter }