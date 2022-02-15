const moment = require('moment')
const conexao = require('../infraestrutura/conexao')
class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;
        console.log(data, dataCriacao)
        const validacao = [{
            nome: 'data',
            valido: dataValida,
            mensagem: 'A Data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: clienteValido,
            mensagem: 'O nome deve ter no mínimo cinco caracteres'
        }]
        const erros = validacao.filter(campo => !campo.valido);
        const existemErros = erros.length
        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(2001).json(atendimento)
                }
            })
        }


    }
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }
    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }
    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}
module.exports = new Atendimento