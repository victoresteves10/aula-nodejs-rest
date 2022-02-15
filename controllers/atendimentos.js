const res = require('express/lib/response');
const Agenda = require('../models/agenda')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Agenda.lista(res)
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Agenda.buscaPorId(id, res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Agenda.adiciona(atendimento, res)

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Agenda.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Agenda.deleta(id, res)
    })

}
